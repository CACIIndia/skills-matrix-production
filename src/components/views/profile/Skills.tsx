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
  userSkills: Record<string, UserSkill[]>;
  showEditButton?: boolean;
};

const ProfileSkills: React.FC<ProfileSkillsProps> = ({
  userSkills = {},
  showEditButton,
}) => {
  const { data } = useGetSkills();
  console.log(userSkills,"userSkills");
  

  const [isOpen, setIsOpen] = useState(false);
  const [skillLevels, setSkillLevels] = useState<Record<string, any[]>>(
    data || {},
  );

  useEffect(() => {
    // Initialize skill levels with data
    setSkillLevels(data || {});
  }, [data]);

  // Flatten all skills into a single array
  const allSkills = Object.values(userSkills).flat();

  return (
    <div className=''>
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
              {allSkills.map((userSkill) => {
                const { name, color } = SKILL_LEVELS[userSkill.level];

                if (!name) {
                  console.error(`Unknown skill level: ${userSkill.level}`);
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
          </div>
        </div>
      </div>

      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title='Edit Skills'
        primaryButton
        primaryButtonOnClick={async () => {
          console.log("This is being called");

          const filteredSkillLevels = Object.values(skillLevels)
            .flat()
            .filter((skill: any) => skill.level !== 0);

          // Temporarily pass through fixed id
          await updateUserSkills(
            "fd00e148-dea9-4080-8a37-3a55b3c604dd",
            filteredSkillLevels,
          );
        }}
      >
        <EditSkills skillLevels={skillLevels} setSkillLevels={setSkillLevels} />
      </Modal>
    </div>
  );
};

export default ProfileSkills;
