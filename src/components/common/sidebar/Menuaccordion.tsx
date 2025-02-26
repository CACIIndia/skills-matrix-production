import { useAppContext } from "@/app/context/AppContext";
import React, { useState } from "react";
import { skillsHexColors } from "@/lib/constants/SkillsHexColors";

interface Skill {
  id: string;
  name: string;
  color?: string;
}

interface Category {
  category: string;
  skills: Skill[];
}

interface MenuAccordionProps {
  data: Category[];
  handleItemClick: (skill: Skill) => void;
}

const MenuAccordion: React.FC<MenuAccordionProps> = ({
  data,
  handleItemClick,
}) => {
  const sortedData = data?.sort((a, b) =>
    a?.category?.localeCompare(b?.category),
  );
  const updatedData = sortedData?.map((item, index) => ({
    ...item,
    color: skillsHexColors[index % skillsHexColors?.length].color,
  }));

  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const { selectedItems } = useAppContext();

  const toggleCategory = (category: string) => {
    setActiveCategory(activeCategory === category ? null : category);
  };

  return (
    <div className='menu-accordion relative block gap-0.5 pl-[10px] before:absolute before:bottom-0 before:left-[20px] before:top-0 before:border-l before:border-[#6D6E82] w-[100%]'>
      {updatedData?.map((category) => {
        const sortedSkills = category.skills.sort((a, b) =>
          a?.name?.localeCompare(b?.name),
        );
        return (
          <div key={category.category} className='menu-item'>
            {/* Category Title */}
            <div
              className='menu-link grow cursor-pointer gap-[14px] border border-transparent py-[8px] pl-[10px] pr-[10px]'
              onClick={() => toggleCategory(category.category)}
            >
              <span className='menu-bullet menu-item-active:before:bg-primary menu-item-hover:before:bg-primary relative flex w-[6px] before:absolute before:top-0 before:size-[6px] before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full'></span>
              <span className='menu-title text-2sm menu-item-active:text-primary menu-item-active:font-semibold menu-link-hover:!text-primary mr-1 font-medium text-gray-700'>
                {category.category}
              </span>
              <span className='menu-arrow w-[20px] shrink-0 text-gray-400'>
                {activeCategory === category.category ? (
                  <i className='ki-filled ki-minus text-2xs text-gray-700'></i>
                ) : (
                  <i className='ki-filled ki-plus text-2xs text-gray-700'></i>
                )}
              </span>
            </div>

            {/* Sub-menu */}

            <div
              className={`menu-accordion ${activeCategory === category.category ? "block" : "hidden"} relative gap-0.5 pl-[22px] before:absolute before:bottom-0 before:left-[32px] before:top-0 before:border-l before:border-[#6D6E82]`}
            >
              {sortedSkills?.map((skill) => (
                <div
                  key={skill.id}
                  className={`menu-item ${selectedItems.find((item) => item.id === skill.id) ? "active" : ""}`}
                  onClick={() => {
                    handleItemClick({ ...skill, color: category?.color });
                  }}
                >
                  <span className='menu-link menu-item-active:bg-secondary-active dark:menu-item-active:bg-coal-300 dark:menu-item-active:border-gray-100 menu-item-active:rounded-lg hover:bg-secondary-active dark:hover:bg-coal-300 grow items-center gap-[5px] border border-transparent py-[8px] pl-[10px] pr-[10px] hover:rounded-lg dark:hover:border-gray-100'>
                    <span className='menu-bullet menu-item-active:before:bg-primary menu-item-hover:before:bg-primary relative flex w-[6px] before:absolute before:top-0 before:size-[6px] before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full'></span>
                    <span className='menu-title text-2sm menu-item-active:text-primary menu-item-active:font-semibold menu-link-hover:!text-primary font-medium text-gray-700'>
                      {skill.name}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MenuAccordion;
