import { UserDetails } from "@/lib/types/profile";

export const DEFAULT_USER_DETAILS: UserDetails = {
  id: "",
  name: "",
  image: "/default-avatar.png",
  email: "",
  phone: "",
  location: "",
  status: 1,
  startdate: "",
  sfiaLevel: "",
  reportedTo: "",
  reportedToId: "",
  role: "",
  createdAt: "",
  userSkills: [],
  additionalInfo: {
    id: "",
    userId: "",
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
    userId: "",
  },
  emailVerified: "",
  joiningDate: "",
};

export const SKILL_LEVELS = [
  {
    level: 0,
    name: "None",
    description: "No knowledge of the skill",
  },
  {
    level: 1,
    name: "Basic",
    description: "General understanding, can perform tasks with supervision",
  },
  {
    level: 2,
    name: "Proficient",
    description:
      "Independent task completion with quality that exceeds the basics",
  },
  {
    level: 3,
    name: "Expert",
    description:
      "Independent, high-quality task completion and ability to share knowledge with peers",
  },
  {
    level: 4,
    name: "Specialist",
    description:
      "Independent, high-quality task completion, ability to optimise processes, and design solutions",
  },
];
