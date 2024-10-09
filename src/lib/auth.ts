import AzureADProvider from "next-auth/providers/azure-ad";
import { AuthOptions } from "next-auth";
import db from "./db";

export const options: AuthOptions = {
  providers: [
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID!,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
      tenantId: process.env.AZURE_AD_TENANT_ID!,
      authorization: {
        params: {
          scope: "openid profile email",
        },
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 1000,
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    error: "/auth/error", // Custom error page URL
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        console.log(profile, "profile");

        const email = profile.email;
        const name = profile.name || '';
       
        const azureAdId = profile.oid;

        if (!azureAdId || !email) {
          throw new Error("Azure AD did not return the required information.");
        }

        try {
          let user = await db.user.findUnique({
            where: { id: azureAdId },
          });

          console.log(user, "user");

          if (!user) {
            user = await db.user.create({
              data: {
                id: azureAdId,
                email,
                name,
                emailVerified: new Date(),
              },
            });
          }

          token.id = user.id;
          token.email = user.email;
          token.name = user.name;
        } catch (error) {
          console.error("Error during JWT callback:", error);
          throw new Error("User creation or retrieval failed.");
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id,
          email: token.email || "",
          name: token.name || "",
        
        };
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl; // Redirect to base URL after sign-in
    },
  },
  
};
