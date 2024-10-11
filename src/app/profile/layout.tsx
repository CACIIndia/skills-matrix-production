
import React, { FC } from "react";
 // Import SessionProvider

interface ProfileLayoutProps {
  children: React.ReactNode;
}

const ProfileLayout: FC<ProfileLayoutProps> = ({ children }) => {
  return (
    
      <div className='w-[100%]'>
        {children}
      </div>

  );
};

export default ProfileLayout;
