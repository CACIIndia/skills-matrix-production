// components/Pagination.tsx

import React from 'react';

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
    <div className="card-footer text-2sm flex-col justify-center gap-5 font-medium text-gray-600 md:flex-row md:justify-between">
      <div className="order-2 flex items-center gap-5 md:order-1">
        <span>Rows per page:</span>
        <select
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(Number(e.target.value))}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </select>
      </div>
      <div className="order-1 flex items-center justify-between gap-6 md:order-2">
        <span>
          {`${(currentPage - 1) * itemsPerPage + 1}-${Math.min(
            currentPage * itemsPerPage,
            totalItems
          )} of ${totalItems}`}
        </span>
        <div className="flex gap-3">
          <button
            className="btn btn-sm btn-icon btn-clear btn-primary"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            &lt;
          </button>
          <button
            className="btn btn-sm btn-icon btn-clear btn-primary"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default SortingPagination;
