"use client";

import { useAppContext } from "@/app/context/AppContext";

import ProfileAdditionalInfo from "@/components/views/profile/AdditionalInfo";
import TrainingInfoCard from "@/components/views/profile/TrainingInfo";
import ProfileProjectHistory from "@/components/views/profile/ProjectHistory";
import ProfileSkills from "@/components/views/profile/Skills";

import { DEFAULT_USER_DETAILS } from "@/lib/constants/profile";
import { newDate } from "react-datepicker/dist/date_utils";
import TrainingList from "@/components/views/profile/TrainingList";
import { filterTrainings } from "@/lib/utils/trainingFilter";
const trainings = [
  {
    id: "1",
    categoryName: "Software Development",
    skillName: "React.js",
    fromDate: "2024-01-10",
    tentativeEndDate: "2024-01-20",
    description: "Advanced React.js training for senior developers.",
    status: "Completed",
  },
  {
    id: "2",
    categoryName: "Project Management",
    skillName: "Agile Methodologies",
    fromDate: "2024-02-01",
    tentativeEndDate: "2024-02-15",
    description: "Agile principles and Scrum practices.",
    status: "In Progress",
  },
  {
    id: "3",
    categoryName: "Software Development",
    skillName: "React.js",
    fromDate: "2024-01-10",
    tentativeEndDate: "2024-01-20",
    description: "Advanced React.js training for senior developers.",
    status: "Completed",
  },
  {
    id: "4",
    categoryName: "Project Management",
    skillName: "Agile Methodologies",
    fromDate: "2024-02-01",
    tentativeEndDate: "2024-02-15",
    description: "Agile principles and Scrum practices.",
    status: "In Progress",
  },
];




const Training = () => {
  const { profile } = useAppContext();

  const projects = profile?.projects || [];

  const { currentInProgress, otherTrainings } = filterTrainings(
    profile?.trainingEmployees || []
  );
    
  console.log(otherTrainings,"currentInProgresscurrentInProgress");
 

  return (
    <div className=" ">
    <div className='lg:gap-7.5 grid grid-cols-1 lg:grid-cols-3'>
      <div className='col-span-1 grid gap-5'>
        
        <TrainingInfoCard
          data={{
            id: profile?.id || "",
            categoryName: currentInProgress?.categoryName || "",
            skillName: currentInProgress?.skillName || "",
            fromDate: currentInProgress?.fromDate || "",
            tentativeEndDate: currentInProgress?.tentativeEndDate || "",
            status: {
              name: currentInProgress?.status?.name || "",
            },
          }}
        />

       
      </div>

      <div className='col-span-2 grid gap-5'>
       <TrainingList trainings={otherTrainings || []}/>

       
      </div>
    </div>
    </div>
  );
};

export default Training;
