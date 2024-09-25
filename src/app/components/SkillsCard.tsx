"use client";
import React, { useState } from 'react';
import Legend from './Legendcard';

interface Skill {
  name: string;
  level: number; // Level as a number
}

interface SkillCardProps {
  skills: Skill[];
  showEditButton?: boolean; // Optional prop to show the edit button
}

const skillLevels: Record<number, { name: string; color: string }> = {
  0: { name: 'None', color: 'badge-outline' },
  1: { name: 'Novice', color: 'badge-danger' },
  2: { name: 'Proficient', color: 'badge-warning' },
  3: { name: 'Expert', color: 'badge-primary' },
  4: { name: 'Specialist', color: 'badge-success' },
  5: { name: 'Master', color: 'badge-info' }, // Optional additional level if needed
};

const SkillCard: React.FC<SkillCardProps> = ({ skills, showEditButton }) => {
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

  return (
    <div className='col-span-2'>
      <div className='flex flex-col gap-5 lg:gap-7.5'>
        <div className='card'>
          <div className='card-header flex justify-between items-center'>
            <h3 className='card-title'>Skills</h3>
            {showEditButton && (
              <button 
                className='btn btn-sm btn-icon btn-clear btn-primary' 
                onClick={toggleModal}
              >
                <i className='ki-filled ki-notepad-edit'></i>
              </button>
            )}
          </div>
          <div className='card-body'>
            <div className='flex flex-wrap gap-2.5 mb-2'>
              {skills.map((skill, index) => {
                const levelInfo = skillLevels[skill.level];
                
                if (!levelInfo) {
                  console.error(`Unknown skill level: ${skill.level}`);
                  return null; // Skip rendering for unknown levels
                }

                const { name, color } = levelInfo;
                return (
                  <span
                    key={index}
                    className={`badge badge-sm ${color}`}
                  >
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
         <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50" onClick={handleOverlayClick}>
         <div className="bg-white rounded-lg shadow-lg  w-[80%] h-[500px]">
           <div className="border-b-2 p-4 flex justify-between items-center">
             <h2 className="text-xl">Editing Skills</h2>
             <button
               type="button"
               className="btn btn-outline-dark"
               onClick={toggleModal}
             >
               Close
             </button>
           </div>
           <Legend layout='flex' hideCardHeader={true} />
         </div>
       </div>
      )}
    </div>
  );
};

export default SkillCard;
