import { useState } from "react";

import Legend from "@/components/views/profile/Legend";

import { dummySkillData } from "@/lib/constants/dummydata";
import { SKILL_LEVELS } from "@/lib/constants/profile";

type EditSkillsProps = {};

// @TODO Refactor this component

const EditSkills = (props: EditSkillsProps) => {
  const initialLevels = dummySkillData.map((category) => ({
    uid: category.uid,
    name: category.name,
    sub_skills: category.skills.map((skill) => ({
      skillsuid: skill.uid,
      level: 0,
      name: skill.name,
    })),
  }));

  const MAX_LEVEL = SKILL_LEVELS.length - 1;

  const [skillLevelsState, setSkillLevelsState] = useState(initialLevels);

  const handleSkillClick = (skillsuid: number) => {
    setSkillLevelsState((prevLevels) =>
      prevLevels.map((category) => ({
        ...category,
        sub_skills: category.sub_skills.map((skill) =>
          skill.skillsuid === skillsuid
            ? {
                ...skill,
                level: skill.level + 1 > MAX_LEVEL ? 0 : skill.level + 1,
              }
            : skill,
        ),
      })),
    );
  };
  return (
    <>
      <Legend layout='flex' hideCardHeader={true} />

      <div className='p-5 text-start'>
        <h5 className='font-bold'>
          Click on the Skills below to cycle through the competency levels
        </h5>
      </div>
      <hr />

      <div className='mt-4 space-y-4'>
        {skillLevelsState.map((category) => (
          <div key={category.uid}>
            <h3 className='mb-2 text-start text-2xl font-bold'>
              {category.name}
            </h3>

            <div className='mb-4 flex flex-wrap gap-3'>
              {category.sub_skills.map((skill) => {
                const level = skill.level;
                const levelInfo = SKILL_LEVELS[level];
                if (!levelInfo) return null;
                const { name, color } = levelInfo;
                return (
                  <div
                    key={skill.skillsuid}
                    onClick={() => handleSkillClick(skill.skillsuid)}
                    className='cursor-pointer'
                  >
                    <span
                      className={`badge badge-sm text-sm ${color} rounded-full p-3`}
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
