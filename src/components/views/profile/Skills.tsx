"use client";

import classNames from "classnames";
import { useEffect, useState } from "react";

import EditSkills from "@/components/views/profile/actions/EditSkills";
import Modal from "@/components/common/Modal";

import { SKILL_LEVELS } from "@/lib/constants/profile";
import { UserSkill } from "@/lib/types/profile";
import { updateUserSkills } from "@/app/actions/updateUserSkills";
import userSkillsMapper from "@/lib/mappers/userSkillsMapper";
import { useAppContext } from "@/app/context/AppContext";
import toast from "react-hot-toast";
import { useParams } from "next/navigation";

export type SelectedSkill = {
  createdById: string;
  skillId: string;
  level: number;
};

type ProfileSkillsProps = {
  createdById?: string;
  userSkills?: UserSkill[];
  showEditButton?: boolean;
  disableEdit?: boolean;
};

const ProfileSkills = ({
  createdById = "",
  userSkills = [],
  showEditButton,
  disableEdit = false,
}: ProfileSkillsProps) => {
  const mappedUserSkills = userSkillsMapper(userSkills);
  const { setProfile, profile } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  const params = useParams();
  const [initialselectedSkills, setinitialselectedSkills] =
    useState(mappedUserSkills);
  const [selectedSkills, setSelectedSkills] = useState(mappedUserSkills);

  useEffect(() => {
    setSelectedSkills(initialselectedSkills);
  }, [isOpen]);
  const handleEdit = async () => {
    const toastId = toast.loading("Updating Skills...");
    const tempSelectedSkill = [...selectedSkills];
    const result = await updateUserSkills(createdById, selectedSkills);

    setProfile(() => {
      return { ...profile, ...result?.updatedUser };
    });
    toast.success(result.message, { id: toastId });
    setSelectedSkills(tempSelectedSkill);
    setinitialselectedSkills(tempSelectedSkill);
  };

  return (
    <div>
      <div className='lg:gap-7.5 flex flex-col gap-5'>
        <div className='card'>
          <div className='card-header flex items-center justify-between'>
            <h3 className='card-title'>Skills</h3>

            {disableEdit ||
              (showEditButton && (
                <button
                  className='btn btn-sm btn-icon btn-clear btn-primary'
                  onClick={() => setIsOpen(true)}
                >
                  <i className='ki-filled ki-notepad-edit'></i>
                </button>
              ))}
          </div>

          <div className='card-body'>
            <div className='mb-2 flex flex-col'>
              {userSkills && userSkills.length > 0 ? (
                <>
                  {[4, 3, 2, 1].map((level) => {
                    const filteredSkills = userSkills.filter(
                      (skill) => skill.level === level,
                    );

                    if (filteredSkills.length === 0) return null;

                    return (
                      <div key={level} className='flex flex-col'>
                        <h4 className='mb-1 text-lg font-light text-gray-700'>
                          {SKILL_LEVELS[level]?.name}{" "}
                        </h4>
                        <div className='flex flex-wrap gap-[8px]'>
                          {filteredSkills.map((userSkill) => (
                            <span
                              key={userSkill.id}
                              className={classNames("badge badge-sm", {
                                "badge-outline p-2": level === 0,
                                "badge-blue-basic p-2": level === 1,
                                "badge-orange p-2": level === 2,
                                "badge-green p-2": level === 3,
                                "badge-blue p-2": level === 4,
                              })}
                            >
                              {userSkill.skill.name} 
                            </span>
                          ))}
                        </div>
                        {level !== 1 && (
                          <div className='my-4 h-[1px] border-b border-b-gray-200'></div>
                        )}
                      </div>
                    );
                  })}
                </>
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

      {
        params?.id &&<Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title='Edit Skills'
        buttonText='Update'
        handler={handleEdit}
        customWidth='w-[100%] lg:w-[70%] h-[100%] lg:h-[90%]'
      >
        <EditSkills
          createdById={createdById}
          selectedSkills={selectedSkills}
          setSelectedSkills={setSelectedSkills}
        />
      </Modal>

      }

      
    </div>
  );
};

export default ProfileSkills;
