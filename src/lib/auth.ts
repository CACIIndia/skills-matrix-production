import AzureADProvider from "next-auth/providers/azure-ad";
import { AuthOptions, getServerSession } from "next-auth";
import db from "./db";
import { fetchUserProfile } from "./microsoft-graph";
import { JWT } from "next-auth/jwt";

interface ProfileWithId {
   tid: string;

}
export const options: AuthOptions = {
      providers: [
      AzureADProvider({
         clientId: process.env.AZURE_AD_CLIENT_ID!,
         clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
         tenantId: process.env.AZURE_AD_TENANT_ID!,
         authorization: {
            params: {
               scope: "offline_access openid email User.Read User.ReadBasic.All User.Read.All User.ReadWrite User.ReadWrite.All",

            },
         },
      }),
   ],
   session: {
      strategy: "jwt",
      maxAge: 60 * 60,
   },

   pages: {
      signIn: "/auth/signin",
      error: "/auth/error",
   },
   // debug:true,

   callbacks: {
      async jwt({ token, account, profile }) {
         if (account && profile) {
            token.access_token = account.access_token;
            token.refresh_token = account.refresh_token;
            
            const expiresAt = account.expires_at ? account.expires_at * 1000 : Date.now() + 60 * 60 * 1000;
            token.expires_at = expiresAt;

            const email = profile.email;

            if (!email) {
               throw new Error("Azure AD did not return an email address.");
            }

            try {
               let user = await db.user.findUnique({
                  where: { email },
               });

               if (!user) {
                  let ad_response = await fetchUserProfile(account.access_token as string);
                  if (! ad_response.error) {
                     user = await db.user.create({
                        data: {
                           id: ad_response.id,
                           email: ad_response.mail,
                           name: ad_response.displayName,
                           emailVerified: new Date(),
                           role: ad_response.jobTitle,
                           location: ad_response.officeLocation,
                           phone: ad_response.mobilePhone,
                        },
                     });
                  }
               }
               
               token.sub = user?.id;
               token.email = user?.email;
               token.name = user?.name;
               token.image = user?.image || "";
               token.azure_access_token = typeof account.access_token === "string" ? account.access_token : null;

               return token;
            } catch (error: unknown) {
               console.log("Error : " + error);
               if (error instanceof Error) {
                  throw new Error("Error checking/creating user in JWT callback:" + error.message);
               }

               throw new Error("An unknown error occurred.");
            }
         } else if (Date.now() < token.expires_at * 1000) {
            return token;
         } else {
            return refreshAccessToken(token);
         }

      },
      async session({ session, token }) {
         if (token) {
            session.user = {
               id: token?.sub,
               email: token.email || "",
               name: token.name || "",
               image: typeof token.image === "string" ? token.image : "",

            };
            session.azure_access_token = typeof token.azure_access_token === "string" ? token.azure_access_token : null;
            session.error = token.error;
         }

         return session;
      },
      async redirect({ url, baseUrl }) {
         return baseUrl;
      },
   },
};

export async function getSession() {
   return await getServerSession(options);
}


export async function refreshAccessToken(token: JWT): Promise<any> {
   try {
     const url = `https://login.microsoftonline.com/${process.env.AZURE_AD_TENANT_ID}/oauth2/v2.0/token`;
     
     const response = await fetch(url, {
       method: "POST",
       headers: {
         "Content-Type": "application/x-www-form-urlencoded",
       },
       body: new URLSearchParams({
         grant_type: "refresh_token",
         scope: "user.read mail.read",
         client_id: process.env.AZURE_AD_CLIENT_ID!,
         client_secret: process.env.AZURE_AD_CLIENT_SECRET!,
         refresh_token: token.refresh_token!,
       })
     })

     const tokensOrError = await response.json()

     if (!response.ok) throw tokensOrError
 
     const newTokens = tokensOrError as {
      access_token: string
      expires_in: number
      refresh_token?: string
     }
     
     return {
      ...token,
      access_token: newTokens.access_token,
      expires_at: Math.floor(Date.now() / 1000 + newTokens.expires_in),
      refresh_token: newTokens.refresh_token
         ? newTokens.refresh_token
         : token.refresh_token,
     }
   } catch (error) {
     console.error("Error refreshing access_token", error);
     token.error = "RefreshTokenError";

     return token;
   }
 
 }
