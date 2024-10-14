import { useEffect, useState } from "react";
import Modal from "@/components/common/Modal";
import EditGeneralInfo from "./actions/EditGeneralInfo";
import useUpdateGeneralInfo from "@/lib/hooks/profile/overview/useUpdateGeneralInfo";
import useGetSfiaLevels from "@/lib/hooks/profile/overview/useSfiaLevel";
import { useRouter } from "next/navigation";
import useGetUsers from "@/lib/hooks/common/useGetUsers";

interface GeneralInfo {
  id?: string;
  email: string;
  phone: string;
  status: string;
  startdate: string;
  current_project: string;
  sfia_level: string;
  reported_to: string;
}

interface GeneralInfoCardProps {
  data: GeneralInfo;
}

const GeneralInfoCard: React.FC<GeneralInfoCardProps> = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editableData, setEditableData] = useState<GeneralInfo>(data);
  const router = useRouter();

  // Fetch SFIA Levels and Reported To Options
  const { data: sfiaLevels, isLoading: sfiaLoading, error: sfiaError } = useGetSfiaLevels();
  const { data: usersData, isLoading: usersLoading, error: usersError } = useGetUsers();

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
          // router.push("/500");
        },
      }
    );

    setIsOpen(false); // Close modal after saving
  };

  useEffect(() => {
    setEditableData(data);
  }, [data]);

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">General Info</h3>
        <span>
          <button
            className="btn btn-sm btn-icon btn-clear btn-primary"
            onClick={() => setIsOpen(true)}
          >
            <i className="ki-filled ki-notepad-edit"></i>
          </button>
        </span>
      </div>
      <div className="card-body pt-3.5 pb-3.5">
        <table className="table-auto text-start">
          <tbody>
            <tr>
              <td className="text-sm font-medium text-gray-500 pb-3 pr-4 lg:pr-8">
                Email:
              </td>
              <td className="text-sm font-medium text-gray-800 pb-3">
                {editableData?.email || "N/A"}
              </td>
            </tr>
            <tr>
              <td className="text-sm font-medium text-gray-500 pb-3 pr-4 lg:pr-8">
                Phone:
              </td>
              <td className="text-sm font-medium text-gray-800 pb-3">
                {editableData?.phone || "N/A"}
              </td>
            </tr>
            <tr>
              <td className="text-sm font-medium text-gray-500 pb-3 pr-4 lg:pr-8">
                Status:
              </td>
              <td className="text-sm font-medium text-gray-800 pb-3">
                <span className="badge badge-sm badge-success badge-outline">
                  {editableData?.status || "Inactive"}
                </span>
              </td>
            </tr>
            <tr>
              <td className="text-sm font-medium text-gray-500 pb-3 pr-4 lg:pr-8">
                Start Date:
              </td>
              <td className="text-sm font-medium text-gray-800 pb-3">
                {data?.startdate
                  ? new Date(data.startdate).toLocaleDateString()
                  : "N/A"}
              </td>
            </tr>
            <tr>
              <td className="text-sm font-medium text-gray-500 pb-3 pr-4 lg:pr-8">
                Current Project:
              </td>
              <td className="text-sm font-medium text-gray-800 pb-3">
                {editableData?.current_project || "N/A"}
              </td>
            </tr>
            <tr>
              <td className="text-sm font-medium text-gray-500 pb-3 pr-4 lg:pr-8">
                SFIA Level:
              </td>
              <td className="text-sm font-medium text-gray-800 pb-3">
                {editableData?.sfia_level || "N/A"}
              </td>
            </tr>
            <tr>
              <td className="text-sm font-medium text-gray-500 pb-3 pr-4 lg:pr-8">
                Reported To:
              </td>
              <td className="text-sm font-medium text-gray-800 pb-3">
                {editableData?.reported_to || "N/A"}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Modal for editing General Info */}
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} title="Edit General Info" customWidth="w-[500px]">
        {sfiaLoading || usersLoading ? (
          <p>Loading...</p>
        ) : sfiaError || usersError ? (
          <p>Error loading data</p>
        ) : (
          <EditGeneralInfo
            initialData={editableData}
            onSave={handleSaveChanges}
            sfiaLevels={sfiaLevels} // Pass fetched SFIA levels
            reportedToOptions={usersData} // Pass fetched Reported To options
          />
        )}
      </Modal>
    </div>
  );
};

export default GeneralInfoCard;
