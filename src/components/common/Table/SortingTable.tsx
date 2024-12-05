"use client";

import React, { useState, useEffect } from "react";

type SortingTableProps<T> = {
  data: T[];
  columns: Array<{
    key: keyof T;
    label: string;
    sortable?: boolean;
  }>;
  pagination?: boolean;
  search?: boolean;
  customActions?: (item: T) => React.ReactNode;
  paginationDetails?: {
    itemsPerPage: number;
    currentPage: number;
    onPageChange: (page: number) => void;
  };
};

const SortingTable = <T extends { id: string }>({
  data,
  columns,
  pagination = false,
  search = false,
  customActions,
  paginationDetails,
}: SortingTableProps<T>) => {
  const [tableData, setTableData] = useState<T[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T;
    direction: "asc" | "desc" | null;
  }>({ key: "" as keyof T, direction: null });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setTableData(
      data.filter((item) =>
        JSON.stringify(item).toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  const handleSort = (key: keyof T) => {
    const direction = sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
    setSortConfig({ key, direction });
    setTableData((prevData) =>
      [...prevData].sort((a, b) => {
        const aValue = a[key] ?? "";
        const bValue = b[key] ?? "";
        return direction === "asc"
          ? String(aValue).localeCompare(String(bValue))
          : String(bValue).localeCompare(String(aValue));
      })
    );
  };

  useEffect(() => {
    setTableData(data);
  }, [data]);

  const paginatedData = pagination
    ? tableData.slice(
        (paginationDetails?.currentPage - 1) * paginationDetails?.itemsPerPage,
        paginationDetails?.currentPage * paginationDetails?.itemsPerPage
      )
    : tableData;

  const totalPages = Math.ceil(tableData.length / (paginationDetails?.itemsPerPage || 5));

  return (
    <div className="container-fixed grid">
      <div className="card card-grid">
        <div className="card-header flex items-center justify-between">
          {search && (
            <div className="input input-sm flex max-w-48 items-center">
              <i className="ki-filled ki-magnifier" />
              <input
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="ml-2"
              />
            </div>
          )}
        </div>
        <div className="card-body">
          <div className="scrollable-x-auto">
            <table className="table-border table">
              <thead>
                <tr>
                  <th className="cursor-pointer">#</th> {/* Added # column */}
                  {columns.map((col) => (
                    <th
                      key={String(col.key)}
                      onClick={() => col.sortable && handleSort(col.key)}
                      className={`cursor-pointer ${col.sortable ? 'sortable' : ''}`}
                    >
                      <span>{col.label}</span>
                    </th>
                  ))}
                  {customActions && <th>Actions</th>}
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((item, index) => (
                  <tr key={item.id}>
                    <td className="text-center">{(paginationDetails?.currentPage - 1) * paginationDetails?.itemsPerPage + index + 1}</td> {/* Dynamic Row Number */}
                    {columns.map((col) => (
                      <td key={String(col.key)}>{String(item[col.key])}</td>
                    ))}
                    {customActions && (
                      <td>{customActions(item)}</td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {pagination && (
            <div className="card-footer flex justify-between">
              <button
                onClick={() => paginationDetails?.onPageChange(Math.max(paginationDetails?.currentPage - 1, 1))}
                disabled={paginationDetails?.currentPage === 1}
              >
                Previous
              </button>
              <span>
                Page {paginationDetails?.currentPage} of {totalPages}
              </span>
              <button
                onClick={() => paginationDetails?.onPageChange(Math.min(paginationDetails?.currentPage + 1, totalPages))}
                disabled={paginationDetails?.currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SortingTable;
