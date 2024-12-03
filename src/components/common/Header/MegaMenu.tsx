import Link from "next/link";
import { usePathname } from "next/navigation";
import { LINE_MANAGER_MENU_ITEMS, MENU_ITEMS } from "@/lib/constants/header";
import { useAppContext } from "@/app/context/AppContext";

type MegaMenuProps = {};

const MegaMenu = ({}: MegaMenuProps) => {
  const pathname = usePathname();
  const { profile } = useAppContext();
  const getCurrentBreadCrumbName = LINE_MANAGER_MENU_ITEMS.find(
    (item) => item.path === pathname,
  )?.name;

  return (
    <div
      className='gap-1.25 mb-2.5 flex items-center text-xs font-medium lg:mb-0 lg:text-sm'
      data-menu='true'
      id='megamenu'
    >
      {MENU_ITEMS.map(({ name, path, tab }) => (
        <div key={name} className='flex items-center'>
          <Link
            href={path}
            // className={`text-gray-600 ${
            //   pathname === path || pathname.startsWith(tab)
            //     ? "font-semibold text-primary"
            //     : ""
            // } hover:text-primary`}
          >
            {name}
          </Link>
        </div>
      ))}

      {getCurrentBreadCrumbName && (
        <div className='gap-1.25 mb-2.5 ml-2 flex items-center text-xs font-medium lg:mb-0 lg:text-sm'>
          <span className='text-gray-700'>Line Manager</span>
          <i className='ki-filled ki-right text-3xs text-gray-500'></i>
          <span className='text-gray-700'>{getCurrentBreadCrumbName}</span>
        </div>
      )}
    </div>
  );
};

export default MegaMenu;
