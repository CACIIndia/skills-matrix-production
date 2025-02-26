"use client";
import { useEffect, useState, Suspense } from "react";
import Menu from "@/components/common/Menu";
import ProfileActions from "@/components/views/profile/Actions";
import {
  PROFILE_MENU_ITEMS,
  VIEW_PROFILE_MENU_ITEMS,
} from "@/lib/constants/header";
import { useParams, useSearchParams } from "next/navigation";

const ProfileMenuContent = () => {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");
  const items = PROFILE_MENU_ITEMS;
  const [activePath, setActivePath] = useState(items[0]?.path || "");
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollOffset = 400;

  useEffect(() => {
    if (tab) {
      const activeItem = items.find((item) => item.name.includes(tab));
      if (activeItem) {
        setActivePath(activeItem.path);
      }
    }
  }, []);

  const handleMenuClick = (path: string) => {
    setIsScrolling(true);
    setActivePath(path);

    const sectionId = path.split("/").pop();
    const section = document.getElementById(sectionId || "");

    if (section) {
      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: sectionTop - scrollOffset,
        behavior: "smooth",
      });
    }

    setTimeout(() => {
      setIsScrolling(false);
    }, 800);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (isScrolling) return;

      let currentSection = "";

      items.forEach(({ path }, index) => {
        const sectionId = path.split("/").pop();
        const section = document.getElementById(sectionId || "");

        if (section) {
          const sectionTop = section.getBoundingClientRect().top;

          if (
            sectionTop <= scrollOffset &&
            sectionTop > -section.offsetHeight / 2
          ) {
            currentSection = path;
          }

          if (
            window.innerHeight + window.scrollY >=
              document.body.offsetHeight - 10 &&
            index === items.length - 1
          ) {
            currentSection = path;
          }
        }
      });

      if (currentSection && currentSection !== activePath) {
        setActivePath(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [items, activePath, isScrolling]);

  return (
    <div>
      <div className="mb-2 flex flex-nowrap items-center justify-between gap-6 border-b border-b-gray-200 lg:items-end">
        <Menu
          items={items}
          handleMenuClick={handleMenuClick}
          activePath={activePath}
        />
        {/* <ProfileActions /> */}
      </div>
    </div>
  );
};

const ProfileMenu = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProfileMenuContent />
    </Suspense>
  );
};

export default ProfileMenu;
