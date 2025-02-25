import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { CiSquarePlus } from "react-icons/ci";
import SortingPagination from "./SortingPagination";
import { tableSearch } from "@/lib/utils/tableSearch";
import Image from "next/image";
import defaultImage from "../../../../public/assets/media/avatars/default-image.png";
import { useRouter } from "next/navigation";
import { BsMicrosoftTeams } from "react-icons/bs";
import { IoMailUnread } from "react-icons/io5";
import classNames from "classnames";
import { SKILL_LEVELS } from "@/lib/constants/profile";
import EditIcon from "@/components/custom-icons/EditIcon";

type TableHeaders = {
  key: string;
  label: string;
  sortable?: boolean;
  className?: string;
};

type TableProps<T> = {
  tableHeading?: string | undefined;
  headers: TableHeaders[];
  isSearchable: boolean;
  addNewData: boolean;
  setIsAddModalOpen?: Dispatch<SetStateAction<boolean>>;
  data: any[];
  renderCell?: (key: string, value: string, rowData: any) => React.ReactNode; // Custom cell rendering
  isPaginated: boolean;
  noDataMessage?: string | undefined;
};

const Table = <T,>({
  tableHeading,
  headers,
  isSearchable,
  addNewData,
  setIsAddModalOpen,
  data,
  renderCell,
  isPaginated,
  noDataMessage,
}: TableProps<T>) => {
  const router = useRouter();
  const [filteredData, setFilteredData] = useState(data);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc" | null;
  }>({ key: "", direction: null });
  const dataToCheckForSearch = headers?.map((item) => item?.key);

  useEffect(() => {
    setFilteredData(data);
    setCurrentPage(1);
  }, [data]);

  const handleSearch = (query: string) => {
    const filteredData = tableSearch(query, data, dataToCheckForSearch);
    setFilteredData(filteredData);
    setCurrentPage(1);
  };

  const sortData = (data: any[]) => {
    if (!sortConfig.key || !sortConfig.direction) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key as keyof any] ?? null;
      const bValue = b[sortConfig.key as keyof any] ?? null;

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

  const paginatedData = sortData(filteredData)?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );
  const nonPaginatedData = sortData(filteredData);
  const finalData = isPaginated ? paginatedData : nonPaginatedData;

  const getSortClass = (key: string) => {
    if (sortConfig.key !== key) return "";
    return sortConfig.direction === "asc" ? "asc" : "desc";
  };

  const handleSort = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className='grid'>
      <div className='card card-grid h-full min-w-full'>
        <div className='card-header flex flex-col items-start'>
          <div className='flex w-[100%] items-center justify-between'>
            {tableHeading ? (
              <h1 className='card-title py-1 pl-[10px]'>{tableHeading}</h1>
            ): <div className="w-[32px]"></div>}
            <div className="flex gap-x-2 items-center">
              {isSearchable ? (
                <div className='input input-sm flex max-w-48 items-center'>
                  <i className='ki-filled ki-magnifier' />
                  <input
                    placeholder='Search..'
                    type='text'
                    className='ml-2'
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery ? setSearchQuery(e?.target?.value) : "";
                      handleSearch ? handleSearch(e?.target?.value) : "";
                    }}
                  />
                </div>
              ) : (
                <div className='max-w-48'></div>
              )}
              {addNewData ? (
                <h3 className='card-title'>
                  <button
                    onClick={() =>
                      setIsAddModalOpen ? setIsAddModalOpen(true) : ""
                    }
                    className='btn btn-sm btn-icon btn-clear btn-primary'
                  >
                    <CiSquarePlus size={32} />
                    {/* <i className='ki-filled ki-notepad-edit'></i> */}

                  

                  </button>
                </h3>
              ) : <div className="w-[32px]"></div>}
            </div>
          </div>
        </div>
        <div className='card-body overflow-x-auto'>
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
              {finalData?.length > 0 ? (
                finalData?.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    <td>{rowIndex + 1 + (currentPage - 1) * itemsPerPage}</td>

                    {headers.map((header) => (
                      <td key={header.key}>
                        {renderCell
                          ? renderCell(header.key, row[header.key], row)
                          : row[header.key]}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={headers.length + 1}
                    className='text-center text-gray-600'
                  >
                    {noDataMessage || "No data found"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {!searchQuery && isPaginated && (
            <SortingPagination
              currentPage={currentPage}
              totalItems={data?.length}
              itemsPerPage={itemsPerPage}
              setCurrentPage={setCurrentPage}
              setItemsPerPage={setItemsPerPage}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Table;
