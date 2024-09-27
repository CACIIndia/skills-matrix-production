import React, { createContext, useContext, useState, useEffect } from 'react';
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
    
      phone: string;
      status: string;
      startdate: string;
      current_project: string;
      sfia_level: string;
      reported_to: string;
    
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
interface ProfileContextType {
  data: UserDetails | null;
  loading: boolean;
  error: string | null;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<UserDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/userdetails/${1}`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        setData(result.data);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <ProfileContext.Provider value={{ data, loading, error }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
};
