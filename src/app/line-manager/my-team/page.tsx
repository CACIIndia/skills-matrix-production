"use client";

import { useAppContext } from "@/app/context/AppContext";
import TeamsSkeleton from "@/components/skeletons/TeamSkeleton";
import useGetUsersByLineManager from "@/lib/hooks/common/useGetUsersByLineManager";
import Image from "next/image";
import React from "react";

const defaultImagePath = "/assets/media/avatars/default-image.png";

interface TeamCardProps {
  name: string;
  skills: string[];
  email: string;
  role: string;
  phone: string;
  id: string;
  image: string;
}
interface TeamCardsProps {
  teams: {
    name: string;
    skills: string[];
    email: string;
    role: string;
    phone: string;
    id: string;
    image: string;
    userSkills?: any;
  }[];
}

const TeamCard: React.FC<TeamCardProps> = ({
  name,
  skills,
  email,
  role,
  phone,
  id,
  image,
}) => {
  const handleClick = () => {
    window.open(`/profile/overview/${id}`, "_blank"); // Opens in a new tab
  };
  
  const renderSkills = () => {
    if (!skills.length) return <span>N/A</span>; // Handle empty skills

    if (skills.length > 2) {
      return (
        <>
          {skills.slice(0, 2).map((skill, index) => (
            <span key={index} className="badge badge-sm badge-outline">
              {skill}
            </span>
          ))}
          <span
            className="badge badge-sm badge-outline cursor-pointer text-primary"
            
            onClick={() => window.open(`/profile/overview/${id}?section=skills`, "_blank")}
          >
            +{skills.length - 2} more
          </span>
        </>
      );
    }

    return skills.map((skill, index) => (
      <span key={index} className="badge badge-sm badge-outline">
        {skill}
      </span>
    ));
  };

  return (
    <div className="card">
      <div className="card-body grid gap-7 py-7.5">
        <div className="grid place-items-center gap-4">
          <div className="flex justify-center items-center size-14 rounded-full ">
            <Image
              src={image || defaultImagePath}
              alt={`${name}'s avatar`}
              width={56}
              height={56}
              className="rounded-full object-cover"
            />
          </div>
          <div className="grid place-items-center">
            <a
              className="text-base font-semibold text-gray-900 hover:text-primary-active mb-px text-primary cursor-pointer"
              onClick={handleClick}
            >
              {name || "N/A"}
            </a>
            <span className="text-2sm font-medium text-gray-600 hover:text-primary-active cursor-pointer"
             onClick={() => window.open(`mailto:${email}`, "_blank")}
            >
              {email || "N/A"}
            </span>
          </div>
        </div>
        <div className="grid">
          <div className="flex items-center justify-between flex-wrap mb-3.5 gap-2">
            <span className="text-2xs font-medium text-gray-500 uppercase">
              Skills
            </span>
            <div className="flex flex-wrap gap-1.5">{renderSkills()}</div>
          </div>
          <div className="border-t border-gray-300 border-dashed"></div>
          <div className="flex items-center justify-between flex-wrap my-2.5 gap-2">
            <span className="text-2xs font-medium text-gray-500 uppercase">
              Role
            </span>
            <span className="text-sm font-medium text-gray-800">
              {role || "N/A"}
            </span>
          </div>
          <div className="border-t border-gray-300 border-dashed"></div>
          <div className="flex items-center justify-between flex-wrap my-2.5 gap-2">
            <span className="text-2xs font-medium text-gray-500 uppercase">
              Phone Number
            </span>
            <span className="text-sm font-medium text-gray-800">
              {phone || "N/A"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};



const TeamCards: React.FC<TeamCardsProps> = ({ teams }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-7.5">
      {teams.map((team, index) => (
        <TeamCard
          key={index}
          name={team.name || "N/A"}
          skills={team.skills || []}
          email={team.email || "N/A"}
          role={team.role || "N/A"}
          phone={team.phone || "N/A"}
          id={team.id}
          image={team.image || defaultImagePath}
        />
      ))}
    </div>
  );
};

const TeamsContainer: React.FC = () => {
  
    const { profile } = useAppContext();
    const { data: users = [], isLoading } = useGetUsersByLineManager(profile?.id);
    if(isLoading || !users || users.length === 0) return <div>
      <TeamsSkeleton/>
    </div>;
    const transformedTeams = users.map((team) => ({
      ...team,
      skills: team.userSkills?.map((item) => item.skill.name) || []
    }));

  
  
    return (
      <div className="container-fixed">
        <div className="flex flex-col items-stretch gap-5 lg:gap-7.5">
          <div className="flex flex-wrap items-center gap-5 justify-between">
            <h3 className="text-lg text-[#6D6E82] ">
             Showing  ({transformedTeams.length}) Team Members 
            </h3>
          </div>
          <TeamCards teams={transformedTeams} />
        </div>
      </div>
    );
  };
  

export default TeamsContainer;
