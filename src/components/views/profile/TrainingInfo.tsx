import React from "react";

interface TrainingInfo {
  id: string;
  categoryName: string;
  skillName: string;
  fromDate: string;
  tentativeEndDate: string;
  status: {
    name: string; 
  };
}

interface TrainingInfoCardProps {
  data: TrainingInfo;
}

const TrainingInfoCard: React.FC<TrainingInfoCardProps> = ({ data }) => {
  return (
    <div className="card border border-blue-100 max-h-[300px]">
      <div className="card-header">
        <h3 className="card-title">Training Info</h3>
      </div>
      <div className="card-body pb-3.5 pt-3.5">
        <table className="table-auto text-start">
          <tbody>
            <tr>
              <td className="pb-3 pr-4 text-sm font-medium text-gray-500 lg:pr-8">
                Category Name:
              </td>
              <td className="pb-3 text-sm font-medium text-gray-800">
                {data?.categoryName || "N/A"}
              </td>
            </tr>
            <tr>
              <td className="pb-3 pr-4 text-sm font-medium text-gray-500 lg:pr-8">
                Skill Name:
              </td>
              <td className="pb-3 text-sm font-medium text-gray-800">
                {data?.skillName || "N/A"}
              </td>
            </tr>
            <tr>
              <td className="pb-3 pr-4 text-sm font-medium text-gray-500 lg:pr-8">
                From Date:
              </td>
              <td className="pb-3 text-sm font-medium text-gray-800">
                {data?.fromDate
                  ? new Date(data.fromDate).toLocaleDateString()
                  : "N/A"}
              </td>
            </tr>
            <tr>
              <td className="pb-3 pr-4 text-sm font-medium text-gray-500 lg:pr-8">
                Tentative End Date:
              </td>
              <td className="pb-3 text-sm font-medium text-gray-800">
                {data?.tentativeEndDate
                  ? new Date(data.tentativeEndDate).toLocaleDateString()
                  : "N/A"}
              </td>
            </tr>
            <tr>
              <td className="pb-3 pr-4 text-sm font-medium text-gray-500 lg:pr-8">
                Status:
              </td>
              <td className="pb-3 text-sm font-medium text-gray-800">
                <span
                  className={`badge badge-sm ${
                    data?.status.name === "Completed"
                      ? "badge-success"
                      : "badge-warning"
                  } badge-outline`}
                >
                  {data?.status.name || "N/A"}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TrainingInfoCard;
