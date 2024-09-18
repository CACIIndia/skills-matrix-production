import { FC } from 'react';
import ProfileHeader from './profileHeader';
export const metadata = {
  title: 'Profile',
  description: 'Manage your user profile, update personal information, and change your password on YourApp.',
  keywords: 'profile, user settings, personal information',
  openGraph: {
    title: 'Profile | YourApp',
    description: 'Manage your user profile, update personal information, and change your password on YourApp.',
    url: 'https://skillsmatrix.vercel.app/profile',
    images: [
      {
        url: 'https://skillsmatrix.vercel.app/_next/image?url=%2Fassets%2Fmedia%2Favatars%2Fprofilepic.jpg&w=128&q=75',
        width: 1200,
        height: 630,
        alt: 'Profile preview',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Profile | YourApp',
    description: 'Manage your user profile, update personal information, and change your password on YourApp.',
    images: [
      {
        url: 'https://skillsmatrix.vercel.app/_next/image?url=%2Fassets%2Fmedia%2Favatars%2Fprofilepic.jpg&w=128&q=75',
        alt: 'Profile preview',
      },
    ],
  },
};


interface ProfileLayoutProps {
  children: React.ReactNode;
}

const ProfileLayout: FC<ProfileLayoutProps> = ({ children }) => {
  return (
  <ProfileHeader> {children}</ProfileHeader>
    

  );
};

export default ProfileLayout;
