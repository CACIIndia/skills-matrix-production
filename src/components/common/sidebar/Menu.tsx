import { useEffect, useState } from "react";
import Link from "next/link";
import MenuAccordion from "./Menuaccordion";
import { useAppContext } from "@/app/context/AppContext";
import { usePathname, useRouter } from "next/navigation";

function Menu({ submenu, link, name, isExpanded }: any) {
  const router = useRouter();
  const pathname = usePathname();
  const { selectedItems, toggleSelectedItem, categorySkills } = useAppContext();

  const handleItemClick = (skill: any) => {
    toggleSelectedItem(skill);
    // console.log(skill);
    router.push(`/search-skills`);
  };

  // State to manage submenu visibility
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);

  // Toggle submenu visibility
  const toggleSubmenu = () => {
    setIsSubmenuOpen(!isSubmenuOpen);
  };

  useEffect(() => {
    if (pathname === "/search-skills") {
      setIsSubmenuOpen(true);
    } else {
      setIsSubmenuOpen(false);
    }
  }, [pathname]);

  if (!submenu) {
    return (
      <div className='menu-item'>
        <Link href={link}>
          <div className='h-[42px] cursor-pointer pl-4 hover:bg-gray-100'>
            <div className='flex h-[100%] items-center gap-x-2'>
              <span className='menu-icon items-start text-gray-500 dark:text-gray-400'>
                <i className='ki-filled ki-profile-circle text-lg'></i>
              </span>
              {isExpanded && (
                <span className='menu-title menu-item-active:text-primary menu-link-hover:!text-primary text-nowrap text-sm font-semibold text-gray-700'>
                  {name}
                </span>
              )}
            </div>
          </div>
        </Link>
      </div>
    );
  }

  return (
    <div className='menu-item'>
      <div
        onClick={toggleSubmenu}
        className='h-[42px] cursor-pointer pl-4 pr-1 hover:bg-gray-100'
      >
        <div className='flex h-[100%] items-center gap-x-2'>
          <span className='menu-icon items-start text-gray-500 dark:text-gray-400'>
            <i className='ki-filled ki-profile-circle text-lg'></i>
          </span>
          {isExpanded && (
            <span className='menu-title menu-item-active:text-primary menu-link-hover:!text-primary text-nowrap text-sm font-semibold text-gray-700'>
              {name}
            </span>
          )}

          {isExpanded && (
            <span className='menu-arrow w-[20px] shrink-0 cursor-pointer text-gray-400'>
              {isSubmenuOpen ? (
                <i className='ki-filled ki-minus text-2xs text-gray-700'></i>
              ) : (
                <i className='ki-filled ki-plus text-2xs text-gray-700'></i>
              )}
            </span>
          )}
        </div>
      </div>

      {isSubmenuOpen && (
        <MenuAccordion
          handleItemClick={handleItemClick}
          data={categorySkills || []}
        />
      )}
    </div>
  );
}

export default Menu;
