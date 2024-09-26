"use client";
import { useEffect, useState } from "react";
import ProfileHeader from "@/app/components/ProfileHeader";
import ProfileActions from "@/app/components/ProfileActions";
import Menu from "../../components/Menu";
import GeneralInfoCard from "../../components/GeneralInfoCard";
import AdditionalInfoCard from "../../components/AdditionalInfoCard";
import SkillCard from "@/app/components/SkillsCard";
import ProjectHistoryCard from "../../components/ProjectHistoryCard";
import { useParams } from "next/navigation";
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


const ProfileOverview = () => {
  const [data, setData] = useState<UserDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
      
     

      {/* Part 3: Profile Details */}
      <div className='container mx-auto p-4'>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-7.5">
          <div className='col-span-1 grid gap-5'>
            {/* General Info */}
            <GeneralInfoCard data={data || defaultData} />

            {/* Additional Info */}
            <AdditionalInfoCard additional_info={data?.additional_info} />
          </div>

          <div className='col-span-2 grid gap-5 grid-cols-1 '>
          
            <SkillCard skills={data?.skills || []} />  
            
          
            {/* Project History */}
            <ProjectHistoryCard
              current_project={data?.projects?.current_project}
              previous_projects={data?.projects?.previous_projects || []}
              employment_history={data?.projects?.employment_history}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileOverview;
