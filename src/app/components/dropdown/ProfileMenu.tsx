import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface DropdownProps {
    isOpen: boolean;
    onClose: () => void;
  }

  const ProfileMenu: React.FC = () => {
    const [isDropdownOpen, setDropdownOpen] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
  
    const toggleDropdown = () => setDropdownOpen(prev => !prev);
    const closeDropdown = () => setDropdownOpen(false);
  
    // Handle clicks outside of the dropdown to close it
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          closeDropdown();
        }
      };
  
      if (isDropdownOpen) {
        document.addEventListener('mousedown', handleClickOutside);
      } else {
        document.removeEventListener('mousedown', handleClickOutside);
      }
  
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [isDropdownOpen]);
  
    return (
      <div className="relative inline-block" ref={dropdownRef}>
        <button
          onClick={toggleDropdown}
          className="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-300"
        >
           <Image
                alt="Profile"
                className="size-9 rounded-full border-2 border-success"
                src="/assets/media/avatars/profilepic.jpg"
                width={36}
                height={36}
              />
          <span className="sr-only">Profile Menu</span>
        </button>
  
        <Dropdown isOpen={isDropdownOpen} onClose={closeDropdown} />
      </div>
    );
  };
  
  export default ProfileMenu;
  
 

  const Dropdown: React.FC<DropdownProps> =({ isOpen, onClose }) => {
    return (
      <div
        className={`absolute right-0 mt-2 w-[250px] bg-white border border-gray-200 rounded-lg shadow-lg transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
        style={{ display: isOpen ? 'block' : 'none',zIndex:1000}}
      >
         <div className="bg-white menu-default " >
              <div className="flex items-center justify-between px-5 py-1.5 gap-1.5">
                <div className="flex items-center gap-2">
                  <Image
                    alt="Profile"
                    className="size-9 rounded-full border-2 border-success"
                    src="/assets/media/avatars/profilepic.jpg"
                    width={36}
                    height={36}
                  />
                  <div className="flex flex-col gap-1.5">
                    <span className="text-sm text-gray-800 font-semibold leading-none">
                      V A Magendran
                    </span>
                    <Link
                      className="text-xs text-gray-600 hover:text-primary font-medium leading-none"
                      href="/account/home/get-started"
                    >
                      vmagendran@caci.co.uk
                    </Link>
                  </div>
                </div>
                <span className="badge badge-xs badge-primary badge-outline">Pro</span>
              </div>
              <div className="menu-separator"></div>
              <div className="flex flex-col">
                <div className="menu-item">
                  <Link className="menu-link" href="/profile/overview">
                    <span className="menu-icon">
                      <i className="ki-filled ki-profile-circle"></i>
                    </span>
                    <span className="menu-title">My Profile</span>
                  </Link>
                </div>
                

    
              </div>

              <div className="flex flex-col">
                <div className="menu-item mb-0.5">
                  <div className="menu-link flex items-center gap-1.5">
                    <span className="menu-icon">
                      <i className="ki-filled ki-moon"></i>
                    </span>
                    <span className="menu-title">Dark Mode</span>
                    <label className="switch switch-sm">
                      <input
                      
                        name="check"
                        type="checkbox"
                        value="1"
                      />
                    </label>
                  </div>
                </div>
                <div className="menu-item px-4 py-1.5">
                  <Link className="btn btn-sm btn-light justify-center" href="/authentication/classic/sign-in">
                    Log out
                  </Link>
                </div>
              </div>
            </div>
      </div>
    );
  };