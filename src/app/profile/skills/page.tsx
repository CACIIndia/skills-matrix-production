"use client";

import Legend from "@/components/views/profile/Legend";

import ProfileSkills from "@/components/views/profile/Skills";

import { useAppContext } from "@/app/context/AppContext";

const SkillsPage = () => {
  const { profile, user } = useAppContext();

  return (
    <div className='lg:gap-7.5 grid grid-cols-1 gap-5 lg:grid-cols-3'>
      <div className='col-span-2'>
        <ProfileSkills
          createdById={user?.id ?? ""}
          userSkills={profile?.userSkills}
          showEditButton={true}
        />
      </div>

      <Legend layout='vertical' />
    </div>
  );
};

export default SkillsPage;
