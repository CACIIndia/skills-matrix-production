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

const MenuAccordion: React.FC<MenuAccordionProps> = ({ data ,handleItemClick}) => {
  const sortedData = data?.sort((a,b) => a?.category?.localeCompare(b?.category));
  const updatedData = sortedData?.map((item, index) => ({
    ...item,
    color: skillsHexColors[index % skillsHexColors?.length].color
  }));

  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const { selectedItems } = useAppContext();

  const toggleCategory = (category: string) => {
    setActiveCategory(activeCategory === category ? null : category);
  };

  return (
    <div className="menu-accordion block gap-0.5 pl-[10px] relative before:absolute before:left-[20px] before:top-0 before:bottom-0 before:border-l before:border-gray-200">
      {updatedData?.map((category) => {
        const sortedSkills = category.skills.sort((a,b) => a?.name?.localeCompare(b?.name));
        return (
          <div
          key={category.category}
          className="menu-item "
         
        >
          {/* Category Title */}
          <div
            className="menu-link  border border-transparent grow cursor-pointer gap-[14px] pl-[10px] pr-[10px] py-[8px]"
            onClick={() => toggleCategory(category.category)}
          >
            <span className="menu-bullet flex w-[6px] relative before:absolute before:top-0 before:size-[6px] before:rounded-full before:-translate-x-1/2 before:-translate-y-1/2 menu-item-active:before:bg-primary menu-item-hover:before:bg-primary"></span>
            <span className="menu-title text-2sm font-medium mr-1 text-gray-700 menu-item-active:text-primary menu-item-active:font-semibold menu-link-hover:!text-primary">
              {category.category}
            </span>
            <span className="menu-arrow text-gray-400 w-[20px] shrink-0">
              {activeCategory === category.category ? (
                <i className="ki-filled ki-minus text-2xs"></i>
              ) : (
                <i className="ki-filled ki-plus text-2xs"></i>
              )}
            </span>
          </div>

          {/* Sub-menu */}
          
            <div className={`menu-accordion  ${activeCategory === category.category ?"block":"hidden"} gap-0.5 relative before:absolute before:left-[32px] pl-[22px] before:top-0 before:bottom-0 before:border-l before:border-gray-200`}>
              {sortedSkills?.map((skill) => (
                <div key={skill.id} className={`menu-item ${selectedItems.find((item) => item.id === skill.id) ? "active" : ""}`}
                onClick={()=>{handleItemClick({...skill, color:category?.color })}} >
                  <span
                   
                    className="menu-link border border-transparent items-center grow menu-item-active:bg-secondary-active dark:menu-item-active:bg-coal-300 dark:menu-item-active:border-gray-100 menu-item-active:rounded-lg hover:bg-secondary-active dark:hover:bg-coal-300 dark:hover:border-gray-100 hover:rounded-lg gap-[5px] pl-[10px] pr-[10px] py-[8px]"
                  >
                    <span className="menu-bullet flex w-[6px] relative before:absolute before:top-0 before:size-[6px] before:rounded-full before:-translate-x-1/2 before:-translate-y-1/2 menu-item-active:before:bg-primary menu-item-hover:before:bg-primary"></span>
                    <span className="menu-title text-2sm font-medium text-gray-700 menu-item-active:text-primary menu-item-active:font-semibold menu-link-hover:!text-primary">
                      {skill.name}
                    </span>
                  </span>
                </div>
              ))}
            </div>
        
        </div>

        )
      })}
      
    </div>
  );
};

export default MenuAccordion;
