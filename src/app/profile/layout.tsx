"use client";
import React, { FC, useEffect, useState } from 'react';
import ProfileHeader from '../components/ProfileHeader';
import { useParams } from 'react-router-dom';
import Menu from '../components/Menu';
import ProfileActions from '../components/ProfileActions';
import { PROFILE_HEADER_ITEMS } from '@/constants/header';
import { ProfileProvider } from '@/context/profileContext';


const defaultData: UserDetails = {
  id: 0,
  name: "",
  email: "",
  image: "/default-avatar.png",
  role:"",
  additional_info: {
    discipline: "",
    specialism: "",
    employee_type: "",
    location: "",
    cost_centre: ""
  },
  general_info: {
    phone: "",
    status: "",
    startdate: "",
    current_project: "",
    sfia_level: "",
    reported_to: ""
  },
  skills: [],
  projects: {
    current_project: {
      project_name: "",
      start_date: "",
      role: "",
      description: "",
      code: "",
      members: []
    },
    previous_projects: [],
    employment_history: {
      company: "",
      joined_date: ""
    }
  }
};
interface ProfileLayoutProps {
  children: React.ReactNode;
}
interface AdditionalInfo {
  discipline: string;
  specialism: string;
  employee_type: string;
  location: string;
  cost_centre: string;
}
interface Skill {
  name: string;
  level: string;
}
interface Project {
  project_name: string;
  start_date: string;
  role: string;
  description: string;
  members: { image_url: string }[];
}
interface ProjectMember {
  name: string;
  image_url?: string; // Optional, as additional members may not have an image
  count?: number; // Optional, for cases where additional members are listed
  placeholder?: string; // Optional, for cases where additional members are indicated
}

interface CurrentProject {
  project_name: string;
  start_date: string;
  role: string;
  description: string;
  code: string;
  members: ProjectMember[];
}

interface PreviousProject {
  project_name: string;
  start_date: string;
  end_date: string;
  role: string;
  description: string;
  code: string;
  members: ProjectMember[];
}
interface UserDetails {
  id: number;
  name: string;
  email: string;
  image: string;
  role:string;
  additional_info: AdditionalInfo;
  general_info: {
    phone: string;
    status: string;
    startdate: string;
    current_project: string;
    sfia_level: string;
    reported_to: string;
  };
  skills: Skill[];
  projects: {
    current_project: CurrentProject;
    previous_projects: PreviousProject[];
    employment_history: {
      company: string;
      joined_date: string;
    };
  };
}
interface ProfileLayoutProps {
  children: React.ReactNode;
}


const ProfileLayout: FC<ProfileLayoutProps> = ({ children }) => {

  const [data, setData] = useState<UserDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch dynamically
  const params = useParams();
 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/userdetails/${1}`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        console.log(result, "response");
        setData(result.data);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
<div className='w-[100%]'>
  <ProfileProvider>
    <ProfileHeader
        name={data?.name || ""}
        image={data?.image || "/default-avatar.png"}
        email={data?.email || ""}
        additional_info={data?.additional_info}
        data={data || defaultData} // Use default value if data is null
      />

      {/* Profile Actions and Menu */}
      <div className='container-fixed'>
        <div className='dark:border-b-coal-100 mb-5 flex flex-nowrap items-center justify-between gap-6 border-b border-b-gray-200 lg:mb-10 lg:items-end'>
          <Menu items ={PROFILE_HEADER_ITEMS} />
          <ProfileActions />
        </div>
      </div>
       {children}
      </ProfileProvider>
 </div>

  );
};

export default ProfileLayout;
