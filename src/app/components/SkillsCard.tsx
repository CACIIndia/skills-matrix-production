"use client";
import React, { useState } from "react";
import Legend from "./Legendcard";
import { dummySkillData } from "@/constants/dummydata";

interface Skill {
  name: string;
  level: number; // Level as a number
}

interface SkillCardProps {
  skills: Skill[];
  showEditButton?: boolean; // Optional prop to show the edit button
}

const skillLevels: Record<number, { name: string; color: string }> = {
  0: { name: "None", color: "badge-outline" },
  1: { name: "Novice", color: "badge-danger" },
  2: { name: "Proficient", color: "badge-warning" },
  3: { name: "Expert", color: "badge-primary" },
  4: { name: "Specialist", color: "badge-success" },
};

const SkillCard: React.FC<SkillCardProps> = ({ skills =[], showEditButton }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    // Close the modal if the overlay (background) is clicked
    if (e.currentTarget === e.target) {
      toggleModal();
    }
  };

  const initialLevels = dummySkillData.map((category) => ({
    uid: category.uid,
    name: category.name,
    sub_skills: category.skills.map((skill) => ({
      skillsuid: skill.uid,
      level: 0, // All skills start at level 0
      name: skill.name,
    })),
  }));

  const MAX_LEVEL = Object.keys(skillLevels).length - 1;

  const [skillLevelsState, setSkillLevelsState] = useState(initialLevels);

  const handleSkillClick = (skillsuid: number) => {
    // Create a copy of the current skill levels
    const newSkillLevels = [...skillLevelsState];

    // Find the skill by its uid and update its level
    for (const category of newSkillLevels) {
      const skillToUpdate = category.sub_skills.find(
        (skill) => skill.skillsuid === skillsuid
      );
      if (skillToUpdate) {
        // Update the level, resetting to 0 if it exceeds the maximum level
        skillToUpdate.level =
          skillToUpdate.level + 1 > MAX_LEVEL ? 0 : skillToUpdate.level + 1;
        break; // Exit loop once skill is found and updated
      }
    }

    setSkillLevelsState(newSkillLevels); // Update the state
  };

  return (
    <div  className="">
      <div className="lg:gap-7.5 flex flex-col gap-5" >
        <div className="card" >
          <div className="card-header flex items-center justify-between">
            <h3 className="card-title">Skills</h3>
            {showEditButton && (
              <button
                className="btn btn-sm btn-icon btn-clear btn-primary"
                onClick={toggleModal}
               style={{zIndex:1}}
               
              >
                <i  className="ki-filled ki-notepad-edit"  ></i>
              </button>
            )}
          </div>
          <div className="card-body">
            <div className="mb-2 flex flex-wrap gap-2.5">
              {skills.map((skill, index) => {
                const levelInfo = skillLevels[skill.level];

                if (!levelInfo) {
                  console.error(`Unknown skill level: ${skill.level}`);
                  return null; // Skip rendering for unknown levels
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

      {/* Tailwind CSS Modal for editing skills */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleOverlayClick}
         
        >
          <div className="flex relative h-[600px] w-[80%] flex-col rounded-lg bg-white shadow-lg">
            {/* Header */}
            <div className="flex items-center justify-between border-b-2 p-4">
              {/* <h2 className="text-xl">Editing Skills</h2> */}
              <Legend
              layout="flex"
              hideCardHeader={true}
              
            />
              <button
                className="btn btn-sm btn-icon btn-light btn-clear shrink-0 absolute right-3 top-3"
                onClick={toggleModal}
              >
                <i className="ki-filled ki-cross"></i>
              </button>
            </div>
            <div className="text-start p-5">
              <h5 className="font-bold">Click on the Skills below to cycle through the competency levels</h5>
               </div>
            <hr />

            {/* Scrollable Content */}
            <div className="flex-grow overflow-y-auto p-4 px-5">
              {skillLevelsState.map((category) => (
                <div key={category.uid} className="mb-4">
                  <h3 className="mb-2 text-start text-2xl font-bold">
                    {category.name}
                  </h3>

                  <div className="mb-4 flex flex-wrap gap-3">
                    {category.sub_skills.map((skill) => {
                      const level = skill.level;
                      const levelInfo = skillLevels[level]; // Retrieve level information
                      if (!levelInfo) return null;
                      const { name, color } = levelInfo;
                      return (
                        <div
                          key={skill.skillsuid}
                          onClick={() => handleSkillClick(skill.skillsuid)}
                          className="cursor-pointer"
                        >
                          <span
                            className={`badge badge-sm text-sm ${color} rounded-full p-3`}
                          >
                            {skill.name} ({level})
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillCard;
