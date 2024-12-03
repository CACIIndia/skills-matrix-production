"use client";
import { useState, useEffect } from "react";
import useGetTrainingDataByUserId from "@/lib/hooks/Training/useGetTraining";
import { useAppContext } from "@/app/context/AppContext";
import { Skill, Training } from "@/lib/types/profile";
import useGetSkills from "@/lib/hooks/profile/useGetSkills";
import useGetUsersByLineManager from "@/lib/hooks/common/useGetUsersByLineManager";
import useGetTrainingStatus from "@/lib/hooks/Training/useGetTrainingStatus";
import { useTrainingHandlers } from "@/lib/hooks/Training/useTrainingHandlers";
import { FaTrash } from "react-icons/fa";
import { CiSquarePlus } from "react-icons/ci";
import CreateTraining from "@/components/views/Training/TrainingModal";
import EditTraining from "@/components/views/Training/EditTrainingModal";
import { tableSearch } from "@/lib/utils/tableSearch";

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
  const { profile, isLoading } = useAppContext();
   console.log(profile,"profile");
  // if (isLoading || !profile) {
  //   return <div>Loading...</div>;
  // }

  const { data: training_data, refetch } = useGetTrainingDataByUserId(
    profile?.id || "",
  );

  const { data: training_status } = useGetTrainingStatus();
  const {
    addTrainingData,
    handleDelete,
    handleEdit: handleTrainingEdit,
  } = useTrainingHandlers(profile?.id || "", refetch);

  const { data: employeeData } = useGetUsersByLineManager(profile?.id);
  const { data: categoryskills } = useGetSkills();

  const [trainingData, setTrainingData] = useState<Training[]>([]);
  const [initialTrainingData, setInitialTrainingData] = useState<Training[]>(
    [],
  );
  const [categories, setCategories] = useState<CategoryResponse>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editTrainingData, setEditTrainingData] = useState<Training | null>(
    null,
  );
  const [trainingStatus, setTrainingStatus] = useState([]);
  const [editingId, setEditingId] = useState<string>("");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc" | null;
  }>({ key: "", direction: null });

  const sortData = (data: Training[]) => {
    if (!sortConfig.key || !sortConfig.direction) return data;
  
    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key as keyof Training] ?? null;
      const bValue = b[sortConfig.key as keyof Training] ?? null;
  
     
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
  
  const handleSort = (key: keyof Training) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  useEffect(() => {
    setCategories(categoryskills || []);
    setEmployees(employeeData || []);
    setTrainingData(training_data || []);
    setInitialTrainingData(training_data || []);
    setTrainingStatus(training_status || []);
  }, [categoryskills, employeeData, training_data, training_status]);

  const handleEdit = (training: Training) => {
    setEditingId(training.id);
    setIsEditModalOpen(true);
    setEditTrainingData(training);
  };

  const paginatedData = sortData(trainingData).slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const totalPages = Math.ceil(trainingData.length / itemsPerPage);

  const handleTrainingSearch = (query: string) => {
    const filteredData = tableSearch(query, initialTrainingData, [
      "employeeName",
      "categoryName",
      "skillName",
      "fromDate",
      "tentativeEndDate",
    ]);
    setTrainingData(filteredData);
  };

 
  const getSortClass = (key: string) => {
    if (sortConfig.key !== key) return ""; 
    return sortConfig.direction === "asc" ? "asc" : "desc";
  };
  
  return (
    <div>
      <div className='container-fixed'>
        <div className='pb-7.5 flex flex-wrap items-center justify-between gap-5 lg:items-end'>
          <div className='flex flex-col justify-center gap-2'>
            <h1 className='text-xl font-semibold leading-none text-gray-900'>
              Training - Schedule
            </h1>
            <div className='flex items-center gap-2 text-sm font-medium text-gray-600'>
              Some content goes here..
            </div>
          </div>
        </div>
      </div>

      <div className='container-fixed grid'>
        <div className='card card-grid h-full min-w-full'>
          <div className='card-header flex items-center justify-between'>
            <div className='input input-sm flex max-w-48 items-center'>
              <i className='ki-filled ki-magnifier' />
              <input
                placeholder='Search..'
                type='text'
                className='ml-2'
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  handleTrainingSearch(e.target.value);
                }}
              />
            </div>
            <h3 className='card-title'>
              <button
                onClick={() => setIsAddModalOpen(true)}
                className='btn btn-sm btn-icon btn-clear btn-primary'
              >
                <CiSquarePlus size={32} />
              </button>
            </h3>
          </div>

          <div className='card-body'>
            <div data-datatable='true' data-datatable-page-size='5'>
              <div className='scrollable-x-auto'>
                <table
                  className='table-border table'
                  data-datatable-table='true'
                >
                  <thead>
                    <tr>
                      <th>#</th>
                      <th
                        className='cursor-pointer'
                        onClick={() => handleSort("employeeName")}
                      >
                        <span
                          className={`sort ${getSortClass("employeeName")}`}
                        >
                          <span className='sort-label'>Team</span>
                          <span className='sort-icon'></span>
                        </span>
                      </th>
                      <th
                        className='cursor-pointer'
                        onClick={() => handleSort("categoryName")}
                      >
                        <span
                          className={`sort ${getSortClass("categoryName")}`}
                        >
                          <span className='sort-label'>Category</span>
                          <span className='sort-icon'></span>
                        </span>
                      </th>
                      <th
                        className='cursor-pointer'
                        onClick={() => handleSort("skillName")}
                      >
                        <span className={`sort ${getSortClass("skillName")}`}>
                          <span className='sort-label'>Skill</span>
                          <span className='sort-icon'></span>
                        </span>
                      </th>
                      <th
                        className='cursor-pointer'
                        onClick={() => handleSort("fromDate")}
                      >
                        <span className={`sort ${getSortClass("fromDate")}`}>
                          <span className='sort-label'>From Date</span>
                          <span className='sort-icon'></span>
                        </span>
                      </th>
                      <th
                        className='cursor-pointer'
                        onClick={() => handleSort("tentativeEndDate")}
                      >
                        <span
                          className={`sort ${getSortClass("tentativeEndDate")}`}
                        >
                          <span className='sort-label'>Tentative End Date</span>
                          <span className='sort-icon'></span>
                        </span>
                      </th>
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {paginatedData.map((training, index) => (
                      <tr key={training.id}>
                        <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                        <td>
                          <div className='flex flex-col gap-2'>
                            <a
                              className='text-sm font-semibold leading-none text-gray-900 hover:text-primary'
                              href='#'
                            >
                              {training.employeeName}
                            </a>
                            <span className='text-2sm leading-3 text-gray-600'>
                            {training.employee.role}
                            </span>
                          </div>
                        </td>
                        <td>{training.categoryName}</td>
                        <td>{training.skillName}</td>
                        <td>
                          {training.fromDate
                            ? new Date(training.fromDate).toLocaleDateString()
                            : "N/A"}
                        </td>
                        <td>
                          {training.tentativeEndDate
                            ? new Date(
                                training.tentativeEndDate,
                              ).toLocaleDateString()
                            : "N/A"}
                        </td>
                        <td>
                          <div className='flex gap-3'>
                            <button
                              className='text-primary'
                              onClick={() => handleEdit(training)}
                              title='Edit'
                            >
                              <i className='ki-filled ki-notepad-edit' />
                            </button>
                            <button
                              className='text-danger'
                              onClick={() => handleDelete(training.id)}
                              title='Delete'
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className='card-footer text-2sm flex-col justify-center gap-5 font-medium text-gray-600 md:flex-row md:justify-between'>
                <div className='order-2 flex items-center gap-5 md:order-1'>
                  <span>Rows per page:</span>
                  <select
                    value={itemsPerPage}
                    onChange={(e) => setItemsPerPage(Number(e.target.value))}
                  >
                    <option value='2'>2</option>
                    <option value='5'>5</option>
                    <option value='10'>10</option>
                    <option value='15'>15</option>
                  </select>
                </div>
                <div className='order-1 flex items-center justify-between gap-6 md:order-2'>
                  <span>
                    {`${(currentPage - 1) * itemsPerPage + 1}-${Math.min(
                      currentPage * itemsPerPage,
                      trainingData.length,
                    )} of ${trainingData.length}`}
                  </span>
                  <div className='flex gap-3'>
                    <button
                      className='btn btn-sm btn-icon btn-clear btn-primary'
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                      disabled={currentPage === 1}
                    >
                      &lt;
                    </button>
                    <button
                      className='btn btn-sm btn-icon btn-clear btn-primary'
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                      disabled={currentPage === totalPages}
                    >
                      &gt;
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      
      </div>

     

      {/* Modals */}
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
            }
          }
        }
        trainingStatus={trainingStatus}
        employeeData={employees}
      />
    </div>
  );
};

export default TrainingSchedule;
