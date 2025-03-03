import React from "react";

const HeaderSkeleton = () => {
  return (
    <header className="h-full flex items-center justify-between bg-[#fefefe] transition-all duration-300 shadow-sm border-b border-b-coal-100 animate-pulse">
      <div className="container-fixed flex justify-between items-stretch lg:gap-4">
        <div className="hidden lg:flex items-stretch">
          <div className="flex items-stretch space-x-4">
            <div className="w-32 h-8 bg-gray-200 rounded"></div>
            
          </div>
        </div>

        <div className="flex gap-1 lg:hidden items-center -ml-1">
          <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
        </div>

        <div className="flex items-start gap-2 lg:gap-3.5">
        <div className="w-9 h-9 bg-gray-200 rounded-full"></div>
          <div className="w-9 h-9 bg-gray-200 rounded-full"></div>
          <div className="w-9 h-9 bg-gray-200 rounded-full"></div>
          <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
        </div>
      </div>
    </header>
  );
};

export default HeaderSkeleton;
