"use client";

import classNames from "classnames";
import { useState } from "react";

import EditSkills from "@/components/views/profile/actions/EditSkills";
import Modal from "@/components/common/Modal";

import { SKILL_LEVELS } from "@/lib/constants/profile";
import { UserSkill } from "@/lib/types/profile";
import { updateUserSkills } from "@/app/actions/updateUserSkills";
import userSkillsMapper from "@/lib/mappers/userSkillsMapper";

export type SelectedSkill = {
  createdById: string;
  skillId: string;
  level: number;
};

type ProfileSkillsProps = {
  createdById?: string;
  userSkills?: UserSkill[];
  showEditButton?: boolean;
};

const ProfileSkills: React.FC<ProfileSkillsProps> = ({
  createdById = "",
  userSkills = [],
  showEditButton,
}) => {
  const mappedUserSkills = userSkillsMapper(userSkills);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState(mappedUserSkills);

  const handleEdit = async () => {
    updateUserSkills(createdById, selectedSkills);
  };

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
        primaryButton={true}
        primaryButtonOnClick={handleEdit}
      >
        <EditSkills
          createdById={createdById}
          selectedSkills={selectedSkills}
          setSelectedSkills={setSelectedSkills}
        />
      </Modal>
    </div>
  );
};

export default ProfileSkills;
