import { useState } from "react";
import { HiOutlineDocumentAdd } from "react-icons/hi";

const Bio = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className='lg:gap-7.5 flex h-[100%] flex-col gap-5 bg-[red]'>
        <div className='card h-[100%]'>
          <div className='card-header flex items-center justify-between'>
            <h3 className='card-title'>Edit Bio</h3>
          </div>

          <div className='card-body'>
            <div className='mb-2 flex flex-wrap gap-2.5'>
              <div className='m-auto flex h-[100px] items-center justify-center'>
                <div className='flex h-[40vh] flex-col flex-wrap items-center justify-center space-y-4'>
                  <div>No bio found, still some work to do...😄</div>
                  <button
                    onClick={() => {}}
                    className='btn-primary relative mb-[4px] mr-[10px] rounded-[4px] bg-[#0d6efd] p-[6px] text-white transition duration-300 hover:bg-blue-700'
                  >
                    <div className='flex items-center justify-center space-x-1'>
                      <HiOutlineDocumentAdd className='h-6 w-6' />
                      <div>Add Bio</div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Bio;
