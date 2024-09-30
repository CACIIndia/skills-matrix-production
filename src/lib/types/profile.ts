export type AdditionalInfo = {
  discipline: string;
  specialism: string;
  employee_type: string;
  location: string;
  cost_centre: string;
};

export type ProjectMember = {
  name: string;
  image_url?: string;
  count?: number;
  placeholder?: string;
};

export type CurrentProject = {
  project_name: string;
  start_date: string;
  role: string;
  description: string;
  code: string;
  members: ProjectMember[];
};

export type PreviousProject = {
  project_name: string;
  start_date: string;
  end_date: string;
  role: string;
  description: string;
  code: string;
  members: ProjectMember[];
};

export type Contributor = {
  name: string;
  contributors: number;
  image: string;
};

export type Skill = {
  name: string;
  level: number;
};

export type UserDetails = {
  id: number;
  name: string;
  image: string;
  email: string;
  phone: string;
  location: string;
  status: string;
  startdate: string;
  current_project: string;
  sfia_level: string;
  reported_to: string;
  role: string;
  access_role: string[];
  created_at: string;
  skills: Skill[];
  additional_info: AdditionalInfo;
  contributors: Contributor[];
  projects: {
    current_project: CurrentProject;
    previous_projects: PreviousProject[];
    employment_history: {
      company: string;
      joined_date: string;
    };
  };
};
