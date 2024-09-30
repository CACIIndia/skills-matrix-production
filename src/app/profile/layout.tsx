"use client";
import React, { FC, useEffect, useState } from "react";

import { ProfileProvider } from "@/context/profileContext";
import { usePathname } from "next/navigation";

const defaultData: UserDetails = {
  id: 0,
  name: "",
  email: "",
  image: "/default-avatar.png",
  role: "",
  additional_info: {
    discipline: "",
    specialism: "",
    employee_type: "",
    location: "",
    cost_centre: "",
  },
  general_info: {
    phone: "",
    status: "",
    startdate: "",
    current_project: "",
    sfia_level: "",
    reported_to: "",
  },
  skills: [],
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
interface ProfileLayoutProps {
  children: React.ReactNode;
}
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
  role: string;
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
interface ProfileLayoutProps {
  children: React.ReactNode;
}

const ProfileLayout: FC<ProfileLayoutProps> = ({ children }) => {
  const pathname = usePathname(); // Get the current path

  // If the path matches profile/overview/[id], skip layout rendering
  const shouldRenderLayout =
    pathname === "/profile/overview" ||
    !pathname.startsWith("/profile/overview/");

  if (!shouldRenderLayout) {
    return children; // Return only the child content if we're on profile/overview/[id]
  }

  return (
    <div className='w-[100%]'>
      <ProfileProvider>{children}</ProfileProvider>
    </div>
  );
};

export default ProfileLayout;
