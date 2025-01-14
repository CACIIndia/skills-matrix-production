import { useAppContext } from "@/app/context/AppContext";
import React from "react";
import { FiX } from "react-icons/fi"; // Importing close icon

const SkillList = () => {
  const { selectedItems, removeSelectedItem } = useAppContext();

  return (
    
      
      <div className="flex flex-wrap gap-2">
        {selectedItems.map((item) => (
<>
<span className="badge badge-sm badge-gray-200">
<span>{item.name}</span>
<button
  onClick={() => removeSelectedItem(item.id)}
  className=""
>
  <FiX size={14} className="rounded" />
</button>
</span>
</>
       
        ))}
      </div>
   
  );
};

export default SkillList;

