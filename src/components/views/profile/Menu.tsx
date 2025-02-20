"use client";

import Menu from "@/components/common/Menu";
import ProfileActions from "@/components/views/profile/Actions";
import {
  PROFILE_MENU_ITEMS,
  VIEW_PROFILE_MENU_ITEMS,
} from "@/lib/constants/header";
import { useParams } from "next/navigation";
import { useState } from "react";

const ProfileMenu = () => {
  const { id } = useParams();

  const items = id ? VIEW_PROFILE_MENU_ITEMS : PROFILE_MENU_ITEMS;
  const [activePath, setActivePath] = useState(items[0]?.path || "");

  const handleMenuClick = (path: string) => {
    setActivePath(path); 
    const sectionId = path.split("/").pop(); // Extracts "overview", "skills", etc.
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  return (
    <div className='' >
      <div className='mb-2 flex flex-nowrap items-center justify-between gap-6 border-b border-b-gray-200 lg:items-end'>
        <Menu items={items} handleMenuClick={handleMenuClick} activePath={activePath}/>
        <ProfileActions />
      </div>
    </div>
  );
};

export default ProfileMenu;
