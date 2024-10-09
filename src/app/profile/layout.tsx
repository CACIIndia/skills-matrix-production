"use client";

import React, { FC } from "react";
import { SessionProvider } from "next-auth/react"; // Import SessionProvider

interface ProfileLayoutProps {
  children: React.ReactNode;
}

const ProfileLayout: FC<ProfileLayoutProps> = ({ children }) => {
  return (
    <SessionProvider>
      <div className='w-[100%]'>
        {children}
      </div>
    </SessionProvider>
  );
};

export default ProfileLayout;
