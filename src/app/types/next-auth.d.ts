// types/next-auth.d.ts
import { SkillCategory } from "@/lib/types/profile";
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string | null;    // Extend with `id` field
      email?: string | null;
      name?: string | null;
      image?: string | null;
    };
    azure_access_token:string|null;
    error: string|null;
  }

  interface User {
    id?: string | null;      
    email?: string | null;
    name?: string | null;
    image?: string | null;
  }

 
}

declare module "next-auth/jwt" {
  interface JWT {
    access_token: string | null | undefined
    expires_at: number
    refresh_token?: string
    error: string|null;
  }
}