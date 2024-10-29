// components/common/Modal.tsx
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import default_image from "../../../../public/assets/media/avatars/default-image.png";
import { useAppContext } from "@/app/context/AppContext";

interface User {
  id: string;
  name: string;
  email: string;
  image: string;
  status: string;
  statusColor: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  users: User[];
}

const SearchModal: React.FC<ModalProps> = ({ isOpen, onClose, users }) => {
  const [query, setQuery] = useState<string>("");
  const { profile } = useAppContext();

  const filteredUsers = users.filter(
    (user) =>
      user.id !== profile.id && // Exclude the current user's profile
      (user.name.toLowerCase().includes(query.toLowerCase()) ||
        user.email.toLowerCase().includes(query.toLowerCase())),
  );

  return (
    <div
      className={`fixed inset-0 flex w-full items-center justify-center bg-gray-800 bg-opacity-85 text-start transition-opacity duration-300`}
      style={{ zIndex: 10 }}
    >
      <div className='relative h-[400px] max-h-[400px] w-[90%] max-w-[550px] rounded-lg bg-white p-4 shadow-lg'>
        <div className='modal-header flex items-center justify-between border-b border-gray-200 px-5 py-4'>
          <i className='ki-filled ki-magnifier text-xl text-gray-700'></i>
          <input
            className='input ml-2.5 w-full border-none bg-transparent px-0 shadow-none'
            name='query'
            placeholder='Tap to start search'
            type='text'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            className='btn btn-sm btn-icon btn-light btn-clear shrink-0'
            onClick={onClose}
          >
            <i className='ki-filled ki-cross'></i>
          </button>
        </div>
        <div className='modal-body p-0 pb-5'>
          <div
            className='scrollable-y-auto'
            style={{ maxHeight: "300px", overflowY: "auto" }}
          >
            <div className='flex flex-col gap-2.5'>
              <div className='pb-1.5 pl-5 pt-2.5 text-start text-xs font-medium text-gray-600'>
                Users
              </div>
              <div className='menu menu-default flex-col p-0'>
                <div className='grid gap-1'>
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user, index) => (
                      <Link
                        href={`/profile/overview/${String(user.id)}`}
                        key={index}
                        className='menu-item'
                        onClick={onClose}
                      >
                        <div className='menu-link flex justify-between gap-2'>
                          <div className='flex items-center gap-2.5'>
                            <Image
                              alt='Profile Image'
                              className='size-9 shrink-0 rounded-full'
                              src={user.image || default_image}
                              width={100}
                              height={100}
                            />
                            <div className='flex flex-col'>
                              <span className='hover:text-primary-active mb-px text-sm font-semibold text-gray-900'>
                                {user.name}
                              </span>
                              <span className='text-2sm font-normal text-gray-500'>
                                {user.email}
                              </span>
                            </div>
                          </div>
                          {/* <div className="flex items-center gap-2.5">
                            <div className={`badge badge-outline badge-${user.statusColor}`}>
                              <span className={`badge-dot badge-${user.statusColor}`}></span>
                              {user.status}
                            </div>
                            <button className="btn btn-icon btn-light btn-clear btn-sm">
                              <i className="ki-filled ki-dots-vertical"></i>
                            </button>
                          </div> */}
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div className='text-center text-gray-500'>
                      No users found
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
