import { useState } from "react";
import { AiOutlineClose, AiOutlineHome, AiOutlineUser, AiOutlineSetting, AiOutlineInfoCircle } from "react-icons/ai";


type MobileSideBarProps = {
  isOpen: boolean;
  onClose: () => void;
};

const MobileSideBar = ({ isOpen, onClose }: MobileSideBarProps) => {
   
  return (
    <div
      className={`fixed inset-0 z-50 flex bg-gray-800 bg-opacity-75 transform ${
        !isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out`}
    >
      <div className="w-64 bg-white h-full shadow-lg">
        {/* Close button */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-700">Menu</h2>
          <button onClick={onClose} className="text-gray-600">
            <AiOutlineClose size={24} />
          </button>
        </div>
           
           <div>maggi</div>
        {/* Sidebar Content */}
      
      </div>
    </div>
  );
};

export default MobileSideBar;
