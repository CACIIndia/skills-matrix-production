"use client";
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
import { useAppContext } from "@/app/context/AppContext";


const OverviewPage = () => {
 
  const { profile ,loading} = useAppContext();
  console.log(profile,"profile");
  
  
  const projects = profile?.projects || [];
  

  const currentProject = projects.find(
    (project: any) => project.isCurrentProject
  );
  if (loading|| !profile)
    return <Spinner className='mx-auto mt-24 !items-start' size='large' />;

  return (
    <div className='w-full'>
      <ProfileHeader data={profile || DEFAULT_USER_DETAILS} />

      <div className='container-fixed'>
        <div className='mb-5 flex flex-nowrap items-center justify-between gap-6 border-b border-b-gray-200 lg:mb-10 lg:items-end'>
          <Menu items={PROFILE_HEADER_ITEMS} />
          <ProfileActions />
        </div>
      </div>

      <div className='container mx-auto p-4'>
        <div className='lg:gap-7.5 grid grid-cols-1 gap-5 lg:grid-cols-3'>
          <div className='col-span-1 grid gap-5'>
            {/*  @ TODO This should come from the endpoint  */}
            <ProfileGeneralInfo
              data={{
                id :profile?.id || "",
                email: profile?.email || "",
                phone: profile?.phone || "",
                status: profile?.status || "",
                startdate: currentProject?.startDate || "",
                current_project: currentProject?.projectName || "",
                sfia_level: profile?.sfiaLevel || "",
                reported_to: profile?.reportedTo || "",
                reported_to_id :profile?.reportedToId || "",
              }}
            />

            {profile?.additionalInfo && (
              <ProfileAdditionalInfo additionalInfo={profile?.additionalInfo} />
            )}
          </div>

          <div className='col-span-2 grid gap-5'>
            <ProfileSkills createdById={profile?.id} userSkills={profile?.userSkills} />

            {profile?.projects?.length > 0 && (
              <ProfileProjectHistory
                projects={profile?.projects || DEFAULT_USER_DETAILS.projects}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;
