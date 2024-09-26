import Link from "next/link";
import { usePathname } from "next/navigation";

import { MENU_ITEMS } from "@/lib/constants/header";

type MegaMenuProps = {};

const MegaMenu = ({}: MegaMenuProps) => {
  const pathname = usePathname();

  return (
    <div
      className='menu lg:gap-7.5 flex-col gap-5 lg:flex-row'
      data-menu='true'
      id='megamenu'
    >
      {MENU_ITEMS.map(({ name, path, tab }) => {
        return (
          <div key={name}>
            <Link
              href={path}
              className={
                "menu-link menu-item-hover:text-primary menu-item-active:text-gray-900 menu-item-active:font-semibold text-nowrap text-sm font-medium text-gray-700"
              }
            >
              <span
                className={`menu-title text-nowrap ${
                  pathname == path || pathname.startsWith(tab)
                    ? "text-primary"
                    : ""
                } hover:text-primary`}
              >
                {name}
              </span>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default MegaMenu;
