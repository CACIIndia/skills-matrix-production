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


export interface Certificate  {
  id?:string;
  name: string;
  certificateFile: File | null;
  obtainedDate: Date |null;
  expiryDate: Date | null;
  description: string;
  categoryId: string;
  categoryName:string;
  url?:string;
  createdById?:string
};

export interface SkillCategory {
  id: string;
  name: string;
  createdAt:Date| string;
  updatedAt:Date| string;
  createdById: string;
  status: string | null
};

export interface Training {
  id: string;
  categoryId: string;
  categoryName: string;
  skillId: string;
  skillName: string;
  fromDate: Date | null;
  tentativeEndDate: Date |null;
  description: string;
  createdAt: Date |null;
  updatedAt: Date |null;
  createdById: string;
  statusId: string;
  employeeId: string;
  employeeName: string;
  employee:{
    role:string;
  }
}
export interface Skill  {
  id: string;
  name: string;
  categoryId: string | null; 
  createdAt: Date | string;
  updatedAt: Date |string;
  skillCategory?: SkillCategory;
};