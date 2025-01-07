"use client";

import Table from "@/components/common/Table/Table";

type Training = {
  id: string;
  categoryName: string;
  skillName: string;
  fromDate: string;
  tentativeEndDate: string;
  status: { name: string };
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
      key: "statusId",
      label: "Status",
      sortable: false,
      className: "cursor-pointer",
    },
  ];

  const renderCell = (key: string, value: string, rowData: Training) => {
    switch (key) {
      case "fromDate":
        return value ? new Date(value).toLocaleDateString() : "N/A";
      case "tentativeEndDate":
        return value ? new Date(value).toLocaleDateString() : "N/A";
      default:
        return value;
    }
  };

  return (
    <>
      <Table
        headers={headers}
        tableHeading="Training List"
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
