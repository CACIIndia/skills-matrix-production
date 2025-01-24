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
  isFromSearchProfile?: boolean | false;
};
type Skill = {
  skill: {
    name: string;
  };
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
  isFromSearchProfile,
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
          {tableHeading && <h1 className='card-title py-1'>{tableHeading}</h1>}
          <div className='flex w-[100%] items-center justify-between'>
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
            {addNewData && (
              <h3 className='card-title'>
                <button
                  onClick={() =>
                    setIsAddModalOpen ? setIsAddModalOpen(true) : ""
                  }
                  className='btn btn-sm btn-icon btn-clear btn-primary'
                >
                  <CiSquarePlus size={32} />
                </button>
              </h3>
            )}
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
                    {isFromSearchProfile ? (
                      <>
                        <td>
                          <div className='flex items-center px-2'>
                            <div
                              onClick={() =>
                                router.push(`/profile/overview/${row.id}`)
                              }
                            >
                              <Image
                                src={row.image || defaultImage}
                                alt={row.name}
                                className='mr-4 cursor-pointer rounded-full'
                                width={40}
                                height={40}
                              />
                            </div>
                            <div className='w-[150px]'>
                              <div>{row.name}</div>
                              <div className='text-[10px] text-gray-600'>
                                {row.email}
                              </div>
                            </div>

                            <button
                              onClick={() => {
                                window.open(
                                  `https://teams.microsoft.com/l/chat/0/0?users=${row.email}`,
                                  "_blank",
                                );
                              }}
                              className='ml-[8px] rounded-[4px] bg-purple-800 p-[4px] text-white transition duration-300 hover:bg-purple-700'
                            >
                              <div className='flex items-center justify-center space-x-1'>
                                {/* <div>Chat</div>{" "} */}
                                <div>
                                  <BsMicrosoftTeams />
                                </div>
                              </div>
                            </button>
                            <button
                              onClick={() => {
                                window.location.href = `mailto:${row.email}`;
                              }}
                              className='ml-[8px] rounded-[4px] bg-blue-600 p-[4px] text-white transition duration-300 hover:bg-blue-700'
                            >
                              <div className='flex items-center justify-center space-x-1'>
                                {/* <div>Mail</div>{" "} */}
                                <div>
                                  <IoMailUnread />
                                </div>
                              </div>
                            </button>
                          </div>
                        </td>
                        {row.userSkills.length > 0 ? (
                          <td>
                            <div className='flex items-center'>
                              <div className='flex h-full items-center text-nowrap'>
                                {row.userSkills
                                  .slice(0, 2)
                                  .map((skill: Skill, ind: number) => {
                                    const level = skill.level;
                                    const { name } = SKILL_LEVELS[level];
                                    return (
                                      <div key={ind} className='mr-2'>
                                        <span
                                          className={classNames("badge badge-sm", {
                                            "badge-outline": level === 0,
                                            "badge-danger": level === 1,
                                            "badge-warning": level === 2,
                                            "badge-primary": level === 3,
                                            "badge-success": level === 4,
                                          })}
                                        >
                                          {name} | {skill.skill.name}
                                        </span>
                                      </div>
                                    );
                                  })}
                              </div>
                                  <div>
                              {row.userSkills.length > 2 && (
                                <button
                                  onClick={() =>
                                    window.open(
                                      `/profile/overview/${row.id}`,
                                      "_blank",
                                    )
                                  }
                                  className='text-nowrap bg-blue-600 h-[32px] w-[32px] rounded-[50%] text-white transition duration-300 hover:bg-blue-500'
                                >
                                  +{row.userSkills.length - 2} 
                                </button>
                              )}
                              </div>
                            </div>
                          </td>
                        ) : (
                          <td>No skills found!</td>
                        )}
                        {headers
                          .filter(
                            (header) =>
                              header.key !== "name" && header.key !== "skill",
                          ) // Exclude "name" from data rendering
                          .map((header) => (
                            <td key={header.key}>
                              {renderCell
                                ? renderCell(header.key, row[header.key], row)
                                : row[header.key]}
                            </td>
                          ))}
                      </>
                    ) : (
                      headers.map((header) => (
                        <td key={header.key}>
                          {renderCell
                            ? renderCell(header.key, row[header.key], row)
                            : row[header.key]}
                        </td>
                      ))
                    )}
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
