import React, { Dispatch, SetStateAction, useState } from "react";
import { CiSquarePlus } from "react-icons/ci";
import SortingPagination from "./SortingPagination";
import { Certificate } from "@/lib/types/profile";

type TableHeaders = {
  key: string;
  label: string;
  sortable?: boolean;
  className?: string;
};

type TableProps<T> = {
  headers: TableHeaders[];
  isSearchable: boolean;
  addNewData: boolean;
  searchQuery: string;
  setSearchQuery?: Dispatch<SetStateAction<string>>;
  setIsAddModalOpen?: Dispatch<SetStateAction<boolean>>;
  handleTrainingSearch: (query: string) => void;
  data: Certificate[];
  renderCell?: (
    key: string,
    value: string,
    rowData: Certificate,
  ) => React.ReactNode; // Custom cell rendering
};

const Table = <T,>({
  headers,
  isSearchable,
  addNewData,
  searchQuery,
  setSearchQuery,
  handleTrainingSearch,
  setIsAddModalOpen,
  data,
  renderCell,
}: TableProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc" | null;
  }>({ key: "", direction: null });

  const sortData = (data: Certificate[]) => {
    if (!sortConfig.key || !sortConfig.direction) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key as keyof Certificate] ?? null;
      const bValue = b[sortConfig.key as keyof Certificate] ?? null;

      if (aValue === null && bValue === null) return 0;
      if (aValue === null) return sortConfig.direction === "asc" ? -1 : 1;
      if (bValue === null) return sortConfig.direction === "asc" ? 1 : -1;

      const isAscending = sortConfig.direction === "asc";

      return isAscending
        ? (aValue as string | number) > (bValue as string | number)
          ? 1
          : -1
        : (aValue as string | number) < (bValue as string | number)
          ? 1
          : -1;
    });
  };

  const paginatedData = sortData(data).slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const getSortClass = (key: string) => {
    if (sortConfig.key !== key) return "";
    return sortConfig.direction === "asc" ? "asc" : "desc";
  };

  const handleSort = (key: keyof Certificate) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className='grid'>
      <div className='card card-grid h-full min-w-full'>
        <div className='card-header flex items-center justify-between'>
          {isSearchable ? (
            <div className='input input-sm flex max-w-48 items-center'>
              <i className='ki-filled ki-magnifier' />
              <input
                placeholder='Search..'
                type='text'
                className='ml-2'
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery? setSearchQuery(e?.target?.value) : '';
                  handleTrainingSearch(e?.target?.value);
                }}
              />
            </div>
          ) : (
            <div className='max-w-48'></div>
          )}
          {addNewData && (
            <h3 className='card-title'>
              <button
                onClick={() => setIsAddModalOpen? setIsAddModalOpen(true): ''}
                className='btn btn-sm btn-icon btn-clear btn-primary'
              >
                <CiSquarePlus size={32} />
              </button>
            </h3>
          )}
        </div>
        <div className='card-body'>
          <table className='table-border table'>
            <thead>
              <tr>
                <th className='w-[60px]'>#</th>
                {headers?.map((header) => (
                  <th
                    key={header.key}
                    className={header?.className || ""}
                    onClick={
                      header?.sortable && handleSort
                        ? () => handleSort(header?.key)
                        : undefined
                    }
                  >
                    <span
                      className={`sort ${getSortClass ? getSortClass(header?.key) : ""}`}
                    >
                      {header?.label}
                      {header?.sortable && <span className='sort-icon'></span>}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedData?.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  <td>{rowIndex + 1 + (currentPage - 1) * itemsPerPage}</td>
                  {headers?.map((header) => (
                    <td key={header.key}>
                      {renderCell
                        ? renderCell(
                            header?.key,
                            row[header?.key],
                            row,
                          )
                        : row[header?.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          <SortingPagination
            currentPage={currentPage}
            totalItems={data?.length}
            itemsPerPage={itemsPerPage}
            setCurrentPage={setCurrentPage}
            setItemsPerPage={setItemsPerPage}
          />
        </div>
      </div>
    </div>
  );
};

export default Table;
