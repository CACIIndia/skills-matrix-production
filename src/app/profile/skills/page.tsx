"use client";
import Legend from "@/app/components/Legendcard";
import Menu from "@/app/components/Menu";
import ProfileActions from "@/app/components/ProfileActions";
import ProfileHeader from "@/app/components/ProfileHeader";
import SkillCard from "@/app/components/SkillsCard";
import { PROFILE_HEADER_ITEMS } from "@/constants/header";
import { useProfile } from "@/context/profileContext";
const skills = [
  { name: "Web Design", level: 3 }, // Expert
  { name: "Code Review", level: 3 }, // Expert
  { name: "Figma", level: 1 }, // Novice
  { name: "Product Development", level: 1 }, // Novice
  { name: "Webflow", level: 2 }, // Proficient
  { name: "AI", level: 2 }, // Proficient
  { name: "noCode", level: 2 }, // Proficient
];

export default function SkillsPage() {
  const { data, loading, error } = useProfile();
	if (loading) {
		return "...loading";
	  }
  return (
    <div>
      <ProfileHeader />
      {/* Profile Actions and Menu */}
      <div className='container-fixed'>
        <div className='dark:border-b-coal-100 mb-5 flex flex-nowrap items-center justify-between gap-6 border-b border-b-gray-200 lg:mb-10 lg:items-end'>
          <Menu items={PROFILE_HEADER_ITEMS} />
          <ProfileActions />
        </div>
      </div>

      <div className='container-fixed'>
        <div className='lg:gap-7.5 grid grid-cols-1 gap-5 lg:grid-cols-3'>
          <div className='col-span-2'>
            <SkillCard skills={skills} showEditButton={true} />
          </div>
          <Legend layout='grid' />
        </div>
      </div>
    </div>
  );
}
