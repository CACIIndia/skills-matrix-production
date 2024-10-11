"use client";

import classNames from "classnames";
import { useEffect, useState } from "react";

import EditSkills from "@/components/views/profile/actions/EditSkills";
import Modal from "@/components/common/Modal";

import { SKILL_LEVELS } from "@/lib/constants/profile";
import { UserSkill } from "@/lib/types/profile";
import useGetSkills from "@/lib/hooks/profile/useGetSkills";
import { updateUserSkills } from "@/app/actions/updateUserSkills";

type ProfileSkillsProps = {
  userId?: string;
  userSkills?: UserSkill[];
  showEditButton?: boolean;
};

const ProfileSkills: React.FC<ProfileSkillsProps> = ({
  userId,
  userSkills,
  showEditButton,
}) => {
  const { data } = useGetSkills();

  const [isOpen, setIsOpen] = useState(false);
  const [skillLevels, setSkillLevels] = useState<Record<string, any[]>>(
    data || {},
  );

  // @TODO This should be refactored and moved out of the component
  useEffect(() => {
    if (data && userSkills) {
      const updatedSkillLevels = { ...data };

      userSkills.forEach((userSkill) => {
        const category = userSkill.skill.category;
        const skillId = userSkill.skillId;
        const level = userSkill.level;

        if (updatedSkillLevels[category]) {
          const skill = updatedSkillLevels[category].find(
            (skill) => skill.id === skillId,
          );
          if (skill) {
            skill.level = level;
          }
        }
      });

      setSkillLevels(updatedSkillLevels);
    }
  }, [data]);

  return (
    <div>
      <div className='lg:gap-7.5 flex flex-col gap-5'>
        <div className='card'>
          <div className='card-header flex items-center justify-between'>
            <h3 className='card-title'>Skills</h3>

            {showEditButton && (
              <button
                className='btn btn-sm btn-icon btn-clear btn-primary'
                onClick={() => setIsOpen(true)}
              >
                <i className='ki-filled ki-notepad-edit'></i>
              </button>
            )}
          </div>

          <div className='card-body'>
            <div className='mb-2 flex flex-wrap gap-2.5'>
              {userSkills && userSkills?.length > 0 ? (
                <div className='mb-2 flex flex-wrap gap-2.5'>
                  {userSkills?.map((userSkill) => {
                    const { name, color } = SKILL_LEVELS[userSkill.level];

                    if (!name) {
                      return null;
                    }

                    return (
                      <span
                        key={userSkill.id}
                        className={classNames("badge badge-sm", color)}
                      >
                        {userSkill.skill.name} ({name})
                      </span>
                    );
                  })}
                </div>
              ) : (
                <div className='text-center text-gray-600'>
                  <p>No skills found</p>
                  {showEditButton && (
                    <button
                      className='btn btn-primary mt-4'
                      onClick={() => setIsOpen(true)}
                    >
                      Add Skills
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title='Edit Skills'
        primaryButton
        primaryButtonOnClick={async () => {
          const filteredSkillLevels = Object.values(skillLevels)
            .flat()
            .filter((skill: any) => skill.level !== 0);

          userId && (await updateUserSkills(userId, filteredSkillLevels));
        }}
      >
        <EditSkills skillLevels={skillLevels} setSkillLevels={setSkillLevels} />
      </Modal>
    </div>
  );
};

export default ProfileSkills;
