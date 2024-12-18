import { useAppContext } from "@/app/context/AppContext";
import React from "react";
import { FiX } from "react-icons/fi"; // Importing close icon

const SkillList = () => {
  const { selectedItems, removeSelectedItem } = useAppContext();

  return (
    
      
      <div className="flex flex-wrap gap-2">
        {selectedItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center bg-gray-200 text-gray-700 rounded-full px-3 py-1"
          >
            <span className="mr-1">{item.name}</span>
            <button
              onClick={() => removeSelectedItem(item.id)}
              className="ml-1 text-gray-600 hover:text-gray-800 focus:outline-none"
            >
              <FiX size={16} />
            </button>
          </div>
        ))}
      </div>
   
  );
};

export default SkillList;
