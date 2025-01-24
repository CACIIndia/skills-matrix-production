import { useAppContext } from "@/app/context/AppContext";
import React from "react";
import { FiX } from "react-icons/fi"; // Importing close icon

const SkillList = () => {
  const { selectedItems, removeSelectedItem } = useAppContext();

  return (
    <div className='flex flex-wrap gap-2'>
      {selectedItems.map((item) => (
        <div
          key={item?.id}
          style={{ backgroundColor: item?.color }}
          className={`text-style flex items-center gap-1 rounded-md px-1 py-1 text-white`}
        >
          <span className=''>{item.name}</span>
          <button onClick={() => removeSelectedItem(item.id)} className=''>
            <FiX size={14} className='rounded' />
          </button>
        </div>
      ))}
    </div>
  );
};

export default SkillList;
