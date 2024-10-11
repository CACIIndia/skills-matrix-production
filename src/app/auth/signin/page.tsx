"use client";

import { signIn } from "next-auth/react";
import { FaMicrosoft } from "react-icons/fa";

const SignInButton = () => {
  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-100'>
      <button
        onClick={() => signIn("azure-ad")}
        className='btn-primary flex w-64 transform items-center rounded-md px-6 py-3 text-lg font-semibold shadow-lg'
        aria-label='Sign in with Azure Active Directory'
      >
        <FaMicrosoft className='mr-2 text-xl' />
        Sign in with Azure AD
      </button>
    </div>
  );
};

export default SignInButton;
