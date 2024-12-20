const TableSkeleton = () => (
    <div className='lg:gap-7.5 grid animate-pulse container-fixed'>
    
      <div className='flex items-center justify-between'>
        <div className='input input-sm flex max-w-48 items-center'>
          <div className='h-6 w-6 bg-gray-200 rounded-full'></div>
          <div className='h-6 w-32 bg-gray-200 rounded-sm ml-2'></div>
        </div>
        <div className='max-w-48'>
          <div className='h-8 w-8 bg-gray-200 rounded-full'></div>
        </div>
      </div>
  
    
      <div className='card-body'>
        <table className='table-border table'>
          <thead>
            <tr>
              <th className='w-[60px]'>
                <div className='h-4 w-12 bg-gray-200 rounded'></div>
              </th>
              <th>
                <div className='h-4 w-24 bg-gray-200 rounded'></div>
              </th>
              <th>
                <div className='h-4 w-24 bg-gray-200 rounded'></div>
              </th>
              <th>
                <div className='h-4 w-24 bg-gray-200 rounded'></div>
              </th>
            </tr>
          </thead>
          <tbody>
            {Array(5)
              .fill("")
              .map((_, rowIndex) => (
                <tr key={rowIndex}>
                  <td>
                    <div className='h-6 w-12 bg-gray-200 rounded'></div>
                  </td>
                  <td>
                    <div className='h-6 w-24 bg-gray-200 rounded'></div>
                  </td>
                  <td>
                    <div className='h-6 w-24 bg-gray-200 rounded'></div>
                  </td>
                  <td>
                    <div className='h-6 w-24 bg-gray-200 rounded'></div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
  
       
        <div className='flex items-center justify-between mt-4'>
          <div className='h-6 w-20 bg-gray-200 rounded'></div>
          <div className='flex gap-2'>
            <div className='h-6 w-16 bg-gray-200 rounded'></div>
            <div className='h-6 w-16 bg-gray-200 rounded'></div>
          </div>
        </div>
      </div>
    </div>
  );
  
  export default TableSkeleton;
  