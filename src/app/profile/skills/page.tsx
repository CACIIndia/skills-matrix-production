"use client";

import Legend from "@/app/components/Legendcard";
import Menu from "@/app/components/Menu";
import Spinner from "@/components/common/Spinner";

import ProfileActions from "@/components/views/profile/Actions";
import ProfileHeader from "@/components/views/profile/Header";
import ProfileSkills from "@/components/views/profile/Skills";

import { DEFAULT_USER_DETAILS } from "@/lib/constants/profile";
import { PROFILE_HEADER_ITEMS } from "@/lib/constants/header";
import useGetProfileDetails from "@/lib/hooks/profile/useGetProfileDetails";

const ProfilePage = () => {
  const { data, isLoading } = useGetProfileDetails("1");

  if (isLoading) {
    return <Spinner className='mx-auto mt-24 !items-start' size='large' />;
  }

  return (
    <div className='w-full'>
      <ProfileHeader data={data || DEFAULT_USER_DETAILS} />

      <div className='container-fixed'>
        <div className='mb-5 flex flex-nowrap items-center justify-between gap-6 border-b border-b-gray-200 lg:mb-10 lg:items-end'>
          <Menu items={PROFILE_HEADER_ITEMS} />
          <ProfileActions />
        </div>
      </div>

      <div className='container-fixed'>
        <div className='lg:gap-7.5 grid grid-cols-1 gap-5 lg:grid-cols-3'>
          <div className='col-span-2'>
            <ProfileSkills skills={data?.skills || []} showEditButton={true} />
          </div>

          <Legend layout='grid' />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
