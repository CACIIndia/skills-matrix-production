"use client";

import classNames from "classnames";
import { useState } from "react";

import EditSkills from "@/components/views/profile/actions/EditSkills";
import Modal from "@/components/common/Modal";

import { SKILL_LEVELS } from "@/lib/constants/profile";
import { UserSkill } from "@/lib/types/profile";
import { updateUserSkills } from "@/app/actions/updateUserSkills";
import userSkillsMapper from "@/lib/mappers/userSkillsMapper";
import { useAppContext } from "@/app/context/AppContext";
import toast from "react-hot-toast";

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

const ProfileSkills = ({
  createdById = "",
  userSkills = [],
  showEditButton,
}: ProfileSkillsProps) => {
  const mappedUserSkills = userSkillsMapper(userSkills);

  const { setProfile, profile } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState(mappedUserSkills);

  const handleEdit = async () => {
    const toastId = toast.loading("Updating Skills...");
    const result = await updateUserSkills(createdById, selectedSkills);
    console.log(result);

    setProfile(() => {return {...profile, ...result?.updatedUser }});
    toast.success(result.message, { id: toastId });
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
                    const level = userSkill.level;
                    const { name } = SKILL_LEVELS[level];

                    if (!name) {
                      return null;
                    }

                    return (
                      <span
                        key={userSkill.id}
                        className={classNames("badge badge-sm", {
                          "badge-outline": level === 0,
                          "badge-danger": level === 1,
                          "badge-warning": level === 2,
                          "badge-primary": level === 3,
                          "badge-success": level === 4,
                        })}
                      >
                        {userSkill.skill.name} | {name}
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
        buttonText='Update'
        handler={handleEdit}
        customWidth="w-[100%] lg:w-[70%] h-[100%] lg:h-[90%]"
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
