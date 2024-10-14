"use client";

import { Dispatch, SetStateAction } from "react";

import Spinner from "@/components/common/Spinner";
import Legend from "@/components/views/profile/Legend";
import { SelectedSkill } from "@/components/views/profile/Skills";

import { SKILL_LEVELS } from "@/lib/constants/profile";
import useGetSkills from "@/lib/hooks/profile/useGetSkills";

type EditSkillsProps = {
  selectedSkills: SelectedSkill[];
  setSelectedSkills: Dispatch<SetStateAction<SelectedSkill[]>>;
  userId: string;
};

const EditSkills = ({
  selectedSkills,
  setSelectedSkills,
  userId,
}: EditSkillsProps) => {
  const { data: categorySkills, isLoading } = useGetSkills();

  const MAX_LEVEL = SKILL_LEVELS.length - 1;

  const handleSkillClick = (skillId: string) => {
    setSelectedSkills((prev) => {
      const selectedSkill = prev.find((skill) => skill.skillId === skillId);

      if (selectedSkill) {
        return prev.map((skill) =>
          skill.skillId === skillId
            ? {
                ...skill,
                level: skill.level + 1 > MAX_LEVEL ? 0 : skill.level + 1,
              }
            : skill,
        );
      } else {
        return [...prev, { userId, skillId, level: 1 }];
      }
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
        {isLoading ? (
          <Spinner className='mx-auto mt-24' />
        ) : (
          categorySkills?.map(({ category, skills }) => (
            <div key={category}>
              <h6 className='mb-2 text-lg font-semibold'>{category}</h6>

              <div className='mb-4 flex flex-wrap gap-3'>
                {skills.map((skill) => {
                  const selectedSkill = selectedSkills.find(
                    (selectedSkill) => selectedSkill.skillId === skill.id,
                  );

                  const level = selectedSkill ? selectedSkill.level : 0;
                  const levelInfo = SKILL_LEVELS[level];

                  return (
                    <div
                      key={skill.id}
                      onClick={() => handleSkillClick(skill.id)}
                      className='cursor-pointer'
                    >
                      <span
                        className={`badge badge-sm select-none rounded-full p-3 text-sm ${levelInfo.color}`}
                      >
                        {level === 0 ? "" : `${level} |`} {skill.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default EditSkills;
