import { UserDetails } from "@/lib/types/profile";

interface GeneralInfoCardProps {
  data?: UserDetails;
}

const GeneralInfoCard = ({ data }: GeneralInfoCardProps) => {
  return (
    <div className='card'>
      <div className='card-header'>
        <h3 className='card-title'>General Info</h3>
      </div>
      <div className='card-body pb-3.5 pt-3.5'>
        <table className='table-auto text-start'>
          <tbody>
            <tr>
              <td className='pb-3 pr-4 text-sm font-medium text-gray-500 lg:pr-8'>
                Email:
              </td>
              <td className='pb-3 text-sm font-medium text-gray-800'>
                {data?.email || "N/A"}
              </td>
            </tr>
            <tr>
              <td className='pb-3 pr-4 text-sm font-medium text-gray-500 lg:pr-8'>
                Phone:
              </td>
              <td className='pb-3 text-sm font-medium text-gray-800'>
                {data?.phone || "N/A"}
              </td>
            </tr>
            <tr>
              <td className='pb-3 pr-4 text-sm font-medium text-gray-500 lg:pr-8'>
                Status:
              </td>
              <td className='pb-3 text-sm font-medium text-gray-800'>
                <span className='badge badge-sm badge-success badge-outline'>
                  {data?.status || "Inactive"}
                </span>
              </td>
            </tr>
            <tr>
              <td className='pb-3 pr-4 text-sm font-medium text-gray-500 lg:pr-8'>
                Start Date:
              </td>
              <td className='pb-3 text-sm font-medium text-gray-800'>
                {data?.startdate || "N/A"}
              </td>
            </tr>
            <tr>
              <td className='pb-3 pr-4 text-sm font-medium text-gray-500 lg:pr-8'>
                Current Project:
              </td>
              <td className='pb-3 text-sm font-medium text-gray-800'>
                {data?.current_project || "N/A"}
              </td>
            </tr>
            <tr>
              <td className='pb-3 pr-4 text-sm font-medium text-gray-500 lg:pr-8'>
                SFIA Level:
              </td>
              <td className='pb-3 text-sm font-medium text-gray-800'>
                {data?.sfia_level || "N/A"}
              </td>
            </tr>
            <tr>
              <td className='pb-3 pr-4 text-sm font-medium text-gray-500 lg:pr-8'>
                Reported To:
              </td>
              <td className='pb-3 text-sm font-medium text-gray-800'>
                {data?.reported_to || "N/A"}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GeneralInfoCard;
