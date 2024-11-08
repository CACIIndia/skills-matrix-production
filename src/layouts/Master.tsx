"use client";

import React, { useState } from "react";
import Sidebar from "@/components/common/Sidebar";
import Header from "@/components/common/Header/index";
import SearchModal from "@/components/common/Header/SearchModal";
import useGetUsers from "@/lib/hooks/useGetUsers";

export default function MasterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isSearchModalOpen, setSearchModalOpen] = useState(false);
  const { data: users } = useGetUsers();

  // Set dynamic sidebar width and main content margin
  const sidebarWidth = isExpanded ? "17%" : "5%";
  const contentMarginLeft = isExpanded ? "17%" : "5%";

  const toggleSearchModal = () => setSearchModalOpen((prev) => !prev);
  const closeSearchModal = () => setSearchModalOpen(false);
  const toggleSidebar = () => setIsExpanded((prev) => !prev);

  return (
    <>
      <div className="flex">
      
        <div
          className="fixed z-2"
          style={{
            width: sidebarWidth,
            height: "100vh",
            transition: "width 0.3s ease",
          }}
        >
          <Sidebar isExpanded={isExpanded} toggleSidebar={toggleSidebar} />
        </div>

      
        <div
          className="flex w-full flex-col z-1"
          style={{
            marginLeft: contentMarginLeft,
            transition: "margin-left 0.3s ease",
          }}
        >
         
          <div
            className="fixed z-1"
            style={{ width: `calc(100% - ${contentMarginLeft})`, height: "80px"}}
          >
            <Header onClick={toggleSearchModal} />
          </div>
           
           <div className="" style={{width:"90%",margin:'auto' }}>
           <main className="" style={{ marginTop: "80px" }}>
            {children}
          </main>
           </div>
         
         
        </div>
      </div>

      {/* Search Modal */}
      {isSearchModalOpen && (
        <SearchModal
          isOpen={isSearchModalOpen}
          onClose={closeSearchModal}
          users={users || []}
        />
      )}
    </>
  );
}
