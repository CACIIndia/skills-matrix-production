// types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string | null;    // Extend with `id` field
      email?: string | null;
      name?: string | null;
      image?: string | null;
    };
  }

  interface User {
    id?: string | null;      // Also extend `User` type with `id` field if needed
    email?: string | null;
    name?: string | null;
    image?: string | null;
  }
}
