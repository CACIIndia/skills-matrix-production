import Image from "next/image";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react"; // Import useSession hook
import default_image from "../../../../public/assets/media/avatars/default-image.png";
import Button from "../Button";
import { useAppContext } from "@/app/context/AppContext";

type HeaderDropdownProps = {
  isOpen: boolean;
  onClose: () => void;
};

const HeaderDropdown = ({ isOpen, onClose }: HeaderDropdownProps) => {
  const { profile } = useAppContext();

  return (
    <div
      className={`absolute right-0 mt-2 w-[250px] rounded-lg border border-gray-200 bg-white shadow-lg transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
      style={{ display: isOpen ? "block" : "none", zIndex: 1000 }}
    >
      <div className='menu-default bg-white'>
        <div className='flex items-center justify-between gap-1.5 px-5 py-1.5'>
          <div className='flex items-center gap-2'>
            <img
              alt='Profile'
              className='profile_image border-success size-9 rounded-full border-2'
              src={profile?.image || ""} // Use user image or default
              style={{ width: 36, height: 36 }}
            />

            <div className='flex flex-col gap-1.5'>
              <span className='text-sm font-semibold leading-none text-gray-800'>
                {profile?.name || "User Name"} {/* Display user name */}
              </span>
              <Link
                className='text-xs font-medium leading-none text-gray-600 hover:text-primary'
                href='/account/home/get-started'
              >
                {profile?.email || ""} {/* Display user email */}
              </Link>
            </div>
          </div>
          <span className='badge badge-xs badge-primary badge-outline'>
            Pro
          </span>
        </div>
        <div className='menu-separator'></div>
        <div className='flex flex-col'>
          <div className='menu-item'>
            <Link className='menu-link' href='/profile/overview'>
              <span className='menu-icon'>
                <i className='ki-filled ki-profile-circle'></i>
              </span>
              <span className='menu-title'>My Profile</span>
            </Link>
          </div>
        </div>

        <div className='flex flex-col'>
          <div className='menu-item px-4 py-1.5'>
            <button
              className='btn btn-sm btn-light justify-center'
              onClick={() => {
                signOut();
              }} // Close dropdown on logout
            >
              Log out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderDropdown;
