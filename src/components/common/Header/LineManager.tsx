import React, { useState } from "react";
import Link from "next/link";
import { GiTeacher } from "react-icons/gi";

const LineManager: React.FC = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setDropdownOpen(true)}
      onMouseLeave={() => setDropdownOpen(false)}
    >
      <div className="menu-link text-sm text-gray-700 font-medium hover:text-primary">
        <span className="menu-title text-nowrap">Line Manager</span>
        <span className="menu-arrow flex lg:hidden">
          <i className={`ki-filled ${isDropdownOpen ? "ki-minus" : "ki-plus"} text-2xs`} />
        </span>
      </div>

      {/* Dropdown Menu */}
      <div
        className={`absolute top-full left-0 mt-1 top-5 w-48 py-2.5 border border-gray-300 bg-white shadow-md rounded-md transition-all duration-200 ${
          isDropdownOpen ? "block" : "hidden"
        }`}
      >
        <div className="menu-item">
          <Link
            href="/training"
            className="menu-link px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
          >
            <span className="menu-icon mr-2">
            <GiTeacher />
            </span>
            <span className="menu-title">Training</span>
          </Link>
        </div>
       
      </div>
    </div>
  );
};

export default LineManager;
