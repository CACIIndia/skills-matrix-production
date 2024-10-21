import { UserDetails } from "@/lib/types/profile";

export const DEFAULT_USER_DETAILS: UserDetails = {
  id: "",
  name: "",
  image: "/default-avatar.png",
  email: "",
  phone: "",
  location: "",
  status: "",
  startdate: "",
  sfiaLevel: "",
  reportedTo: "",
  reportedToId:"",
  role: "",
  createdAt: "",
  userSkills: [],
  additionalInfo: {
    id:"",
    userId:"",
    discipline: "",
    specialism: "",
    employeeType: "",
    location: "",
    costCentre: "",
  },
  projects: [],
  currentProject: {
    id: "",
    projectName: "",
    startDate: "",
    role: "",
    description: "",
    code: "",
    isCurrentProject: false,
    userId: ""
  },
  emailVerified:"",
  joiningDate :"",

};

export const SKILL_LEVELS = [
  { name: "None", color: "badge-outline" },
  { name: "Novice", color: "badge-danger" },
  { name: "Proficient", color: "badge-warning" },
  { name: "Expert", color: "badge-primary" },
  { name: "Specialist", color: "badge-success" },
];
