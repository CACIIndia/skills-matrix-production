// import { useParams } from "next/navigation";
"use client";
import { useAppContext } from "@/app/context/AppContext";
import ProfileHeader from "@/components/views/profile/Header";
// import ProfileMenu from "@/components/views/profile/Menu";
import ProfileSkeleton from "@/components/skeletons/Profile";
import { useEffect } from "react";
import { getProfile } from "@/lib/api/getProfile";
import { useParams } from "next/navigation";
import ProfileMenu from "@/components/views/profile/Menu";

type ProfileLayoutProps = {
  children: React.ReactNode;
};

const ProfileLayout = ({ children }: ProfileLayoutProps) => {
  const params = useParams();
  const userId = params.id ? String(params.id) : "";
  const editProfile = userId ? false : true;

  const { profile, viewedProfile, setViewedProfile, isLoading } =
    useAppContext();

  const data = userId ? viewedProfile : profile;

  useEffect(() => {
    if (userId) {
      const fetchData = async () => {
        let user_data = await getProfile(userId);
        setViewedProfile(user_data.user);
      };
      fetchData();
    }
  }, [userId, setViewedProfile]);

  return (
    <div className='relative w-full'>
      {/* Banner */}
      <div className='banner relative'>
        {/* Profile Header positioned 70% down */}
        <div className='absolute-profile-header'>
          <ProfileHeader
            data={data}
            isLoading={isLoading}
            editProfile={editProfile}
          />
        </div>
      </div>

      {/* Profile Menu */}
      <div className='mt-[120px]  container-fixed' style={{marginTop:"165px"}}>
        <ProfileMenu />
      </div>

      {/* Children content */}
      <div className='mt-4 container-fixed'>
        {isLoading || !data ? (
          <ProfileSkeleton />
        ) : (
          <div className='mt-[80px]'>{children}</div>
        )}
      </div>
    </div>
  );
};

export default ProfileLayout;
