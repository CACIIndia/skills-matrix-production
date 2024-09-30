"use client";

import React, { useState } from "react";
import Legend from "./Legendcard";
import { dummySkillData } from "@/lib/constants/dummydata";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

interface Skill {
  name: string;
  level: number;
}

interface SkillCardProps {
  skills: Skill[];
  showEditButton?: boolean;
}

const skillLevels: Record<number, { name: string; color: string }> = {
  0: { name: "None", color: "badge-outline" },
  1: { name: "Novice", color: "badge-danger" },
  2: { name: "Proficient", color: "badge-warning" },
  3: { name: "Expert", color: "badge-primary" },
  4: { name: "Specialist", color: "badge-success" },
};

const SkillCard: React.FC<SkillCardProps> = ({
  skills = [],
  showEditButton,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const initialLevels = dummySkillData.map((category) => ({
    uid: category.uid,
    name: category.name,
    sub_skills: category.skills.map((skill) => ({
      skillsuid: skill.uid,
      level: 0,
      name: skill.name,
    })),
  }));

  const MAX_LEVEL = Object.keys(skillLevels).length - 1;

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
    <div className=''>
      <div className='lg:gap-7.5 flex flex-col gap-5'>
        <div className='card'>
          <div className='card-header flex items-center justify-between'>
            <h3 className='card-title'>Skills</h3>
            {showEditButton && (
              <button
                className='btn btn-sm btn-icon btn-clear btn-primary'
                onClick={toggleModal}
                style={{ zIndex: 1 }}
              >
                <i className='ki-filled ki-notepad-edit'></i>
              </button>
            )}
          </div>
          <div className='card-body'>
            <div className='mb-2 flex flex-wrap gap-2.5'>
              {skills.map((skill, index) => {
                const levelInfo = skillLevels[skill.level];

                if (!levelInfo) {
                  console.error(`Unknown skill level: ${skill.level}`);
                  return null;
                }

                const { name, color } = levelInfo;
                return (
                  <span key={index} className={`badge badge-sm ${color}`}>
                    {skill.name} ({name})
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <Dialog
        open={isModalOpen}
        onClose={toggleModal}
        className='relative z-10 focus:outline-none'
      >
        <DialogBackdrop className='fixed inset-0 bg-black/30' />

        <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4'>
            <DialogPanel className='w-full max-w-6xl rounded bg-white p-6'>
              <div className='mt-4 flex justify-end'>
                <button
                  className='btn btn-sm btn-icon btn-light btn-clear shrink-0'
                  onClick={toggleModal}
                >
                  <i className='ki-filled ki-cross'></i>
                </button>
              </div>

              <DialogTitle className='mb-4 flex items-center justify-between'>
                <Legend layout='flex' hideCardHeader={true} />
              </DialogTitle>

              <div className='p-5 text-start'>
                <h5 className='font-bold'>
                  Click on the Skills below to cycle through the competency
                  levels
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
                        const levelInfo = skillLevels[level];
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
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default SkillCard;
