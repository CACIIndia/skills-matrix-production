// import { useParams } from "next/navigation";
"use client";
import { useAppContext } from "@/app/context/AppContext";
import ProfileHeader from "@/components/views/profile/Header";
// import ProfileMenu from "@/components/views/profile/Menu";
import ProfileSkeleton from "@/components/skeletons/Profile";
import { useEffect } from "react";
import { getProfile } from "@/lib/api/getProfile";
import Banner from "@/components/custom-icons/Banner";
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
    <div className='w-full'>
      <div className='banner relative'>
        <div className='absolute left-1/2 top-full mt-7 -translate-x-1/2 -translate-y-1/2 transform'>
          <ProfileHeader
            data={data}
            isLoading={isLoading}
            editProfile={editProfile}
          />
        </div>
      </div>

      <div className='border-2 border-[green]'>
        <div className='border-2 border-[blue]'>
          <ProfileMenu />
        </div>

        {/* Children content */}
        {isLoading || !data ? (
          <ProfileSkeleton />
        ) : (
          <div className='mt-[80px] border-2 border-[blue]'>{children}</div>
        )}
      </div>
    </div>
  );
};

export default ProfileLayout;
