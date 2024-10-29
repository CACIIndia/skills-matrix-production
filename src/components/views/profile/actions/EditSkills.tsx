"use client";

import { Dispatch, SetStateAction } from "react";
import classNames from "classnames";

import Legend from "@/components/views/profile/Legend";
import { SelectedSkill } from "@/components/views/profile/Skills";
import SkeletonLoader from "@/components/skeletons/EditSkills";

import { SKILL_LEVELS } from "@/lib/constants/profile";
import useGetSkills from "@/lib/hooks/profile/useGetSkills";

type EditSkillsProps = {
  selectedSkills: SelectedSkill[];
  setSelectedSkills: Dispatch<SetStateAction<SelectedSkill[]>>;
  createdById: string;
};

const EditSkills = ({
  selectedSkills,
  setSelectedSkills,
  createdById,
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
        return [...prev, { createdById, skillId, level: 1 }];
      }
    });
  };

  return (
    <div className='space-y-6'>
      <Legend layout='horizontal' hideCardHeader={true} />

      <div className='text-start'>
        <h5 className='text-lg font-semibold text-gray-800'>
          Click on the Skills below to cycle through the competency levels
        </h5>
      </div>

      <hr className='border-gray-200' />

      <div className='space-y-6'>
        {isLoading ? (
          <SkeletonLoader />
        ) : (
          categorySkills?.map(({ category, skills }) => (
            <div key={category} className='space-y-3'>
              <h6 className='text-lg font-semibold text-gray-700'>
                {category}
              </h6>

              <div className='flex flex-wrap gap-3'>
                {skills.map((skill) => {
                  const selectedSkill = selectedSkills.find(
                    (selectedSkill) => selectedSkill.skillId === skill.id,
                  );

                  const level = selectedSkill ? selectedSkill.level : 0;

                  return (
                    <button
                      key={skill.id}
                      onClick={() => handleSkillClick(skill.id)}
                      className={classNames(
                        "badge badge-sm select-none rounded-full px-3 py-1.5 text-sm font-medium transition-colors duration-200",
                        {
                          "!bg-gray-200 !text-gray-600": level === 0,
                          "!bg-red-100 !text-red-600": level === 1,
                          "!bg-yellow-100 !text-yellow-600": level === 2,
                          "!bg-blue-100 !text-blue-600": level === 3,
                          "!bg-green-100 !text-green-600": level === 4,
                        },
                      )}
                    >
                      {level > 0 && <span className='mr-1'>{level} |</span>}
                      {skill.name}
                    </button>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default EditSkills;
