// components/Menu.tsx

import { FC } from "react";

const Menu: FC = () => {
  return (
   
          <div className="grid" style={{ zIndex: -10 }}>
            <div className="scrollable-x-auto">
              <div className="menu gap-3" data-menu="true">
                <div
                  className="menu-item border-b-2 border-b-transparent menu-item-active:border-b-primary menu-item-here:border-b-primary here"
                  data-menu-item-placement="bottom-start"
                  data-menu-item-toggle="dropdown"
                  data-menu-item-trigger="click"
                >
                  <div
                    className="menu-link gap-1.5 pb-2 lg:pb-4 px-2"
                    tabIndex={0}
                  >
                    <span className="menu-title text-nowrap font-medium text-sm text-gray-700 menu-item-active:text-primary menu-item-active:font-semibold menu-item-here:text-primary menu-item-here:font-semibold menu-item-show:text-primary menu-link-hover:text-primary" >
                      Overview
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        
       
  );
};

export default Menu;
