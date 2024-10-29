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

  const toggleSearchModal = () => setSearchModalOpen((prev) => !prev);
  const closeSearchModal = () => setSearchModalOpen(false);
  const toggleSidebar = () => setIsExpanded((prev) => !prev);

  return (
    <>
      <div className='flex h-screen w-full'>
        <Sidebar isExpanded={isExpanded} toggleSidebar={toggleSidebar} />

        <div className='flex w-full flex-col'>
          <Header onClick={toggleSearchModal} />
          <main className='p-6'>{children}</main>
        </div>
      </div>

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
