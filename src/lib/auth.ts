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
    error: "/auth/error", // Redirect to custom error page
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      // Check if this is the first time the user is signing in
      if (account && profile) {
        const email = profile.email; // Get the email from the profile
        const name = profile.name || ""; // Get the user's name

        if (!email) {
          throw new Error("Azure AD did not return an email address.");
        }

        try {
          // Check if the user already exists in the database using the email
          let user = await db.user.findUnique({
            where: { email }, // Query by email
          });

          // If the user doesn't exist, create a new one
          if (!user) {
            user = await db.user.create({
              data: {
                email, // Store email from Azure AD
                name, // Store name from Azure AD
                emailVerified: new Date(), // Assume email is verified on login
              },
            });
          }
          console.log(token, "token");
          // Attach the user's id and additional details to the token
          token.sub = user.id;
          token.email = user.email;
          token.name = user.name;
          token.image = user.image;
          return token;
        } catch (error) {
          console.error("Error checking/creating user in JWT callback:", error);
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
          image: token.image || "",
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
