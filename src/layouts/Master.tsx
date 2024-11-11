"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "@/components/common/Sidebar";
import Header from "@/components/common/Header/index";
import SearchModal from "@/components/common/Header/SearchModal";
import useGetUsers from "@/lib/hooks/useGetUsers";
import MobileSideBar from "@/components/common/mobileSideBar";


export default function MasterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isSearchModalOpen, setSearchModalOpen] = useState(false);
  const [isSidebarModalOpen, setSidebarModalOpen] = useState(false); // Add state for sidebar modal visibility
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const { data: users } = useGetUsers();
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const toggleMobileSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  // Set dynamic sidebar width and main content margin
  const sidebarWidth = isExpanded ? "17%" : "5%";
  const contentMarginLeft = isExpanded ? "17%" : "5%";

  const toggleSearchModal = () => setSearchModalOpen((prev) => !prev);
  const closeSearchModal = () => setSearchModalOpen(false);
  const toggleSidebar = () => setIsExpanded((prev) => !prev);
  const toggleSidebarModal = () => setSidebarModalOpen((prev) => !prev); // Toggle sidebar modal visibility

  useEffect(() => {
    setScreenWidth(window.innerWidth);

    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const screenSize =
    screenWidth >= 1536
      ? "2xl"
      : screenWidth >= 1280
      ? "xl"
      : screenWidth >= 1024
      ? "lg"
      : screenWidth >= 768
      ? "md"
      : "sm";

  return (
    <>
      <div className="flex">
        {/* Desktop Sidebar */}
        <div
          className="fixed z-2 hidden lg:block"
          style={{
            width: sidebarWidth,
            height: "100vh",
            transition: "width 0.3s ease",
          }}
        >
          <Sidebar isExpanded={isExpanded} toggleSidebar={toggleSidebar} />
        </div>

        {/* Main Content Area */}
        <div
          className={`wrapper flex grow flex-col`}
          style={{
            marginLeft:
              screenSize === "lg" || screenSize === "xl" || screenSize === "2xl"
                ? contentMarginLeft
                : "",
            transition: "margin-left 0.3s ease",
          }}
        >
          {/* Header */}
          <div
          
            className="fixed z-1"
            style={{
              width:
                screenSize === "sm" || screenSize === "md"
                  ? "100%"
                  : `calc(100% - ${contentMarginLeft})`,
            
              transition: "width 0.3s ease",
              height:"80px"
       
            }}
          >
            <Header onClick={toggleSearchModal} mobileSideBarClick ={toggleMobileSidebar} isSidebarVisible={isSidebarVisible} />
           
          </div>

          {/* Main Content */}
         
            <main className=" grow content pt-5" style={{ marginTop: "90px",width:"100%" }}>
              {children}
            </main>
          
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

      {/* Sidebar Modal for Mobile */}
      {isSidebarVisible && (
        <MobileSideBar
          isOpen={isSidebarModalOpen}
          onClose={toggleMobileSidebar} // Close sidebar modal when clicking outside
        />
      )}
    </>
  );
}
