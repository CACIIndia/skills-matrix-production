// components/Menu.tsx
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";

// Define the type for the items prop
interface MenuItem {
  name: string;
  path: string;
}

// Define the props for the Menu component
interface MenuProps {
  items: MenuItem[]; // An array of menu items
}

// Update the Menu component to accept props
const Menu: FC<MenuProps> = ({ items = [] }) => {
  const pathname = usePathname();

  return (
    <div className='grid'>
      <div className='scrollable-x-auto static'>
        <div className='menu gap-3'>
          {items.map(({ name, path }) => (
            <div
              key={path}
              className={`${
                path === pathname ? "active" : ""
              } menu-item menu-item-active:border-b-primary menu-item-here:border-b-primary border-b-2 border-b-transparent`}
            >
              <Link href={path} className='menu-link gap-1.5 px-2 pb-2 lg:pb-4'>
                <span className='menu-title menu-item-active:text-primary menu-item-active:font-semibold menu-item-here:text-primary menu-item-here:font-semibold menu-item-show:text-primary menu-link-hover:text-primary text-nowrap text-sm font-medium text-gray-700'>
                  {name}
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;
