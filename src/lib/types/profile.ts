export type Skill = {
  id: string;
  name: string;
  category: string;
  level?: number;
};

export type UserSkill = {
  id: string;
  createdById: string;
  skillId: string;
  level: number;
  skill: Skill;
  status: string | null; 
  createdAt: Date;         
  updatedAt: Date;         
}

export type Project = {
  id: string;
  projectName: string;
  startDate: string;
  endDate?: string;
  role: string;
  description: string;
  code: string;
  isCurrentProject: boolean;
  userId: string;
};

export type AdditionalInfo = {
  id: string;
  discipline: string;
  specialism: string;
  employeeType: string;
  location: string;
  costCentre: string;
  userId: string;
};

export type UserDetails = {
  id: string;
  name: string;
  email: string;
  emailVerified: null | string;
  image: string;
  phone: string;
  location: string;
  status: string;
  startdate?:string;
  sfiaLevel: string;
  reportedTo: string;
  reportedToId: string;
  role: string;
  createdAt: string;
  joiningDate: string;
  additionalInfo: AdditionalInfo;
  userSkills: UserSkill[];
  projects: Project[];
  currentProject?: Project;
};

export interface GeneralInfo {
  id?: string;
  email: string;
  phone: string;
  status: string;
  startdate: string;
  current_project: string;
  sfia_level: string;
  reported_to: string;
  reported_to_id :string;
}
