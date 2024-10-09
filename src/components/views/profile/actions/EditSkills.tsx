"use client";

import Legend from "@/components/views/profile/Legend";
import { SKILL_LEVELS } from "@/lib/constants/profile";

type EditSkillsProps = {
  skillLevels: Record<string, any[]>; // Updated to handle categorized skills
  setSkillLevels: (updatedSkills: Record<string, any[]>) => void;
};

const EditSkills = ({ skillLevels, setSkillLevels }: EditSkillsProps) => {
  const MAX_LEVEL = SKILL_LEVELS.length - 1;

  const handleSkillClick = (category: string, skillId: any) => {
    const updatedCategorySkills = skillLevels[category].map((skill: any) =>
      skill.id === skillId
        ? {
            ...skill,
            level: skill.level + 1 > MAX_LEVEL ? 0 : skill.level + 1,
          }
        : skill,
    );

    setSkillLevels({
      ...skillLevels,
      [category]: updatedCategorySkills,
    });
  };

  return (
    <>
      <Legend layout='flex' hideCardHeader={true} />

      <div className='my-4 text-start'>
        <h5 className='text-lg font-semibold'>
          Click on the Skills below to cycle through the competency levels
        </h5>
      </div>
      <hr />

      <div className='mt-4 space-y-4'>
        {Object.entries(skillLevels).map(([category, skills]) => (
          <div key={category}>
            <h6 className='mb-2 text-lg font-semibold'>{category}</h6>
            <div className='mb-4 flex flex-wrap gap-3'>
              {skills.map((skill: any) => {
                const level = skill.level;
                const levelInfo = SKILL_LEVELS[level];
                if (!levelInfo) return null;
                const { name, color } = levelInfo;
                return (
                  <div
                    key={skill.id}
                    onClick={() => handleSkillClick(category, skill.id)}
                    className='cursor-pointer'
                  >
                    <span
                      className={`badge badge-sm select-none rounded-full p-3 text-sm ${color}`}
                    >
                      {level === 0 ? "" : `${level} |`} {skill.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default EditSkills;
