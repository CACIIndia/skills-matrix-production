"use client";
import { signIn } from "next-auth/react";

const SignInButton = () => {
  return (
    <button
      onClick={() => signIn("azure-ad")}
      className="bg-zinc-900 py-2 text-zinc-100 shadow hover:bg-zinc/90 w-full inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors"
    >
      Sign in with Azure AD
    </button>
  );
};

export default SignInButton;
