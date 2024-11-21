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
  }

  interface User {
    id?: string | null;      
    email?: string | null;
    name?: string | null;
    image?: string | null;
  }

 
}
