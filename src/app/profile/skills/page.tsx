import Legend from "@/components/views/profile/Legend";
import Menu from "@/components/common/Menu";
import Spinner from "@/components/common/Spinner";

import ProfileActions from "@/components/views/profile/Actions";
import ProfileHeader from "@/components/views/profile/Header";
import ProfileSkills from "@/components/views/profile/Skills";

import { DEFAULT_USER_DETAILS } from "@/lib/constants/profile";
import { PROFILE_HEADER_ITEMS } from "@/lib/constants/header";
import { getProfileDetails } from "@/lib/api/getProfileDetails";
import { options } from "@/lib/auth";
import { getServerSession } from "next-auth";

const SkillsPage = async () => {
  // For quick testing
  const session = await getServerSession(options);
 
  const userId = session?.user?.id;
  console.log(session,"session",userId);
  // const userId = "724c1713-6f31-407b-9d31-7718472c4f2d";

  const profile = await getProfileDetails(userId);
 

  if (!profile) {
    return <Spinner className='mx-auto mt-24 !items-start' size='large' />;
  }

  return (
    <div className='w-full'>
      <ProfileHeader data={profile || DEFAULT_USER_DETAILS} />

      <div className='container-fixed'>
        <div className='mb-5 flex flex-nowrap items-center justify-between gap-6 border-b border-b-gray-200 lg:mb-10 lg:items-end'>
          <Menu items={PROFILE_HEADER_ITEMS} />
          <ProfileActions />
        </div>
      </div>

      <div className='container-fixed'>
        <div className='lg:gap-7.5 grid grid-cols-1 gap-5 lg:grid-cols-3'>
          <div className='col-span-2'>
            <ProfileSkills
              userSkills={profile?.userSkills || []}
              showEditButton={true}
            />
          </div>

          <Legend layout='grid' />
        </div>
      </div>
    </div>
  );
};

export default SkillsPage;
