import AzureADProvider from "next-auth/providers/azure-ad";
import { AuthOptions, getServerSession } from "next-auth";
import db from "./db";
import { fetchUserProfile } from "@/app/actions/updateUserMicrosoftProfile";

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
          scope: "openid email User.Read User.ReadBasic.All User.Read.All User.ReadWrite User.ReadWrite.All",
       
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
        const email = profile.email;
    
        if (!email) {
          throw new Error("Azure AD did not return an email address.");
        }

        try {
          let user = await db.user.findUnique({
            where: { email },
          });
          if (!user) {
          let ad_response = await  fetchUserProfile(account.access_token as string);
            user = await db.user.create({
              data: {
                id:ad_response.id,
                email:ad_response.mail,
                name:ad_response.displayName,
                emailVerified: new Date(),
                role: ad_response.jobTitle,
                location: ad_response.officeLocation,
                phone:ad_response.mobilePhone,
              },
            });
          }
           
          
 
          token.sub = user.id;
          token.email = user.email;
          token.name = user.name;
          token.image = user.image || "";
          token.azure_access_token = typeof account.access_token === "string" ? account.access_token  : null ;
        //  token.azure_access_token = process.env.TEMP_ACCESS_TOKEN;
          return token;
        } catch (error: unknown) { 
          if (error instanceof Error) {
         
            throw new Error("Error checking/creating user in JWT callback:" + error.message);
          }
        
          throw new Error("An unknown error occurred.");
        }
      }

      return token;
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
