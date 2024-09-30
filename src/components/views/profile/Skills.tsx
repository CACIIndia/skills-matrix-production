"use client";

import classNames from "classnames";
import { useState } from "react";

import EditSkills from "@/components/views/profile/actions/EditSkills";
import Modal from "@/components/common/Modal";

import { SKILL_LEVELS } from "@/lib/constants/profile";
import { Skill } from "@/lib/types/profile";

type ProfileSkillsProps = {
  skills: Skill[];
  showEditButton?: boolean;
};

const ProfileSkills: React.FC<ProfileSkillsProps> = ({
  skills = [],
  showEditButton,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen(!isOpen);

  return (
    <div className=''>
      <div className='lg:gap-7.5 flex flex-col gap-5'>
        <div className='card'>
          <div className='card-header flex items-center justify-between'>
            <h3 className='card-title'>Skills</h3>

            {showEditButton && (
              <button
                className='btn btn-sm btn-icon btn-clear btn-primary'
                onClick={handleToggle}
              >
                <i className='ki-filled ki-notepad-edit'></i>
              </button>
            )}
          </div>

          <div className='card-body'>
            <div className='mb-2 flex flex-wrap gap-2.5'>
              {skills.map((skill, index) => {
                const { name, color } = SKILL_LEVELS[skill.level];

                if (!name) {
                  console.error(`Unknown skill level: ${skill.level}`);
                  return null;
                }

                return (
                  <span
                    key={index}
                    className={classNames("badge badge-sm", color)}
                  >
                    {skill.name} ({name})
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={handleToggle} title='Edit Skills'>
        <EditSkills />
      </Modal>
    </div>
  );
};

export default ProfileSkills;
