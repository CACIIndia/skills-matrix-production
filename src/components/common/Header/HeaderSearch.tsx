import { useAppContext } from "@/app/context/AppContext";
import useGetUsers from "@/lib/hooks/useGetUsers";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import default_image from "../../../../public/assets/media/avatars/default-image.png";
import { usePathname } from "next/navigation";

const HeaderSearch: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const {viewedProfile} = useAppContext();
  const [profileClicked, setProfileClicked] = useState(false);
  const { data: users, isLoading } = useGetUsers();
  const { profile } = useAppContext();
  const searchRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  


  useEffect(() => {
    // when path name changes from profile/overview/id then reset search query
   
    const isProfileOverviewPage = /^\/profile\/overview\/[^/]+$/.test(pathname);
    if (!isProfileOverviewPage) {
      setSearchQuery("");
    }
  }, [pathname]);

  useEffect(()=>{
    // when user refreshes the page and viewed profile is not null
    // then set search query to viewed profile name
  
    const isProfileOverviewPage = /^\/profile\/overview\/[^/]+$/.test(pathname);
      if(viewedProfile && isProfileOverviewPage)
      setSearchQuery(viewedProfile.name);
      setProfileClicked(true);
  },[viewedProfile])

 
  

  const filteredUsers = searchQuery
    ? users?.filter(
        (user: { id: string; name: string; email: string; image?: string }) =>
          user.id !== profile?.id &&
          (user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    : Array.isArray(users)
      ? [...users]
      : [];

  const profileClickHandler = (user: string) => {
    setProfileClicked(true);
    setSearchQuery(user);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef?.current &&
        !searchRef?.current.contains(event?.target as Node)
      ) {
        setProfileClicked(true);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className='relative w-full' ref={searchRef}>
      <div className='flex h-10 w-full items-center gap-2 rounded-lg border border-gray-200 px-2'>
        {isLoading ? (
          <div className='h-6 w-6 animate-pulse rounded-full bg-gray-300'></div>
        ) : (
          <i className='ki-filled ki-magnifier'></i>
        )}
        {isLoading ? (
          <div className='h-8 w-full animate-pulse rounded bg-gray-300'></div>
        ) : (
          <input
            type="text"
            placeholder="Quick search by name"
            className="h-full w-full border-none outline-none"
            value={searchQuery}
            onClick={() => setProfileClicked(false)}
            onChange={(e)=>{
              setSearchQuery(e.target.value);
              if(profileClicked){
                setProfileClicked(false);
              }
            }}
          />
        )}
      </div>

      {(searchQuery?.length >= 2 && !profileClicked) && (
        <div
          className={`absolute left-0 top-full z-40 mt-2 w-full overflow-y-auto rounded-b-lg bg-white shadow-lg transition-all duration-300 ease-in-out ${searchQuery ? "h-[300px] max-h-min overflow-y-auto border border-gray-200 duration-300" : "h-0 duration-100"}`}
        >
          {filteredUsers?.length > 0 ? (
            filteredUsers?.map(
              (user: {
                id: string;
                name: string;
                email: string;
                image?: string;
              }) => (
                <Link
                  href={`/profile/overview/${String(user.id)}`}
                  key={user.id}
                  className='menu-item p-2'
                  onClick={() => profileClickHandler(user?.name)}
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
                  </div>
                </Link>
              ),
            )
          ) : (
            <div className='flex max-h-min items-center justify-center p-2 text-gray-500'>
              No users found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HeaderSearch;
