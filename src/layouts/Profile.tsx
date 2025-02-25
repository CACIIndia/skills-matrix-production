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
    <div className='relative w-full' style={{ backgroundColor: "white" }}>
      <div
        className='fixed top-0'
        style={{
          backgroundColor: "white",
          width: "100%",
          height: "400px",
          zIndex: 10,
        }}
      >
        {/* Banner */}
        <div className='banner relative'>
          <div className='absolute-profile-header'>
            <ProfileHeader
              data={data}
              isLoading={isLoading}
              editProfile={editProfile}
            />
          </div>
        </div>

        {/* Profile Menu */}
        <div className='container-fixed' style={{ marginTop: "130px" }}>
          <ProfileMenu />
        </div>
      </div>
      {/* Children content */}
      <div className='container-fixed mt-4'>
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
