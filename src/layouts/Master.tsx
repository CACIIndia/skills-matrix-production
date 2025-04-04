"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "@/components/common/Sidebar";
import Header from "@/components/common/Header/index";
import SearchModal from "@/components/common/Header/SearchModal";
import useGetUsers from "@/lib/hooks/useGetUsers";
import MobileSideBar from "@/components/common/mobileSideBar";
import Banner from "@/components/custom-icons/Banner";
import ProfileHeader from "@/components/views/profile/Header";
import { useParams } from "next/navigation";
import { useAppContext } from "@/app/context/AppContext";

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
  const params = useParams();
  const userId = params.id ? String(params.id) : "";
  const editProfile = userId ? false : true;

  const { profile, viewedProfile, setViewedProfile, isLoading } =
    useAppContext();

  const data = userId ? viewedProfile : profile;
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
      <div className='h-[100%]'>
        <Header
          onClick={toggleSearchModal}
          mobileSideBarClick={toggleMobileSidebar}
        />

        {/* Main Content */}

        <main
          className='content mt-16 grow'
          style={{ width: "100%", zIndex: 90 }}
        >
          {children}
        </main>
      </div>

      {/* Search Modal */}
      {/*  {isSearchModalOpen && (
        <SearchModal
          isOpen={isSearchModalOpen}
          onClose={closeSearchModal}
          users={users || []}
        />
      )} */}
    </>
  );
}
