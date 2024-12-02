"use client";

import { useAppContext } from "@/app/context/AppContext";
import TrainingInfoCard from "@/components/views/profile/TrainingInfo";
import TrainingList from "@/components/views/profile/TrainingList";
import { filterTrainings } from "@/lib/utils/trainingFilter";





const Training = () => {
  const { profile } = useAppContext();

  const { currentInProgress, otherTrainings } = filterTrainings(
    profile?.trainingEmployees || []
  );
    

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
