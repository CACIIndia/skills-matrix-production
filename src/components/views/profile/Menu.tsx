"use client";
import { useEffect, useState, Suspense } from "react";
import Menu from "@/components/common/Menu";
import { PROFILE_MENU_ITEMS } from "@/lib/constants/header";
import { useRouter, useSearchParams } from "next/navigation";

const ProfileMenuContent = () => {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");
  const items = PROFILE_MENU_ITEMS;
  const [activePath, setActivePath] = useState(items[0]?.path || "");
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollOffset = 460;
  const router = useRouter();

  useEffect(() => {
    if (tab) {
      const activeItem = items.find(
        (item) => item.name.toLowerCase() === tab.toLowerCase(),
      );

      if (activeItem) {
        setActivePath(activeItem.path);

        setTimeout(() => {
          const sectionId = activeItem.path.split("/").pop();
          const section = document.getElementById(sectionId || "");

          if (section) {
            const sectionTop =
              section.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
              top: sectionTop - scrollOffset,
              behavior: "smooth",
            });
          }
        }, 500);
      }
    }
  }, [tab]);

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

      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.has('section')) {
        router.push(window.location.origin + window.location.pathname)
      }
    }

    setTimeout(() => {
      setIsScrolling(false);
    }, 800);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sectionFromUrl = urlParams.get("section");
 
    if (sectionFromUrl) {
      const matchedItem = items.find(({ path }) => path.split("/").pop() === sectionFromUrl);
      if (matchedItem) {
        handleMenuClick(matchedItem.path);
      }
    }
    
    const handleScroll = () => {
      if (isScrolling) return;

      let currentSection = activePath;
      let foundSection = false;

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
            foundSection = true;
          }

          if (
            window.innerHeight + window.scrollY >=
              document.body.offsetHeight - 10 &&
            index === items.length - 1
          ) {
            currentSection = path;
            foundSection = true;
          }
        }
      });
      if (foundSection && currentSection !== activePath && !tab) {
        setActivePath(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [items, activePath, isScrolling]);

  return (
    <div className=" w-[100%]">
      <div className='w-[100%] flex flex-nowrap items-center justify-between gap-6 border-b border-b-gray-200 lg:items-end'>
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
    <Suspense fallback={<></>}>
      <ProfileMenuContent />
    </Suspense>
  );
};

export default ProfileMenu;
