// components/AdditionalInfoCard.tsx
interface AdditionalInfo {
    discipline: string;
    specialism: string;
    employee_type: string;
    location: string;
    cost_centre: string;
  }
  
  interface AdditionalInfoCardProps {
    additional_info: AdditionalInfo | null;
  }
  
  const AdditionalInfoCard: React.FC<AdditionalInfoCardProps> = ({ additional_info }) => {
    return (
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Additional Info</h3>
        </div>
        <div className="card-body pt-3.5 pb-1">
          <table className="table-auto text-start">
            <tbody>
              <tr>
                <td className="text-sm font-medium text-gray-500 pb-3.5 pr-4 lg:pr-6">Discipline:</td>
                <td className="text-sm font-medium text-gray-800 pb-3">
                  {additional_info?.discipline || "N/A"}
                </td>
              </tr>
              <tr>
                <td className="text-sm font-medium text-gray-500 pb-3.5 pr-4 lg:pr-6">Specialism:</td>
                <td className="text-sm font-medium text-gray-800 pb-3">
                  {additional_info?.specialism || "N/A"}
                </td>
              </tr>
              <tr>
                <td className="text-sm font-medium text-gray-500 pb-3.5 pr-4 lg:pr-6">Employee Type:</td>
                <td className="text-sm font-medium text-gray-800 pb-3">
                  {additional_info?.employee_type || "N/A"}
                </td>
              </tr>
              <tr>
                <td className="text-sm font-medium text-gray-500 pb-3.5 pr-4 lg:pr-6">Location:</td>
                <td className="text-sm font-medium text-gray-800 pb-3">
                  {additional_info?.location || "N/A"}
                </td>
              </tr>
              <tr>
                <td className="text-sm font-medium text-gray-500 pb-3.5 pr-4 lg:pr-6">Cost Centre:</td>
                <td className="text-sm font-medium text-gray-800 pb-3">
                  {additional_info?.cost_centre || "N/A"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="card-footer flex justify-center">
          <a className="btn btn-link" href="html/demo1/network/user-table/store-clients.html">
            All Attributes
          </a>
        </div>
      </div>
    );
  };
  
  export default AdditionalInfoCard;
  