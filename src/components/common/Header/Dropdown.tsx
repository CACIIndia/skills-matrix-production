import Image from "next/image";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react"; // Import useSession hook
import default_image from "../../../../public/assets/media/avatars/default-image.png";
import { useAppContext } from "@/app/context/AppContext";
import { useState } from "react";
import toast from "react-hot-toast";
import { useUpdateMicrosoftProfile } from "@/lib/hooks/useUpdateMicroSoftProfile";
import { FiRefreshCcw } from "react-icons/fi";

type HeaderDropdownProps = {
  isOpen: boolean;
  onClose: () => void;
};

const HeaderDropdown = ({ isOpen, onClose }: HeaderDropdownProps) => {
  const { profile } = useAppContext();
  const { data: session } = useSession();
  const [toastId, setToastId] = useState("");
  const { setProfile } = useAppContext();

  const { mutate, mutateAsync, isError, error } = useUpdateMicrosoftProfile(
    (error) => {
      toast.error(error.message, { id: toastId });
    },
  );
  if (!session) {
    return null;
  }

  const handleAzureConnect = async () => {
    const toastId = toast.loading("Connecting To Azure, Please Wait...");

    setToastId(toastId);

    const response = await mutateAsync({
      accessToken: session.azure_access_token || "",
      user: profile,
    });
    setProfile(response);

    toast.success("Updated Successfully", { id: toastId });
  };

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
            <Image
              alt='Profile'
              className='profile_image border-success size-9 rounded-full border-2'
              src={profile?.image || default_image}
              width={36}
              height={36}
            />
            <div className='flex flex-col gap-1.5'>
              <span className='text-sm font-semibold leading-none text-gray-800'>
                {profile?.name || "User Name"}
              </span>
              <Link
                className='text-xs font-medium leading-none text-gray-600 hover:text-primary'
                href='/account/home/get-started'
              >
                {profile?.email || ""}
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
          <div className='menu-item'>
            <Link
              className='menu-link hover:text-primary'
              href={"#"}
              onClick={handleAzureConnect}
            >
              <span className='menu-icon'>
                <FiRefreshCcw className='menu-custom-icon' />
              </span>
              <span className='menu-title'>Sync Azure AD</span>
            </Link>
          </div>
          {profile?.isLineManager && (
            <div className='menu-item'>
              <Link
                className='menu-link hover:text-primary'
                href='/line-manager/training'
              >
                <span className='menu-icon'>
                  <i className='ki-filled ki-setting-2 text-lg'></i>
                </span>
                <span className='menu-title'>Line Manager</span>
              </Link>
            </div>
          )}
          <div className='menu-separator'></div>
          <div className='menu-item mb-0.5'>
            <div className='menu-link'>
              <span className='menu-icon'>
                <i className='ki-filled ki-moon'></i>
              </span>
              <span className='menu-title'>Dark Mode</span>
              <label className='switch switch-sm'>
                <input
                  data-theme-state='dark'
                  data-theme-toggle='true'
                  name='check'
                  type='checkbox'
                  value='1'
                />
              </label>
            </div>
          </div>
        </div>
        <div className='flex flex-col'>
          <div className='menu-item px-4 py-1.5'>
            <button
              className='btn btn-sm btn-light justify-center'
              onClick={() => {
                signOut();
                onClose();
              }}
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
