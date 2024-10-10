"use client";
import { signIn } from "next-auth/react";

const SignInButton = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <button
        onClick={() => signIn("azure-ad")}
        className="bg-blue-600 py-3 px-6 text-white shadow-lg hover:bg-blue-700 w-64 rounded-md text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105"
      >
        Sign in with Azure AD
      </button>
    </div>
  );
};

export default SignInButton;
