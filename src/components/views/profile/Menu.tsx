"use client";

import Menu from "@/components/common/Menu";
import ProfileActions from "@/components/views/profile/Actions";
import {
  PROFILE_MENU_ITEMS,
  VIEW_PROFILE_MENU_ITEMS,
} from "@/lib/constants/header";
import { useParams } from "next/navigation";

const ProfileMenu = () => {
  const { id } = useParams();

  const items = id ? VIEW_PROFILE_MENU_ITEMS : PROFILE_MENU_ITEMS;

  return (
    <div className='container-fixed' >
      <div className='mb-2 flex flex-nowrap items-center justify-between gap-6 border-b border-b-gray-200 lg:items-end'>
        <Menu items={items} />
        <ProfileActions />
      </div>
    </div>
  );
};

export default ProfileMenu;
