import Link from "next/link";
import { usePathname } from "next/navigation";
import { MENU_ITEMS } from "@/lib/constants/header";
import LineManager from "./LineManager";
import { useAppContext } from "@/app/context/AppContext";

type MegaMenuProps = {};

const MegaMenu = ({}: MegaMenuProps) => {
  const pathname = usePathname();
  const { profile } = useAppContext();

  return (
    <div
      className="flex  items-center gap-1.25 text-xs lg:text-sm font-medium mb-2.5 lg:mb-0"
      data-menu="true"
      id="megamenu"
    >
      {MENU_ITEMS.map(({ name, path, tab }) => (
        <div key={name} className="flex items-center">
          <Link
            href={path}
            className={`text-gray-600 ${
              pathname === path || pathname.startsWith(tab)
                ? "text-primary font-semibold"
                : ""
            } hover:text-primary`}
          >
            {name}
          </Link>
        </div>
      ))}

   
      <div
        className="flex  items-center gap-1.25 text-xs lg:text-sm font-medium mb-2.5 lg:mb-0"
       
      >
        <span className="text-gray-600">Line Manager</span>
        <i className="ki-filled ki-right text-gray-500 text-3xs"></i>
        <span className="text-gray-700">Training</span>
      </div>

    
    </div>
  );
};

export default MegaMenu;
