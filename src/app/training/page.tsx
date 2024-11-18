"use client";
import CreateTraining from "@/components/views/Training/TrainingModal";
import { useState, useEffect } from "react";
import { CiSquarePlus } from "react-icons/ci";
import skillsCategoryData from "@/app/maggi";
import useGetTrainingDataByUserId from "@/lib/hooks/Training/useGetTraining";
import { useAppContext } from "../context/AppContext";
import { Training } from "@/lib/types/profile";

const apiResponse = skillsCategoryData;

const employeeData: Employee[] = [
  { id: "emp1", name: "John Doe" },
  { id: "emp2", name: "Jane Smith" },
  { id: "emp3", name: "Michael Johnson" },
  { id: "emp4", name: "Emily Davis" },
];

type SkillCategory = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  createdById: string;
  status: string;
};

type Skill = {
  id: string;
  name: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  skillCategory: SkillCategory;
};

type ApiResponse = {
  category: string;
  skills: Skill[];
}[];

type Employee = {
  id: string;
  name: string;
};

const TrainingTable = () => {
  const { profile } = useAppContext();
  const { data: training_data } = useGetTrainingDataByUserId(profile?.id || "");
  const [trainingData, setTrainingData] = useState<Training[]>([]);

  useEffect(() => {
    setTrainingData(training_data || []);
  }, [training_data]);

  const [categories, setCategories] = useState<ApiResponse>([]);
  const [skills, setSkills] = useState<Skill[]>([]);

  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);

  const [selectedCategory, setselectedCategory] = useState("");
  const [skill, setSkill] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [employeeSearch, setEmployeeSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchCategoriesAndSkills = async () => {
      // Replace these with API calls

      const employeeData: Employee[] = [
        { id: "emp1", name: "John Doe" },
        { id: "emp2", name: "Jane Smith" },
        { id: "emp3", name: "Michael Johnson" },
        { id: "emp4", name: "Emily Davis" },
      ];

      setCategories(apiResponse);
      setSkills([]);
      setEmployees(employeeData);
    };

    fetchCategoriesAndSkills();
  }, []);

  const handleCategorySelect = (category: string) => {
    setselectedCategory(category);

    const selectedSkills = apiResponse.find((item) => {
      return item.category === category;
    });

    if (selectedSkills) {
      console.log("Matched skills:", selectedSkills.skills);
      setSkills(selectedSkills.skills);
      setSkill("");
    } else {
      setSkills([]);
    }
  };
  // Filter employees based on search query
  useEffect(() => {
    setFilteredEmployees(
      employees.filter((employee) =>
        employee.name.toLowerCase().includes(employeeSearch.toLowerCase()),
      ),
    );
  }, [employeeSearch, employees]);

  return (
    <div className='container-fixed'>
      <div className='mb-6 rounded-md bg-white py-6'>
        <h2 className='mb-4 text-lg font-semibold'>Filters</h2>

        {/* Filters*/}
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
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
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
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className='mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm'
            />
          </div>

          {/* To Date */}
          <div>
            <label className='block text-sm font-medium'>End Date</label>
            <input
              type='date'
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className='mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm'
            />
          </div>

          <div>
            <label className='block text-sm font-medium'>select Employee</label>
            <select className='mt-1 w-full rounded-md border border-gray-300 p-2 shadow-sm'>
              <option value=''>Select an Employee</option>
              {filteredEmployees.map((emp) => (
                <option key={emp.id} value={emp.id}>
                  {emp.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className='mt-3 min-h-[200px] rounded-md bg-white shadow-md'>
          <div className='flex justify-between px-4 pt-1'>
            <h2 className='mb-4 text-lg font-semibold'>Training Data</h2>
            <button
              onClick={() => setIsModalOpen(true)}
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

      {/* Training Modal */}
      <CreateTraining
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={(newTrainingData) => console.log(newTrainingData)}
      />
    </div>
  );
};

export default TrainingTable;
