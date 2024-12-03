"use client";

import { useAppContext } from "@/app/context/AppContext";

import ProfileAdditionalInfo from "@/components/views/profile/AdditionalInfo";
import ProfileGeneralInfo from "@/components/views/profile/GeneralInfo";
import ProfileProjectHistory from "@/components/views/profile/ProjectHistory";
import ProfileSkills from "@/components/views/profile/Skills";

import { DEFAULT_USER_DETAILS } from "@/lib/constants/profile";

const OverviewPage = () => {
  const { profile } = useAppContext();

  const projects = profile?.projects || [];

  const currentProject = projects.find(
    (project: any) => project.isCurrentProject,
  );

  return (
    <div className=" ">
    <div className='lg:gap-7.5 grid grid-cols-1 lg:grid-cols-3'>
      <div className='col-span-1 grid gap-5'>
        {/*  @ TODO This should come from the endpoint  */}
        <ProfileGeneralInfo
          data={{
            id: profile?.id || "",
            email: profile?.email || "",
            phone: profile?.phone || "",
            status: profile?.status || "",
            startdate: currentProject?.startDate || "",
            current_project: currentProject?.projectName || "",
            sfiaLevel: profile?.sfiaLevel || "",
            reportedTo: profile?.reportedTo || "",
            reportedToId: profile?.reportedToId || "",
          }}
        />

        {profile?.additionalInfo && (
          <ProfileAdditionalInfo additionalInfo={profile?.additionalInfo} />
        )}
      </div>

      <div className='col-span-2 grid gap-5'>
        <ProfileSkills
          createdById={profile?.id}
          userSkills={profile?.userSkills}
        />

        {profile?.projects?.length > 0 && (
          <ProfileProjectHistory
            projects={profile?.projects || DEFAULT_USER_DETAILS.projects}
          />
        )}
      </div>
    </div>
    </div>
  );
};

export default OverviewPage;
