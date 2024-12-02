import Menu from "@/components/common/Menu";
import { LINE_MANAGER_MENU_ITEMS } from "@/lib/constants/header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex flex-nowrap items-center lg:items-end justify-between border-b border-b-gray-200 dark:border-b-coal-100 gap-6 mb-5 lg:mb-10">
          <div className="grid container-fixed">
            <div className="scrollable-x-auto">
              <Menu items={LINE_MANAGER_MENU_ITEMS} />
            </div>
          </div>
        </div>
      {children}
    </>
  );
}
