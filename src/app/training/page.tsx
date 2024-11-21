"use client";
import CreateTraining from "@/components/views/Training/TrainingModal";
import { useState, useEffect } from "react";
import { CiSquarePlus } from "react-icons/ci";
import useGetTrainingDataByUserId from "@/lib/hooks/Training/useGetTraining";
import { useAppContext } from "../context/AppContext";
import { Skill, Training } from "@/lib/types/profile";
import useGetSkills from "@/lib/hooks/profile/useGetSkills";
import useGetUsersByLineManager from "@/lib/hooks/common/useGetUsersByLineManager";
import useGetTrainingStatus from "@/lib/hooks/Training/useGetTrainingStatus";
import { useTrainingHandlers } from "@/lib/hooks/Training/useTrainingHandlers";
import { ref } from "yup";
import { FaTrash } from "react-icons/fa";
import EditTraining from "@/components/views/Training/EditTrainingModal";
import Button from "@/components/common/Button";
import { useFetchTrainingRecords } from "@/lib/hooks/Training/useFilterTraining";
import { BiReset } from "react-icons/bi";

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

const TrainingTable = () => {
  const { profile } = useAppContext();
  const { data: training_data, refetch } = useGetTrainingDataByUserId(
    profile?.id || "",
  );
  const handleError = (error: Error) => {
    console.error("Error fetching training records:", error);
    alert("Failed to fetch training records. Please try again.");
  };

  const { mutate: fetchTrainingRecords } = useFetchTrainingRecords(handleError);
  const { data: training_status } = useGetTrainingStatus();
  const {
    addTrainingData,
    handleDelete,
    handleEdit: handleTrainingEdit,
  } = useTrainingHandlers(profile?.id || "", refetch);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchTrainingRecords(
      {
        categoryName: selectedCategory,
        skillId: selectedSkill,
        fromDate: filterFromDate,
        tentativeEndDate: filtertoDate,
        createdById: profile.id,
        employeeId: filterEmployeeID,
      },
      {
        onSuccess: (data) => {
          console.log("Fetched training records:", data);
          setTrainingData(data);
        },
      },
    );
  };

  const { data: employeeData } = useGetUsersByLineManager(profile?.id);
  const { data: categoryskills } = useGetSkills();
  const [trainingData, setTrainingData] = useState<Training[]>([]);
  const [categories, setCategories] = useState<CategoryResponse>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedCategory, setselectedCategory] = useState("");
  const [selectedSkill, setselectedSkill] = useState("");
  const [filterFromDate, setFilterFromDate] = useState("");
  const [filtertoDate, setFilterToDate] = useState("");
  const [filterEmployeeID, setFilterEmployeeId] = useState("");

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editTrainingData, setEditTrainingData] = useState<Training | null>(
    null,
  );
  const [trainingStatus, setTrainingStatus] = useState([]);
  const [editingId, setEditingId] = useState<string>("");

  const convertToUTC = (localDate: string): string => {
    const [year, month, day] = localDate.split("-");
    const localDateObject = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day))); 
    return localDateObject.toISOString(); 
  };


  useEffect(() => {
    setCategories(categoryskills || []);
    setSkills([]);
    setEmployees(employeeData || []);
    setTrainingData(training_data || []);
    setTrainingStatus(training_status || []);
    console.log(training_status, "training_status");
  }, [categoryskills, employeeData, training_data, training_status]);

  const handleCategorySelect = (category: string) => {
    setselectedCategory(category);
    const selectedSkills = categoryskills?.find((item) => {
      return item.category === category;
    });

    console.log(selectedSkills, "selectedSkills");
    if (selectedSkills) {
      console.log("Matched skills:", selectedSkills.skills);
      setSkills(selectedSkills.skills);
      setselectedSkill("");
    } else {
      setSkills([]);
    }
  };

  const handleEdit = (Training: Training) => {
    setEditingId(Training.id);
    setIsEditModalOpen(true);
    setEditTrainingData(Training);
  };

  return (
    <div className='container-fixed'>
      <div className='mb-6 rounded-md bg-white py-6'>
        <h2 className='mb-4 text-lg font-semibold'>Filters</h2>

        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
          {/* Category Dropdown */}
          <div>
            <label className='block text-sm font-medium'>Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => handleCategorySelect(e.target.value)}
              className='mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm'
            >
              <option value=''>Select a Category</option>
              {categories.map((cat) => (
                <option key={cat.category} value={cat.category}>
                  {cat.category}
                </option>
              ))}
            </select>
          </div>

          {/* Skill Dropdown */}
          <div>
            <label className='block text-sm font-medium'>Skill</label>
            <select
              value={selectedSkill}
              onChange={(e) => setselectedSkill(e.target.value)}
              className='mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm'
              disabled={!selectedCategory}
            >
              <option value=''>Select a Skill</option>
              {skills.map((sk) => (
                <option key={sk.id} value={sk.id}>
                  {sk.name}
                </option>
              ))}
            </select>
          </div>

          {/* From Date */}
          <div>
            <label className='block text-sm font-medium'>From Date</label>
            <input
              type='date'
              value={filterFromDate}
              onChange={(e) => setFilterFromDate(e.target.value)}
              className='mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm'
            />
          </div>

          {/* To Date */}
          <div>
            <label className='block text-sm font-medium'>End Date</label>
            <input
              type='date'
              value={filtertoDate}
              onChange={(e) => setFilterToDate(e.target.value)}
              className='mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm'
            />
          </div>

          <div>
            <label className='block text-sm font-medium'>Select Employee</label>
            <select
              className='mt-1 w-full rounded-md border border-gray-300 p-2 shadow-sm'
              onChange={(e) => {
                setFilterEmployeeId(e.target.value);
              }}
            >
              <option value=''>Select an Employee</option>
              {employees?.map((emp) => (
                <option key={emp.id} value={emp.id}>
                  {emp.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Button
              onClick={handleSubmit}
              className='btn btn-primary aligin-center mt-4 flex w-[100px] items-center justify-center'
            >
              Filter
            </Button>
          </div>
        </div>

        <div className='mt-3 min-h-[200px] rounded-md bg-white shadow-md'>
          <div className='flex justify-between px-4 pt-1'>
            <h2 className='mb-4 text-lg font-semibold'>Training Data</h2>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className='btn btn-sm btn-icon btn-clear btn-primary'
            >
              <CiSquarePlus size={32} />
            </button>
          </div>

          <table className='min-w-full bg-white'>
            <thead>
              <tr>
                <th className='border-b p-4 text-left'>#</th>
                <th className='border-b p-4 text-left'>Employee Name</th>
                <th className='border-b p-4 text-left'>Category</th>
                <th className='border-b p-4 text-left'>Skill</th>
                <th className='border-b p-4 text-left'>From Date</th>
                <th className='border-b p-4 text-left'>Tentative End Date</th>
                <th className='border-b p-4 text-left'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {trainingData.length > 0 ? (
                trainingData.map((training: Training, index: number) => (
                  <tr key={training.id}>
                    <td className='border-b p-4'>{index + 1}</td>
                    <td className='border-b p-4'>{training.employeeName}</td>
                    <td className='border-b p-4'>{training.categoryName}</td>
                    <td className='border-b p-4'>{training.skillName}</td>
                    <td className='border-b p-4'>
                      {training.fromDate
                        ? new Date(training.fromDate).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td className='border-b p-4'>
                      {training.tentativeEndDate
                        ? new Date(
                            training.tentativeEndDate,
                          ).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td className='border-b p-4'>
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
                          onClick={() => handleDelete(training?.id || "")}
                          title='Delete'
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    className='min-h-[300px] border-b p-4 text-center'
                    colSpan={6}
                  >
                    No records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

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
          }
        }
        trainingStatus={trainingStatus}
        employeeData={employees}
      />
    </div>
  );
};

export default TrainingTable;
