import { UserDetails } from "@/lib/types/profile";

export const DEFAULT_USER_DETAILS: UserDetails = {
  id: 0,
  name: "",
  image: "/default-avatar.png",
  email: "",
  phone: "",
  location: "",
  status: "",
  startdate: "",
  current_project: "",
  sfia_level: "",
  reported_to: "",
  role: "",
  access_role: [],
  created_at: "",
  skills: [],
  additional_info: {
    discipline: "",
    specialism: "",
    employee_type: "",
    location: "",
    cost_centre: "",
  },
  contributors: [],
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

export const SKILL_LEVELS = [
  { name: "None", color: "badge-outline" },
  { name: "Novice", color: "badge-danger" },
  { name: "Proficient", color: "badge-warning" },
  { name: "Expert", color: "badge-primary" },
  { name: "Specialist", color: "badge-success" },
];
