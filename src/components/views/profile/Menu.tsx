"use client";

import Menu from "@/components/common/Menu";
import ProfileActions from "@/components/views/profile/Actions";
import {
  PROFILE_MENU_ITEMS,
  VIEW_PROFILE_MENU_ITEMS,
} from "@/lib/constants/header";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const ProfileMenu = () => {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");
  const items = PROFILE_MENU_ITEMS;
  const [activePath, setActivePath] = useState(items[0]?.path || "");

  useEffect(()=>{
    if(tab){
      const activeItem = items.find((item) => item.name.includes(tab));
      if(activeItem){
        setActivePath(activeItem.path);
      }
    }
  },[])

  const handleMenuClick = (path: string) => {
    setActivePath(path); 
    const sectionId = path.split("/").pop(); 
    const section = document.getElementById(sectionId || "");
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
