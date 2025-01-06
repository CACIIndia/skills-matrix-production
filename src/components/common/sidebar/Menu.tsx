import { useEffect, useState } from "react";
import Link from "next/link";
import MenuAccordion from "./Menuaccordion";
import { useAppContext } from "@/app/context/AppContext";
import { usePathname, useRouter } from "next/navigation";


function Menu({ submenu, link, name }: any) {
    const router = useRouter();
    const pathname = usePathname();
    const { selectedItems, toggleSelectedItem,categoryskills } = useAppContext();

  

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
    if (pathname === '/search-skills') {
      setIsSubmenuOpen(true);
    } else {
     // setIsSubmenuOpen(false);
    }
  }, [pathname])

  if (!submenu) {
    return (
      <div className="menu-item">
        <div className="menu-link flex grow cursor-pointer items-center gap-[10px] border border-transparent py-[6px] pl-[10px] pr-[10px]">
          <span className="menu-icon w-[20px] items-start text-gray-500 dark:text-gray-400">
            <i className="ki-filled ki-profile-circle text-lg"></i>
          </span>

          <Link
            className="menu-title menu-item-active:text-primary menu-link-hover:!text-primary text-sm font-semibold text-gray-700"
            href={link}
          >
            {name}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="menu-item" >
        <div onClick={toggleSubmenu} className="menu-link flex grow cursor-pointer items-center gap-[10px] border border-transparent py-[6px] pl-[10px] pr-[10px]">
          <span className="menu-icon w-[20px] items-start text-gray-500 dark:text-gray-400">
            <i className="ki-filled ki-profile-circle text-lg"></i>
          </span>

          <span
            className="menu-title menu-item-active:text-primary menu-link-hover:!text-primary text-sm font-semibold text-gray-700"
           
          >
            {name}
          </span>

         
          <span
            className="menu-arrow w-[20px] shrink-0 text-gray-400 cursor-pointer"
            
          >
            {isSubmenuOpen ? (
              <i className="ki-filled ki-minus text-2xs"></i>
            ) : (
              <i className="ki-filled ki-plus text-2xs"></i>
            )}
          </span>
        </div>

       
        {isSubmenuOpen && (
          <MenuAccordion
          handleItemClick={handleItemClick}
            data={
              categoryskills ||[]}
          />
        )}
      </div>
    </div>
  );
}

export default Menu;

