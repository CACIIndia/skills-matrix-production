export type UserSkill = {
  id: string;
  createdById: string;
  skillId: string;
  level: number;
  skill: Skill;
  status: number ; 
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
  status: number | null;
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
  status: number;
  startdate: string;
  current_project: string;
  sfiaLevel: string;
  reportedTo: string;
  reportedToId :string;
}


export interface Certificate  {
  id?:string;
  name: string;
  certificateFile: File | null;
  obtainedDate: Date |null;
  expiryDate: Date | null;
  description: string;
  categoryId: string | null;
  categoryName:string;
  url?:string;
  createdById?:string;
  EmployeeName?:string;
  skillId?:string;
  skillName?:string;
  trainingRecordId?:string;
  isTrainingLinked: boolean;
};

export interface SkillCategory {
  id: string;
  name: string;
  createdAt:Date| string;
  updatedAt:Date| string;
  createdById: string;
  status: number | null
  color?:string;
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
  trainingStatus:string;
}
export interface Skill  {
  id: string;
  name: string;
  categoryId: string | null; 
  createdAt: Date | string;
  updatedAt: Date |string;
  skillCategory?: SkillCategory;
};