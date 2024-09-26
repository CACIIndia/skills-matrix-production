"use client";
// src/components/Sidebar.tsx

import React, {useEffect, useState} from "react";
import Link from "next/link";
import {usePathname} from "next/navigation";

interface SidebarProps {
	isExpanded: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({isExpanded}) => {
	const pathname = usePathname();

	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	return (
		<div
			style={{width: "90%"}}
			className="mx-auto   lg:flex flex-col shrink-0  justify-center bg-light border-r border-r-gray-200 "
		>
			{/* logo */}
			<div className="p-6  ">
				<Link href="/">
					<svg
						className=""
						version="1.0"
						id="CACI_Logo"
						width="100"
						height="40"
						viewBox="0 0 140 60"
						overflow="visible"
						enableBackground="new 0 0 100 65"
					>
						<path
							id="CACI"
							fill="#000000"
							d="M 40.248,5.022 L 40.23,18.93 C 40.175,19.47 39.756,19.534 39.686,18.963 C 39.154,11.234 30.078,4.041 21.566,7.124 C 11.412,10.806 10.015,21.995 11.118,30.63 C 11.554,34.053 12.491,37.168 14.856,40.089 C 17.233,43.028 20.493,44.991 24.448,45.332 C 30.88,45.887 36.618,42.927 40.181,37.931 C 40.274,37.797 40.574,38.001 40.532,38.086 C 36.564,47.025 23.952,50.96 14.599,45.546 C 2.368,38.462 0.345,23.772 7.803,13.062 C 13.937,4.248 26.57,1.863 36.416,7.096 C 37.901,7.885 38.982,6.226 39.725,5.019 L 40.248,5.022 z M 121.169,8.103 C 121.169,5.257 125.539,5.649 126.098,5.547 L 126.098,4.615 L 109.175,4.615 L 109.175,5.547 C 109.738,5.649 114.331,5.311 114.331,8.103 L 114.331,43.823 C 114.331,45.885 110.184,46.279 109.175,46.255 L 109.175,47.184 L 126.098,47.184 L 126.098,46.255 C 124.869,46.279 121.169,45.885 121.169,43.823 L 121.169,8.103 z M 107.646,5.019 C 106.901,6.226 105.823,7.885 104.338,7.096 C 94.491,1.864 81.859,4.248 75.724,13.062 C 68.265,23.773 70.286,38.462 82.521,45.546 C 91.872,50.96 104.483,47.025 108.455,38.086 C 108.496,38.001 108.194,37.797 108.101,37.931 C 104.538,42.927 98.8,45.887 92.369,45.332 C 88.416,44.991 85.157,43.028 82.777,40.089 C 80.414,37.168 79.477,34.053 79.038,30.63 C 77.937,21.995 79.335,10.806 89.49,7.124 C 98.001,4.041 107.077,11.233 107.606,18.963 C 107.676,19.533 108.095,19.47 108.152,18.93 L 108.171,5.023 L 107.646,5.019 z M 62.057,30.796 L 55.63,16.295 L 49.587,30.796 L 62.057,30.796 z M 74.881,44.596 C 75.777,46.5 77.794,46.529 78.746,46.529 L 78.746,47.202 L 63.224,47.209 L 63.224,46.558 C 64.939,46.561 68.716,46.221 67.764,43.87 L 63.28,33.556 L 63.268,33.529 L 48.449,33.529 L 48.436,33.565 L 44.058,43.307 C 43.179,45.848 46.04,46.192 48.428,46.557 L 48.428,47.205 L 37.164,47.201 L 37.164,46.556 C 38.52,46.106 39.298,45.668 39.908,44.539 L 57.394,4.843 L 74.881,44.596"
						/>
						<rect
							id="Red_line"
							x="5.9070001"
							y="53.837002"
							className="overflow-hidden"
							width="120.563"
							height="4.0799999"
							fill="#ed1b2d"
						/>
					</svg>
				</Link>
			</div>

			{/* Menus  like dashboard,profile */}
			{/* <div
        className="sidebar-content flex grow shrink-0 py-10 pr-2 "
        id="sidebar_content"
      >
          <div className="flex flex-col gap-4">
            {menuItems.map(({name,path,icon,tab})=>{
              return <div key={name} className=" ">
              
              <Link
                href={path}
                className="flex items-center space-x-3   pr-20 py-1  "
              >
                <span className="w-[20px]  flex items-center">
                  <i
                    className={`ki-filled ${icon} text-lg ${pathname === path || pathname.startsWith(tab)  ? 'text-primary' : 'text-white'}`}
                 
                  ></i>
                </span>
                <span className={`menu-title text-white text-sm font-semibold  ${pathname === path || pathname.startsWith(tab)  ? 'text-primary' : 'text-white'} `}>
                  {name}
                </span>
              </Link>
           
          </div>
            })}
            

           
          </div>
       
      </div> */}

			<div
				className="sidebar-content flex grow shrink-0 py-5 pr-1 "
				id="sidebar_content"
			>
				<div className="scrollable-y-hover grow shrink-0 flex ">
					<div className="menu flex flex-col grow gap-2 ">
						<div className="menu-item ">
							<div className="menu-link flex items-center grow cursor-pointer border border-transparent gap-[10px] pl-[10px] pr-[10px] py-[6px]">
								<span
									className={`menu-icon items-start ${
										pathname === "/dashboard" ? "text-primary" : "text-gray-700"
									} dark:text-gray-400 w-[20px] `}
								>
									<i className="ki-filled ki-element-11 text-lg"></i>
								</span>
								<span
									className={`menu-title text-sm font-semibold ${
										pathname === "/dashboard" ? "text-primary" : "text-gray-700"
									} menu-item-active:text-primary menu-link-hover:!text-primary `}
								>
									<Link href={"/"}>Dashboards</Link>
								</span>
							</div>
						</div>

						<div className="menu-item">
							<div className="menu-link flex items-center grow cursor-pointer border border-transparent gap-[10px] pl-[10px] pr-[10px] py-[6px]">
								<span
									className={`menu-icon items-start ${
										pathname.startsWith("/public-profile")
											? "text-primary"
											: "text-gray-700"
									} dark:text-gray-400 w-[20px]`}
								>
									<i className="ki-filled ki-profile-circle text-lg"></i>
								</span>
								<span
									className={`menu-title text-sm font-semibold ${
										pathname.startsWith("/public-profile")
											? "text-primary"
											: "text-gray-700"
									} menu-item-active:text-primary menu-link-hover:!text-primary `}
								>
									<Link href={"/public-profile"}> Public Profile</Link>
								</span>
							</div>
						</div>
						<div className="menu-item">
							<div className="menu-link flex items-center grow cursor-pointer border border-transparent gap-[10px] pl-[10px] pr-[10px] py-[6px]">
								<span
									className={`menu-icon items-start ${
										pathname === "/my-accounts/overview" ||
										pathname.startsWith("/my-accounts")
											? "text-primary"
											: "text-gray-700"
									} dark:text-gray-400 w-[20px]`}
								>
									<i className="ki-filled ki-setting-2 text-lg"></i>
								</span>
								<span
									className={`menu-title text-sm font-semibold ${
										pathname === "/my-accounts/overview" ||
										pathname.startsWith("/my-accounts")
											? "text-primary"
											: "text-gray-700"
									} menu-item-active:text-primary menu-link-hover:!text-primary `}
								>
									<Link href={"/my-accounts/overview"}> My Account</Link>
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* SideBar Footer */}
			{/* <div className="sidebar-footer flex flex-col px-3 py-4 ">
        <button>Toggle Dark Mode</button>
      </div> */}
		</div>
	);
};

export default Sidebar;
