// components/GeneralInfoCard.tsx
interface GeneralInfo {
  email: string;
  phone: string;
  status: string;
  startdate: string;
  current_project: string;
  sfia_level: string;
  reported_to: string;
}

interface GeneralInfoCardProps {
  data: GeneralInfo ;
}

const GeneralInfoCard: React.FC<GeneralInfoCardProps> = ({ data }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">General Info</h3>
      </div>
      <div className="card-body pt-3.5 pb-3.5">
        <table className="table-auto text-start">
          <tbody>
            <tr>
              <td className="text-sm font-medium text-gray-500 pb-3 pr-4 lg:pr-8">Email:</td>
              <td className="text-sm font-medium text-gray-800 pb-3">{data?.email || "N/A"}</td>
            </tr>
            <tr>
              <td className="text-sm font-medium text-gray-500 pb-3 pr-4 lg:pr-8">Phone:</td>
              <td className="text-sm font-medium text-gray-800 pb-3">{data?.phone || "N/A"}</td>
            </tr>
            <tr>
              <td className="text-sm font-medium text-gray-500 pb-3 pr-4 lg:pr-8">Status:</td>
              <td className="text-sm font-medium text-gray-800 pb-3">
                <span className="badge badge-sm badge-success badge-outline">{data?.status || "Inactive"}</span>
              </td>
            </tr>
            <tr>
              <td className="text-sm font-medium text-gray-500 pb-3 pr-4 lg:pr-8">Start Date:</td>
              <td className="text-sm font-medium text-gray-800 pb-3">{data?.startdate ? new Date(data.startdate).toLocaleDateString() : "N/A"}</td>
            </tr>
            <tr>
              <td className="text-sm font-medium text-gray-500 pb-3 pr-4 lg:pr-8">Current Project:</td>
              <td className="text-sm font-medium text-gray-800 pb-3">{data?.current_project || "N/A"}</td>
            </tr>
            <tr>
              <td className="text-sm font-medium text-gray-500 pb-3 pr-4 lg:pr-8">SFIA Level:</td>
              <td className="text-sm font-medium text-gray-800 pb-3">{data?.sfia_level || "N/A"}</td>
            </tr>
            <tr>
              <td className="text-sm font-medium text-gray-500 pb-3 pr-4 lg:pr-8">Reported To:</td>
              <td className="text-sm font-medium text-gray-800 pb-3">{data?.reported_to || "N/A"}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GeneralInfoCard;