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
import HeaderSearch from "@/components/common/Header/HeaderSearch";

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
      setViewedProfile(null);
      const fetchData = async () => {
        let user_data = await getProfile(userId);
        setViewedProfile(user_data.user);
      };
      fetchData();
    }
  }, [userId, setViewedProfile]);

  return (
    <div className='relative w-[100%]' style={{ backgroundColor: "white" }}>
      <div
        className={`border-b-coal-100 border-b-[1px] md:border-b-0`}
        style={{
          backgroundColor: "white",
          width: "100%",
          position: "sticky",
          top: "56px",
          left: 0,
          right: 0,
          height: "400px",
          zIndex: 10,
        }}
      >
        <div className='p-2 md:hidden'>
          <HeaderSearch />
        </div>
        {/* Banner */}
        <div className='banner relative'>
          <div
            className='absolute-profile-header'
            style={{ paddingBottom: "15px" }}
          >
            <ProfileHeader
              data={data}
              isLoading={isLoading}
              editProfile={editProfile}
            />
          </div>
        </div>

        {/* Profile Menu */}
        <div
          className='container-fixed mb-4 hidden md:flex'
          style={{ marginTop: "130px" }}
        >
          <ProfileMenu />
        </div>
      </div>
      {/* Children content */}
      <div className='container-fixed mt-4'>
        {isLoading || !data ? <ProfileSkeleton /> : <div>{children}</div>}
      </div>
    </div>
  );
};

export default ProfileLayout;
