import { AdditionalInfo } from "@/lib/types/profile";

type AdditionalInfoCardProps = {
  additional_info?: AdditionalInfo;
};

const AdditionalInfoCard = ({ additional_info }: AdditionalInfoCardProps) => {
  return (
    <div className='card'>
      <div className='card-header'>
        <h3 className='card-title'>Additional Info</h3>
      </div>
      <div className='card-body pb-1 pt-3.5'>
        <table className='table-auto text-start'>
          <tbody>
            <tr>
              <td className='pb-3.5 pr-4 text-sm font-medium text-gray-500 lg:pr-6'>
                Discipline:
              </td>
              <td className='pb-3 text-sm font-medium text-gray-800'>
                {additional_info?.discipline || "N/A"}
              </td>
            </tr>
            <tr>
              <td className='pb-3.5 pr-4 text-sm font-medium text-gray-500 lg:pr-6'>
                Specialism:
              </td>
              <td className='pb-3 text-sm font-medium text-gray-800'>
                {additional_info?.specialism || "N/A"}
              </td>
            </tr>
            <tr>
              <td className='pb-3.5 pr-4 text-sm font-medium text-gray-500 lg:pr-6'>
                Employee Type:
              </td>
              <td className='pb-3 text-sm font-medium text-gray-800'>
                {additional_info?.employee_type || "N/A"}
              </td>
            </tr>
            <tr>
              <td className='pb-3.5 pr-4 text-sm font-medium text-gray-500 lg:pr-6'>
                Location:
              </td>
              <td className='pb-3 text-sm font-medium text-gray-800'>
                {additional_info?.location || "N/A"}
              </td>
            </tr>
            <tr>
              <td className='pb-3.5 pr-4 text-sm font-medium text-gray-500 lg:pr-6'>
                Cost Centre:
              </td>
              <td className='pb-3 text-sm font-medium text-gray-800'>
                {additional_info?.cost_centre || "N/A"}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className='card-footer flex justify-center'>
        <a
          className='btn btn-link'
          href='html/demo1/network/user-table/store-clients.html'
        >
          All Attributes
        </a>
      </div>
    </div>
  );
};

export default AdditionalInfoCard;
