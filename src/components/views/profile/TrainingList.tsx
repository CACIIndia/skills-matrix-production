"use client";

import { useState } from "react";
import classNames from "classnames";

type Training = {
  id: string;
  categoryName: string;
  skillName: string;
  fromDate: string;
  tentativeEndDate: string;
  status:{name:string};
};

type TrainingListProps = {
  trainings: Training[];
};

const TrainingList = ({ trainings }: TrainingListProps) => {

 
  const [sortColumn, setSortColumn] = useState("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleSort = (column: string) => {
    const newDirection = sortColumn === column && sortDirection === "asc" ? "desc" : "asc";
    setSortColumn(column);
    setSortDirection(newDirection);
  };

  const sortedTrainings = [...trainings].sort((a, b) => {
    if (!sortColumn) return 0;
    const compareA = a[sortColumn as keyof Training];
    const compareB = b[sortColumn as keyof Training];

    if (compareA < compareB) return sortDirection === "asc" ? -1 : 1;
    if (compareA > compareB) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  
  const getSortClass = (column: string) => (sortColumn === column ? `${sortDirection}` : "");


  return (
    <div>
    
      <div className="card">
      <div className="card-header">
        <h3 className="card-title">Training List</h3>
      </div>
      <div className="">
      <div className="scrollable-x-auto">
        <table className="table-border table" data-datatable-table="true">
          <thead>
            <tr>
              <th>#</th>
              <th
                className="cursor-pointer"
                onClick={() => handleSort("categoryName")}
              >
                <span className={`sort ${getSortClass("categoryName")}`}>
                  <span className="sort-label">Category</span>
                  <span className="sort-icon"></span>
                </span>
              </th>
              <th
                className="cursor-pointer"
                onClick={() => handleSort("skillName")}
              >
                <span className={`sort ${getSortClass("skillName")}`}>
                  <span className="sort-label">Skill</span>
                  <span className="sort-icon"></span>
                </span>
              </th>
              <th
                className="cursor-pointer"
                onClick={() => handleSort("fromDate")}
              >
                <span className={`sort ${getSortClass("fromDate")}`}>
                  <span className="sort-label">From Date</span>
                  <span className="sort-icon"></span>
                </span>
              </th>
              <th
                className="cursor-pointer"
                onClick={() => handleSort("tentativeEndDate")}
              >
                <span className={`sort ${getSortClass("tentativeEndDate")}`}>
                  <span className="sort-label">Tentative End Date</span>
                  <span className="sort-icon"></span>
                </span>
              </th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {sortedTrainings.length > 0 ? (
              sortedTrainings.map((training, index) => (
                <tr key={training.id}>
                  <td>{index + 1}</td>
                  <td>{training.categoryName}</td>
                  <td>{training.skillName}</td>
                  <td>{new Date(training.fromDate).toLocaleDateString()}</td>
                  <td>
                    {training.tentativeEndDate
                      ? new Date(training.tentativeEndDate).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td>
                    <span
                      className={classNames("badge badge-sm", {
                        "badge-success": training.status.name === "Completed",
                        "badge-warning": training.status.name === "In Progress",
                        "badge-danger": training.status.name === "Discontinued",
                      })}
                    >
                      {training.status.name}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center text-gray-600">
                  No training sessions found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      </div>

      </div>
     

      
    </div>
  );
};

export default TrainingList;
