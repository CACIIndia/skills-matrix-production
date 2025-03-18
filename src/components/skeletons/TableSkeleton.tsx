import React from "react";

interface TableSkeletonProps {
  cols: number;
  rows?: number;
  tableHeader: boolean;
  isSearchable: boolean;
  addNewData: boolean;
}

const TableSkeleton: React.FC<TableSkeletonProps> = ({
  cols = 5,
  rows = 5,
  tableHeader,
  isSearchable,
  addNewData
}) => {
  return (
    <div>
      <div className='card card-grid h-full min-w-full animate-pulse'>
        {/* <div className='flex items-center justify-between'>
        <div className='input input-sm flex max-w-48 items-center'>
          <div className='h-6 w-6 rounded-full bg-gray-200'></div>
          <div className='ml-2 h-6 w-32 rounded-sm bg-gray-200'></div>
        </div>
        <div className='max-w-48'>
          <div className='h-8 w-8 rounded-full bg-gray-200'></div>
        </div>
      </div> */}
        <div className='card-header flex flex-col items-start'>
          {tableHeader && (
            <div className='h-6 w-48 bg-gray-200 rounded my-1'>
              {tableHeader}
            </div>
          )}
          <div className='flex w-[100%] items-center justify-between'>
            {isSearchable ? (
              <div className='h-7 w-48 bg-gray-200 rounded'></div>
            ) : (
              <div className='w-48'></div>
            )}
            {addNewData && (
              <div className='h-6 w-6 rounded-full bg-gray-200'></div>
            )}
          </div>
        </div>

        <div className='card-body overflow-x-auto'>
          <table className='table-border table'>
            <thead>
              <tr>
                {Array(cols)
                  .fill("")
                  .map((_, colIndex) => (
                    <th key={colIndex}>
                      <div
                        className={`h-4 ${
                          colIndex === 0 ? "w-12" : "w-24"
                        } rounded bg-gray-200`}
                      ></div>
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {Array(rows)
                .fill("")
                .map((_, rowIndex) => (
                  <tr key={rowIndex}>
                    {Array(cols)
                      .fill("")
                      .map((_, colIndex) => (
                        <td key={colIndex}>
                          <div
                            className={`h-6 ${
                              colIndex === 0 ? "w-12" : "w-24"
                            } rounded bg-gray-200`}
                          ></div>
                        </td>
                      ))}
                  </tr>
                ))}
            </tbody>
          </table>

          <div className="card-footer text-2sm flex-col justify-center gap-5 font-medium text-gray-600 md:flex-row md:justify-between">
            <div className='h-6 w-20 rounded bg-gray-200'></div>
            <div className='flex gap-2'>
              <div className='h-6 w-16 rounded bg-gray-200'></div>
              <div className='h-6 w-16 rounded bg-gray-200'></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableSkeleton;
