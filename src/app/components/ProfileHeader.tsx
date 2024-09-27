// components/ProfileHeader.tsx

import { useProfile } from "@/context/profileContext";
import Image from "next/image";

const ProfileHeader = ({useprofile=true, profile_header_data ={}}) => {

  let user_data;  
  let loading_value = false;
  if(useprofile){
    let { data, loading, error } =  useProfile();
    user_data =data; 
    loading_value = loading;
  }
  else{
    user_data = profile_header_data;
  }
 
 

  return (
    <div className="bg-center bg-cover bg-no-repeat hero-bg">
      <div className="container-fixed">
        <div className="flex flex-col items-center gap-2 lg:gap-3.5 py-4 lg:pt-5 lg:pb-10">
          <Image
            className="rounded-full border-3 border-success size-[100px] shrink-0"
            src={user_data?.image || ""}
            alt={user_data?.name || ""}
            width={100}
            height={100}
          />
          <div className="flex items-center gap-1.5">
            <div className="text-lg leading-5 font-semibold text-gray-900">
              {user_data?.name}
            </div>
            <svg
              className="text-primary"
              fill="none"
              height="16"
              width="15"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* SVG Path */}
            </svg>
          </div>
          <div className="flex flex-wrap justify-center gap-1 lg:gap-4.5 text-sm">
            <div className="flex gap-1.25 items-center">
              <i style={{zIndex:-10}} className="ki-filled ki-geolocation text-gray-500 text-sm"></i>
              <span className="text-gray-600">{user_data?.role}</span>
            </div>
            <div className="flex gap-1.25 items-center">
              <i style={{zIndex:-10}}  className="ki-filled ki-geolocation text-gray-500 text-sm"></i>
              <span className="text-gray-600">{user_data?.additional_info.location}</span>
            </div>
            <div className="flex gap-1.25 items-center">
              <i style={{zIndex:-10}}  className="ki-filled ki-sms text-gray-500 text-sm"></i>
              <a className="text-gray-600 hover:text-primary" href={`mailto:${user_data?.email}`}>
                {user_data?.email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
