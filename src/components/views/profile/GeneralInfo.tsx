import { useEffect, useState } from "react";
import Modal from "@/components/common/Modal";
import EditGeneralInfo from "./actions/EditGeneralInfo";
import useUpdateGeneralInfo from "@/lib/hooks/profile/overview/useUpdateGeneralInfo";
import useGetSfiaLevels from "@/lib/hooks/profile/overview/useSfiaLevel";
import { useRouter } from "next/navigation";
import useGetUsers from "@/lib/hooks/common/useGetUsers";
import { GeneralInfo } from "@/lib/types/profile";

interface GeneralInfoCardProps {
  data: GeneralInfo;
  disableEdit?: boolean;
}

const GeneralInfoCard: React.FC<GeneralInfoCardProps> = ({
  data,
  disableEdit,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editableData, setEditableData] = useState<GeneralInfo>(data);
  const router = useRouter();

  // Fetch SFIA Levels and Reported To Options
  const {
    data: sfiaLevels,
    isLoading: sfiaLoading,
    error: sfiaError,
  } = useGetSfiaLevels();
  const {
    data: usersData,
    isLoading: usersLoading,
    error: usersError,
  } = useGetUsers();

  const mutation = useUpdateGeneralInfo((error) => {
    console.error("Error occurred:", error);
  });

  const handleSaveChanges = async (updatedData: GeneralInfo) => {
    setEditableData(updatedData);

    mutation.mutate(
      { userId: data.id!, updatedData },
      {
        onError: (error) => {
          console.error("Error occurred:", error);
          router.push("/500");
        },
      },
    );

    setIsOpen(false); // Close modal after saving
  };

  useEffect(() => {
    setEditableData(data);
  }, [data]);

  return (
    <div className='card border border-red-100 max-h-[300px] mb-[16px] lg:mb-[0px] ' >
      <div className='card-header'>
        <h3 className='card-title'>General Info</h3>
      </div>
      <div className='card-body pb-3.5 pt-3.5'>
        <table className='table-auto text-start'>
          <tbody>
            <tr>
              <td className='pb-3 pr-4 text-sm font-medium text-gray-500 lg:pr-8'>
                Phone:
              </td>
              <td className='pb-3 text-sm font-medium text-gray-800'>
                {editableData?.phone || "N/A"}
              </td>
            </tr>
            <tr>
              <td className='pb-3 pr-4 text-sm font-medium text-gray-500 lg:pr-8'>
                Status:
              </td>
              <td className='pb-3 text-sm font-medium text-gray-800'>
                <span className='badge badge-sm badge-success badge-outline'>
                  {editableData?.status ? "Active" : "Inactive"}
                </span>
              </td>
            </tr>
            <tr>
              <td className='pb-3 pr-4 text-sm font-medium text-gray-500 lg:pr-8'>
                Start Date:
              </td>
              <td className='pb-3 text-sm font-medium text-gray-800'>
                {data?.startdate
                  ? new Date(data.startdate).toLocaleDateString()
                  : "N/A"}
              </td>
            </tr>
            <tr>
              <td className='pb-3 pr-4 text-sm font-medium text-gray-500 lg:pr-8'>
                Current Project:
              </td>
              <td className='pb-3 text-sm font-medium text-gray-800'>
                {editableData?.current_project || "N/A"}
              </td>
            </tr>
            <tr>
              <td className='pb-3 pr-4 text-sm font-medium text-gray-500 lg:pr-8'>
                SFIA Level:
              </td>
              <td className='pb-3 text-sm font-medium text-gray-800'>
                {editableData?.sfiaLevel || "N/A"}
              </td>
            </tr>
            <tr>
              <td className='pb-3 pr-4 text-sm font-medium text-gray-500 lg:pr-8'>
                Reported To:
              </td>
              <td className='pb-3 text-sm font-medium text-gray-800'>
                {editableData?.reportedTo || "N/A"}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Modal for editing General Info */}
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title='Edit General Info'
        customWidth='w-[500px]'
      >
        {sfiaLoading || usersLoading ? (
          <p>Loading...</p>
        ) : sfiaError || usersError ? (
          <p>Error loading data</p>
        ) : (
          <EditGeneralInfo
            initialData={editableData}
            onSave={handleSaveChanges}
            sfiaLevels={sfiaLevels || []}
            reportedToOptions={usersData || []}
          />
        )}
      </Modal>
    </div>
  );
};

export default GeneralInfoCard;
