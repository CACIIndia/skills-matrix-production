"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "@/components/common/Sidebar";
import Header from "@/components/common/Header/index";
import SearchModal from "@/components/common/Header/SearchModal";
import useGetUsers from "@/lib/hooks/useGetUsers";
import MobileSideBar from "@/components/common/mobileSideBar";
import Banner from "@/components/custom-icons/Banner";

export default function MasterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isSearchModalOpen, setSearchModalOpen] = useState(false);
  const [isSidebarModalOpen, setSidebarModalOpen] = useState(false); // Add state for sidebar modal visibility
  const [screenWidth, setScreenWidth] = useState(1024);
  const { data: users } = useGetUsers();
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const toggleMobileSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  // Set dynamic sidebar width and main content margin
  const sidebarWidth = isExpanded ? "14%" : "5%";
  const contentMarginLeft = isExpanded ? "14%" : "5%";

  const toggleSearchModal = () => setSearchModalOpen((prev) => !prev);
  const closeSearchModal = () => setSearchModalOpen(false);
  const toggleSidebar = () => setIsExpanded((prev) => !prev);

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
      <div className='flex'>
        <div className={`wrapper flex grow flex-col`}>
          {/* Header */}
          <div className="h-[56px] bg-yellow-300 fixed"></div>
          {/* Main Content */}
          <div>
            <Banner/>
          </div>
          <main
            className='content grow pt-5'
            style={{ marginTop: "90px", width: "100%" }}
          >
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
