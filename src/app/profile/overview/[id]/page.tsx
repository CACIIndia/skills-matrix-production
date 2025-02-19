"use client";

import ProfileAdditionalInfo from "@/components/views/profile/AdditionalInfo";
import ProfileGeneralInfo from "@/components/views/profile/GeneralInfo";
import ProfileProjectHistory from "@/components/views/profile/ProjectHistory";
import ProfileSkills from "@/components/views/profile/Skills";

import { DEFAULT_USER_DETAILS } from "@/lib/constants/profile";

import { useAppContext } from "@/app/context/AppContext";
import CertificatePage from "../../certificates/page";
import Training from "../../training/page";

const OverviewPage = () => {
  const { viewedProfile } = useAppContext();
  return (
    <>
    <div className='lg:gap-7.5 grid grid-cols-1 gap-5 lg:grid-cols-3'>
      <div className='col-span-1 grid gap-5'>
        <ProfileGeneralInfo data={viewedProfile} disableEdit={true} />
        {/* <ProfileAdditionalInfo additionalInfo={viewedProfile?.additionalInfo} /> */}
      </div>
      <div className='col-span-2 grid gap-5'>
        <ProfileSkills userSkills={viewedProfile?.userSkills || []} />
        {/* {viewedProfile?.projects?.length > 0 && (
          <ProfileProjectHistory
            projects={viewedProfile?.projects || DEFAULT_USER_DETAILS.projects}
          />
        )} */}
      </div>
     
    </div>
   


      <div className='lg:gap-7.5 mt-4 grid grid-cols-1 lg:mt-8 lg:grid-cols-3'>
        <div className='col-span-3 grid gap-5'>
          <ProfileSkills
            createdById={viewedProfile?.id}
            userSkills={viewedProfile?.userSkills}
            showEditButton={true}
            disableEdit={true} 
          />
        </div>
      </div>
      <div className='lg:gap-7.5 mt-4 grid grid-cols-1 lg:mt-8 lg:grid-cols-3'>
        <div className='col-span-3 grid gap-5'>
          <CertificatePage />
        </div>
      </div>
      <div className='lg:gap-7.5 mt-4 grid grid-cols-1 lg:mt-8 lg:grid-cols-3'>
        <div className='col-span-3 grid gap-5'>
          <Training />
        </div>
      </div>
    </>
  );
};

export default OverviewPage;
