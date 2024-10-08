"use client";

import { useEffect } from "react";

import Menu from "@/components/common/Menu";
import Spinner from "@/components/common/Spinner";

import ProfileActions from "@/components/views/profile/Actions";
import ProfileAdditionalInfo from "@/components/views/profile/AdditionalInfo";
import ProfileGeneralInfo from "@/components/views/profile/GeneralInfo";
import ProfileHeader from "@/components/views/profile/Header";
import ProfileProjectHistory from "@/components/views/profile/ProjectHistory";
import ProfileSkills from "@/components/views/profile/Skills";

import { DEFAULT_USER_DETAILS } from "@/lib/constants/profile";
import { PROFILE_HEADER_ITEMS } from "@/lib/constants/header";
import useGetProfileDetails from "@/lib/hooks/profile/useGetProfileDetails";

const OverviewPage = () => {
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

      <div className='container mx-auto p-4'>
        <div className='lg:gap-7.5 grid grid-cols-1 gap-5 lg:grid-cols-3'>
          <div className='col-span-1 grid gap-5'>
            <ProfileGeneralInfo data={data} />

            <ProfileAdditionalInfo additional_info={data?.additional_info} />
          </div>

          <div className='col-span-2 grid gap-5'>
            <ProfileSkills skills={data?.skills || []} />

            <ProfileProjectHistory
              projects={data?.projects || DEFAULT_USER_DETAILS.projects}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;
