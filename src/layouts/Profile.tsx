"use client";

import { useParams } from "next/navigation";

import { useAppContext } from "@/app/context/AppContext";
import ProfileHeader from "@/components/views/profile/Header";

import ProfileMenu from "@/components/views/profile/Menu";
import ProfileSkeleton from "@/components/skeletons/Profile";
import { useEffect } from "react";
import { getProfile } from "@/lib/api/getProfile";

type ProfileLayoutProps = {
  children: React.ReactNode;
};

const ProfileLayout = ({ children }: ProfileLayoutProps) => {
  const params = useParams();
  const userId = params.id ? String(params.id) : "";

  const { profile, viewedProfile, setViewedProfile, isLoading } =
    useAppContext();

  const data = userId ? viewedProfile : profile;

  const handleSetViewedProfile = async () => {
    setViewedProfile(null); // Reset and fetch new profile

    setViewedProfile(await getProfile(userId));
  };

  useEffect(() => {
    userId && handleSetViewedProfile();
  }, [userId]);

  return (
    <div className='w-full'>
      <ProfileHeader data={data} isLoading={isLoading} />

      <ProfileMenu />

      <div className='container mx-auto p-8'>
        {isLoading || !data ? <ProfileSkeleton /> : children}
      </div>
    </div>
  );
};

export default ProfileLayout;
