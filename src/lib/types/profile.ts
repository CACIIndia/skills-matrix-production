export type Skill = {
  id: string;
  name: string;
  category: string;
  level?: number;
};

export type UserSkill = {
  id: string;
  userId: string;
  skillId: string;
  level: number;
  skill: Skill;
};

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
