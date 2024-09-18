import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface User {
  id:string ,
  name: string;
  email: string;
  profilePic: string;
  status: string;
  statusColor: string;
}

interface DropdownProps {
  isOpen: boolean;
  onClose: () => void;
  users: User[];
  searchQuery: string;
}

const ProfileSearch: React.FC = () => {
  const [isDropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [users, setUsers] = useState<User[]>([]); // State to store fetched users
  const [searchQuery, setSearchQuery] = useState<string>(""); // State for search query
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);
  const closeDropdown = () => setDropdownOpen(false);

  // Handle clicks outside of the dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        closeDropdown();
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  // Fetch users from API on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users");
        const data = await response.json();
        setUsers(data.users); // Store the fetched users in state
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers(); // Call the fetch function
  }, []);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button onClick={toggleDropdown} className="btn btn-icon btn-icon-lg size-9 rounded-full hover:bg-primary-light hover:text-primary text-gray-500">
        <i className="ki-filled ki-magnifier"></i>
      </button>
      <Dropdown isOpen={isDropdownOpen} onClose={closeDropdown} users={users} searchQuery={searchQuery} />
    </div>
  );
};

export default ProfileSearch;

const Dropdown: React.FC<DropdownProps> = ({ isOpen, onClose, users, searchQuery }) => {
  const [query, setQuery] = useState<string>("");

  // Filter users based on search query (either name or email)
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(query.toLowerCase()) ||
      user.email.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div
      className={`fixed text-start inset-0 flex items-center justify-center transition-opacity duration-300 ${
        isOpen ? "z-50" : "opacity-0"
      }`}
      style={{ display: isOpen ? "flex" : "none", zIndex: 1000 }}
    >
      <div className="w-[90%] max-w-[550px] border border-gray-200 rounded-lg shadow-lg p-4 bg-white relative">
        <div className="modal-header py-4 px-5 flex items-center">
          <i className="ki-filled ki-magnifier text-gray-700 text-xl"></i>
          <input
            className="input px-0 border-none bg-transparent shadow-none ml-2.5 w-full"
            name="query"
            placeholder="Tap to start search"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)} // Update search query
          />
          <button className="btn btn-sm btn-icon btn-light btn-clear shrink-0" onClick={onClose}>
            <i className="ki-filled ki-cross"></i>
          </button>
        </div>
        <div className="modal-body p-0 pb-5">
          <div className="scrollable-y-auto" style={{ maxHeight: "300px", overflowY: "auto" }}>
            <div id="search_modal_mixed">
              <div className="flex flex-col gap-2.5">
                <div className="border-b border-b-gray-200"></div>
                <div>
                  <div className="text-xs text-gray-600 font-medium pt-2.5 pb-1.5 pl-5 text-start">
                    Users
                  </div>
                  <div className="menu menu-default p-0 flex-col">
                    <div className="grid gap-1">
                      {filteredUsers.length > 0 ? (
                        filteredUsers.map((user, index) => (
                          <Link href={`/public-profile/${String(user.id)}`} key={index} className="menu-item">
                            <div className="menu-link flex justify-between gap-2">
                              <div className="flex items-center gap-2.5">
                                <img alt="" className="rounded-full size-9 shrink-0" src={user.profilePic} />
                                <div className="flex flex-col">
                                  <a className="text-sm font-semibold text-gray-900 hover:text-primary-active mb-px" href="#">
                                    {user.name}
                                  </a>
                                  <span className="text-2sm font-normal text-gray-500">{user.email} connections</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-2.5">
                                <div className={`badge badge-pill badge-outline badge-${user.statusColor} gap-1.5`}>
                                  <span className={`badge badge-dot badge-${user.statusColor} size-1.5`}></span>
                                  {user.status}
                                </div>
                                <button className="btn btn-icon btn-light btn-clear btn-sm">
                                  <i className="ki-filled ki-dots-vertical"></i>
                                </button>
                              </div>
                            </div>
                          </Link>
                        ))
                      ) : (
                        <div className="text-center text-gray-500">No users found</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
