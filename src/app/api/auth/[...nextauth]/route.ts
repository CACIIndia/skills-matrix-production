import NextAuth from "next-auth/next";
import { options } from "@/lib/auth";

// Create the NextAuth handler and export it for both GET and POST methods
const handler = NextAuth(options);

export { handler as GET, handler as POST };
