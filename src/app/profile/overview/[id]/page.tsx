"use client";
import { useEffect, useState } from "react";
import ProfileHeader from "@/app/components/ProfileHeader";
import ProfileActions from "@/app/components/ProfileActions";
import GeneralInfoCard from "@/app/components/GeneralInfoCard";
import AdditionalInfoCard from "@/app/components/AdditionalInfoCard";
import SkillCard from "@/app/components/SkillsCard";
import ProjectHistoryCard from "@/app/components/ProjectHistoryCard";
import { useParams } from "next/navigation";
import Link from "next/link";
const defaultData: UserDetails = {
  id: 0,
  name: "",
  email: "",
  image: "/default-avatar.png",
  role: "",
  additional_info: {
    discipline: "",
    specialism: "",
    employee_type: "",
    location: "",
    cost_centre: "",
  },
  general_info: {
    phone: "",
    status: "",
    startdate: "",
    current_project: "",
    sfia_level: "",
    reported_to: "",
  },
  skills: [],
  projects: {
    current_project: {
      project_name: "",
      start_date: "",
      role: "",
      description: "",
      code: "",
      members: [],
    },
    previous_projects: [],
    employment_history: {
      company: "",
      joined_date: "",
    },
  },
};

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
  role: string;
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
interface GeneralInfo {
  email: string;
  phone: string;
  status: string;
  startdate: string;
  current_project: string;
  sfia_level: string;
  reported_to: string;
}
const initialGeneralInfo: GeneralInfo = {
  email: '',
  phone: '',
  status: '',
  startdate: '',
  current_project: '',
  sfia_level: '',
  reported_to: ''
};


const SearchProfile = () => {
  const [data, setData] = useState<UserDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [general_info, setGeneralInfo] = useState<GeneralInfo>(initialGeneralInfo);
  const [skills,setSkills] = useState<Skill>();

  // Fetch dynamically
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/userdetails/${id}`);

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        console.log(result, "response");
        let general_info = {
          email: result.data.email || "",
          phone: result.data.phone || "",
          status: result.data.status || "",
          startdate: result.data.startdate || "",
          current_project: result.data.current_project || "",
          sfia_level: result.data.sfia_level || "",
          reported_to: result.data.reported_to || "",
        };
        setGeneralInfo(general_info);
        setSkills(result.data.skills);
        setData(result.data);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className='w-[100%]'>
      {/* Profile Header */}
      <ProfileHeader useprofile={false} profile_header_data={data || {}}/>

      {/* Profile Actions and Menu */}
      <div className='container-fixed'>
        <div className='dark:border-b-coal-100 mb-5 flex flex-nowrap items-center justify-between gap-6 border-b border-b-gray-200 lg:mb-10 lg:items-end'>
          <div className='grid'>
            <div className='scrollable-x-auto static'>
              <div className='menu gap-3'>
                <div
                  key={""}
                  className={`active menu-item menu-item-active:border-b-primary menu-item-here:border-b-primary border-b-2 border-b-transparent`}
                >
                  <Link
                    href={""}
                    className='menu-link gap-1.5 px-2 pb-2 lg:pb-4'
                  >
                    <span className='menu-title menu-item-active:text-primary menu-item-active:font-semibold menu-item-here:text-primary menu-item-here:font-semibold menu-item-show:text-primary menu-link-hover:text-primary text-nowrap text-sm font-medium text-gray-700'>
                      {"Overview"}
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <ProfileActions />
        </div>
      </div>

      {/* Part 3: Profile Details */}
      <div className='container mx-auto p-4'>
        <div className='lg:gap-7.5 grid grid-cols-1 gap-5 lg:grid-cols-3'>
          <div className='col-span-1 grid gap-5'>
            {/* General Info */}
            <GeneralInfoCard data={general_info} />

            {/* Additional Info */}
            <AdditionalInfoCard additional_info={data?.additional_info ?? null} />
          </div>

          <div className='col-span-2 grid grid-cols-1 gap-5'>
          <SkillCard skills={skills ?? []} />
            {/* Project History */}
            <ProjectHistoryCard
              current_project={data?.projects?.current_project ?? null}
              previous_projects={data?.projects?.previous_projects || []}
              employment_history={data?.projects?.employment_history ?? { company: 'Unknown', joined_date: 'N/A' }}

            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchProfile;
