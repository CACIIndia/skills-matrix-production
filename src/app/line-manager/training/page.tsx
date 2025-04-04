"use client";

import React, { useState, useEffect, Suspense } from "react";
import useGetTrainingDataByUserId from "@/lib/hooks/Training/useGetTraining";
import { useAppContext } from "@/app/context/AppContext";
import { Skill, Training } from "@/lib/types/profile";
import useGetSkills from "@/lib/hooks/profile/useGetSkills";
import useGetUsersByLineManager from "@/lib/hooks/common/useGetUsersByLineManager";
import useGetTrainingStatus from "@/lib/hooks/Training/useGetTrainingStatus";
import { useTrainingHandlers } from "@/lib/hooks/Training/useTrainingHandlers";
import { FaTrash } from "react-icons/fa";
import Table from "@/components/common/Table/Table";
import TableSkeleton from "@/components/skeletons/TableSkeleton";
import classNames from "classnames";
import { getFormattedDate } from "@/components/common/Date-Handling/DateFormat";

// Lazy-loaded modal components
const CreateTraining = React.lazy(() =>
  import("@/components/views/Training/TrainingModal")
);
const EditTraining = React.lazy(() =>
  import("@/components/views/Training/EditTrainingModal")
);

type CategoryResponse = {
  category: string;
  skills: Skill[];
  categoryId?: string;
}[];

type Employee = {
  id: string;
  name: string;
  email: string;
  image: string;
};

const TrainingSchedule: React.FC = () => {
  const { profile } = useAppContext();
  const { data: training_data, refetch, isLoading } = useGetTrainingDataByUserId(
    profile?.id || ""
  );
  const { data: training_status } = useGetTrainingStatus();
  const { addTrainingData, handleDelete, handleEdit: handleTrainingEdit } =
    useTrainingHandlers(profile?.id || "", refetch);

  const { data: employeeData } = useGetUsersByLineManager(profile?.id);
  const { data: categoryskills } = useGetSkills();

  const [trainingData, setTrainingData] = useState<Training[]>([]);
  const [categories, setCategories] = useState<CategoryResponse>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editTrainingData, setEditTrainingData] = useState<Training | null>(
    null
  );
  const [trainingStatus, setTrainingStatus] = useState([]);
  const [editingId, setEditingId] = useState<string>("");

  useEffect(() => {
    setCategories(categoryskills || []);
    setEmployees(employeeData || []);
    setTrainingData(training_data || []);
    setTrainingStatus(training_status || []);
  }, [categoryskills, employeeData, training_data, training_status]);

  const handleEdit = (training: Training) => {
    setEditingId(training.id);
    setIsEditModalOpen(true);
    setEditTrainingData(training);
  };

  const headers = [
    {
      key: "employeeName",
      label: "EmployeeName",
      sortable: true,
      className: "w-[150px] cursor-pointer",
    },
    {
      key: "categoryName",
      label: "Category",
      sortable: true,
      className: "w-[150px] cursor-pointer",
    },
    {
      key: "skillName",
      label: "Skill",
      sortable: true,
      className: "w-[280px] cursor-pointer",
    },
    {
      key: "fromDate",
      label: "From Date",
      sortable: true,
      className: "min-w-[135px]",
    },
    {
      key: "tentativeEndDate",
      label: "Tentative End Date",
      sortable: true,
      className: "min-w-[135px]",
    },
    {
      key: "trainingStatus",
      label: "Status",
      sortable: true,
      className: "min-w-[135px]",
    },
    {
      key: "actions",
      label: "Actions",
      sortable: false,
      className: "min-w-[135px]",
    },
  ];

  const renderCell = (key: string, value: string, rowData: Training) => {
    switch (key) {
      case "fromDate":
      case "tentativeEndDate":
        return value ? getFormattedDate(value) : "N/A";
      case "trainingStatus":
        return (
          <span
            className={classNames("badge badge-sm", {
              "badge-success": rowData.trainingStatus === "Completed",
              "badge-warning": rowData.trainingStatus === "In Progress",
              "badge-danger": rowData.trainingStatus === "Discontinued",
            })}
          >
            {rowData.trainingStatus}
          </span>
        );
      case "actions":
        return (
          <div className="flex gap-3 text-xl">
            <button
              className="text-primary"
              onClick={() => handleEdit(rowData)}
              title="Edit"
            >
              <i className="ki-filled ki-notepad-edit" />
            </button>
            <button
              className="text-danger"
              onClick={() => handleDelete(rowData?.id)}
              title="Delete"
            >
              <FaTrash />
            </button>
          </div>
        );
      default:
        return value;
    }
  };

  return (
    <div>
      <div className="container-fixed">
        <div className="pb-7.5 flex flex-wrap items-center justify-between gap-5 lg:items-end">
          <div className="flex flex-col justify-center gap-2">
          <h3 className="text-lg text-[#6D6E82] ">
             Showing  {trainingData.length} team training 
            </h3>
          </div>
        </div>
      </div>

      {isLoading || !profile ? (
        <div className="container-fixed">
          <TableSkeleton
            cols={5}
            rows={1}
            tableHeader={false}
            isSearchable={true}
            addNewData={true}
          />
        </div>
      ) : (
        <div className="container-fixed grid">
          <Table
            headers={headers}
            isSearchable={true}
            addNewData={true}
            setIsAddModalOpen={setIsAddModalOpen}
            data={trainingData}
            renderCell={renderCell}
            isPaginated={true}
            noDataMessage="No trainings found"
            tableHeading="Training"
          />
        </div>
      )}

      <Suspense>
        {isAddModalOpen && (
          <CreateTraining
            isOpen={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}
            onSave={(newTrainingData) =>
              addTrainingData(newTrainingData, () => setIsAddModalOpen(false))
            }
            employeeData={employees}
            trainingStatus={trainingStatus}
            categoriesData={categories}
          />
        )}

        {isEditModalOpen && (
          <EditTraining
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            onSave={(editTrainingData) => {
              handleTrainingEdit(editingId, editTrainingData);
            }}
            categoriesData={categories}
            initialTrainingData={
              editTrainingData || {
                id: "",
                categoryId: "",
                categoryName: "",
                skillId: "",
                skillName: "",
                fromDate: null,
                tentativeEndDate: null,
                description: "",
                createdAt: null,
                updatedAt: null,
                createdById: "",
                statusId: "",
                employeeId: "",
                employeeName: "",
                employee: {
                  role: "",
                },
                trainingStatus: "",
              }
            }
            trainingStatus={trainingStatus}
            employeeData={employees}
          />
        )}
      </Suspense>
    </div>
  );
};

export default TrainingSchedule;
