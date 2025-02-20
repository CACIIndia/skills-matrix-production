"use client";

import { useAppContext } from "@/app/context/AppContext";
import TableSkeleton from "@/components/skeletons/TableSkeleton";
import TrainingInfoCard from "@/components/views/profile/TrainingInfo";
import TrainingList from "@/components/views/profile/TrainingList";
import { filterTrainings } from "@/lib/utils/trainingFilter";
import { useParams } from "next/navigation";

const Training = () => {
  const params = useParams();
  const { profile, isLoading,viewedProfile } = useAppContext();
  const { currentInProgress, otherTrainings } = filterTrainings(
   params.id ? viewedProfile?.trainingEmployees : profile?.trainingEmployees || [],
  );

  return (
    <div className=' '>
      <div className='lg:gap-7.5 grid grid-cols-1 lg:grid-cols-3 '>
        <div className='col-span-1 grid gap-5'>
          <TrainingInfoCard
            data={{
              id: profile?.id || "",
              categoryName: currentInProgress?.categoryName || "",
              skillName: currentInProgress?.skillName || "",
              fromDate: currentInProgress?.fromDate || "",
              tentativeEndDate: currentInProgress?.tentativeEndDate || "",
              status: {
                name: currentInProgress?.trainingStatus?.name || "",
              },
            }}
          />
        </div>

        <div className='col-span-2 grid gap-5 mt-4 lg:mt-0'>
          {(isLoading || !profile) ? (
              <TableSkeleton
                cols={5}
                tableHeader={true}
                isSearchable={true}
                addNewData={false}
              />
          ) : (
            <TrainingList trainings={otherTrainings || []} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Training;
