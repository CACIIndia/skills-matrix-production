"use client";

import Table from "@/components/common/Table/Table";
import classNames from "classnames";

type Training = {
  id: string;
  categoryName: string;
  skillName: string;
  fromDate: string;
  tentativeEndDate: string;
  trainingStatus: { name: string };
};

type TrainingListProps = {
  trainings: Training[];
};

const TrainingList = ({ trainings }: TrainingListProps) => {

  const headers = [
    {
      key: "categoryName",
      label: "Category",
      sortable: true,
      className: "cursor-pointer",
    },
    {
      key: "skillName",
      label: "Skill",
      sortable: true,
      className: "cursor-pointer",
    },
    {
      key: "fromDate",
      label: "From Date",
      sortable: true,
      className: "cursor-pointer",
    },
    {
      key: "tentativeEndDate",
      label: "Tentative End Date",
      sortable: true,
      className: "cursor-pointer",
    },
     {
      key: "trainingStatus",
      label: "Status",
      sortable: false,
      className: "cursor-pointer ",
    },
  ];

  const renderCell = (key: string, value: string, rowData: Training) => {
    switch (key) {
      case "fromDate":
        return value ? new Date(value).toLocaleDateString() : "N/A";
      case "tentativeEndDate":
        return value ? new Date(value).toLocaleDateString() : "N/A";
        case "trainingStatus":
          return  <span
          className={classNames("badge badge-sm", {
            "badge-success": rowData.trainingStatus.name === "Completed",
            "badge-warning": rowData.trainingStatus.name === "In Progress",
            "badge-danger": rowData.trainingStatus.name === "Discontinued",
          })}
        >
          {rowData.trainingStatus.name}
        </span> ;
      default:
        return value;
    }
  };

  return (
    <>
      <Table
        headers={headers}
        tableHeading="Training Overview"
        isSearchable={true}
        addNewData={false}
        data={trainings}
        renderCell={renderCell}
        isPaginated={true}
        noDataMessage="No trainings found"
      />
    </>
  );
};

export default TrainingList;
