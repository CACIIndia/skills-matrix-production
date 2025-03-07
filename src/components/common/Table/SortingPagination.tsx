// components/Pagination.tsx

import React from "react";

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setItemsPerPage: React.Dispatch<React.SetStateAction<number>>;
}

const SortingPagination: React.FC<PaginationProps> = ({
  currentPage,
  totalItems,
  itemsPerPage,
  setCurrentPage,
  setItemsPerPage,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className='card-footer text-2sm md:gap-5 font-medium text-gray-600 flex justify-between flex-wrap'>
      <div className='flex items-center md:gap-5'>
        <span>Rows per page:</span>
        <select
          value={itemsPerPage}
          onChange={(e) => {
            const value = Number(e.target.value);
            setItemsPerPage(value);
            setCurrentPage(1);
          }}
        >
          <option value='1'>1</option>
          <option value='2'>2</option>
          <option value='5'>5</option>
          <option value='10'>10</option>
          <option value='15'>15</option>
        </select>
      </div>
      <div className='flex items-center justify-between md:gap-6'>
        <span>
          {totalItems === 0 || itemsPerPage === 0
            ? "0-0 of 0"
            : `${(currentPage - 1) * itemsPerPage + 1}-${Math.min(
                currentPage * itemsPerPage,
                totalItems,
              )} of ${totalItems} Records`}
        </span>
        <div className='flex md:gap-3 items-center'>
          <button
            className='btn btn-sm btn-icon btn-clear btn-primary'
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1 || totalItems ==0}
          >
            &lt;
          </button>
          {totalItems ==0?"":currentPage}
          <button
            className='btn btn-sm btn-icon btn-clear btn-primary'
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages ||  totalItems ==0}
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default SortingPagination;
