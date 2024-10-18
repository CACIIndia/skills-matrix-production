import AzureADProvider from "next-auth/providers/azure-ad";
import { AuthOptions, getServerSession } from "next-auth";
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
  pages: {

    signIn: "/auth/signin",
    error: "/auth/error",
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        const email = profile.email;
        const name = profile.name || "";

        if (!email) {
          throw new Error("Azure AD did not return an email address.");
        }

        try {
          // Check if the user already exists in the database using the email
          let user = await db.user.findUnique({
            where: { email },
          });

          // If the user doesn't exist, create a new one
          if (!user) {
            user = await db.user.create({
              data: {
                email,
                name,
                emailVerified: new Date(),
              },
            });
          }

          // Attach the user's id and additional details to the token
          token.sub = user.id;
          token.email = user.email;
          token.name = user.name;
          token.image = user.image || "";
          return token;
        } catch (error: unknown) { 
          if (error instanceof Error) {
            // If it's an instance of Error, throw it with a custom message
            throw new Error("Error checking/creating user in JWT callback:", error);
          }
          // If the error is not an instance of Error, handle it differently
          throw new Error("An unknown error occurred.");
        }
      }

      return token;
    },
    async session({ session, token }) {
      // Attach user details to the session
      if (token) {
        session.user = {
          id: token?.sub,
          email: token.email || "",
          name: token.name || "",
          image: typeof token.image === "string" ? token.image : "", 
        };
      }

      return session;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl; // Redirect to base URL after sign-in
    },
  },
};

export async function getSession() {
  return await getServerSession(options);
}
