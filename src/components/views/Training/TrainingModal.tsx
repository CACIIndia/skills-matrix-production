import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import skillsCategoryData from "@/app/maggi";

const apiResponse = skillsCategoryData;

const employeeData: Employee[] = [
  { id: "emp1", name: "John Doe" },
  { id: "emp2", name: "Jane Smith" },
  { id: "emp3", name: "Michael Johnson" },
  { id: "emp4", name: "Emily Davis" },
];

interface ApiResponse {
  category: string;
  skills: Skill[];
}

interface Skill {
  id: string;
  name: string;
}

interface Employee {
  id: string;
  name: string;
}

interface CreateTrainingProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newTrainingData: any) => void;
}

const CreateTraining = ({ isOpen, onClose, onSave }: CreateTrainingProps) => {
  const [categories, setCategories] = useState<ApiResponse[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [category, setCategory] = useState<string>("");
  const [skill, setSkill] = useState<string>("");
  const [fromDate, setFromDate] = useState<Date | null>(null); 
  const [toDate, setToDate] = useState<Date | null>(null); 
  const [description, setDescription] = useState<string>("");
  const [selectedEmployee, setSelectedEmployee] = useState<string>("");

  useEffect(() => {
    setCategories(apiResponse);
    setEmployees(employeeData);
  }, []);

  useEffect(() => {
    const selectedCategory = categories.find(
      (cat) => cat.category === category,
    );
    if (selectedCategory) {
      setSkills(selectedCategory.skills);
    } else {
      setSkills([]);
    }
  }, [category, categories]);

  const handleSave = () => {
    const newTrainingData = {
      category,
      skill,
      fromDate,
      toDate,
      description,
      employeeId: selectedEmployee,
    };

    onSave(newTrainingData);
    onClose(); // Close the modal after saving
  };

  return isOpen ? (
    <div
      className='fixed inset-0 z-[100] flex items-center justify-center bg-gray-700 bg-opacity-80'
      style={{ backdropFilter: "blur(4px)" }}
    >
      <div className='relative w-full max-w-lg rounded-lg bg-white p-6 shadow-xl'>
        <h2 className='mb-4 text-xl font-semibold'>Create Training Data</h2>
        <div className='max-h-[80vh] overflow-y-auto'>
          <div>
            <label className='mb-1 block text-sm font-medium'>Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className='w-full rounded-md border border-gray-300 p-2'
            >
              <option value=''>Select Category</option>
              {categories.map((cat) => (
                <option key={cat.category} value={cat.category}>
                  {cat.category}
                </option>
              ))}
            </select>
          </div>

          <div className='mt-4'>
            <label className='mb-1 block text-sm font-medium'>Skill</label>
            <select
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
              className='w-full rounded-md border border-gray-300 p-2'
              disabled={!category}
            >
              <option value=''>Select Skill</option>
              {skills.map((sk) => (
                <option key={sk.id} value={sk.id}>
                  {sk.name}
                </option>
              ))}
            </select>
          </div>

          <div className='mt-4'>
            <label className='mb-1 block text-sm font-medium'>From Date</label>
            <DatePicker
              selected={fromDate}
              onChange={(date: Date | null) => setFromDate(date)}
              className='w-full rounded-md border border-gray-300 p-2'
              dateFormat='yyyy/MM/dd'
              placeholderText='Select date'
            />
          </div>

          <div className='mt-4'>
            <label className='mb-1 block text-sm font-medium'>To Date</label>
            <DatePicker
              selected={toDate}
              onChange={(date: Date | null) => setToDate(date)}
              className='w-full rounded-md border border-gray-300 p-2'
              dateFormat='yyyy/MM/dd'
              placeholderText='Select date'
            />
          </div>

          <div className='mt-4'>
            <label className='mb-1 block text-sm font-medium'>
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className='w-full rounded-md border border-gray-300 p-2'
              rows={3}
            />
          </div>

          <div className='mt-4'>
            <label className='mb-1 block text-sm font-medium'>
              Select Employee
            </label>
            <select
              value={selectedEmployee}
              onChange={(e) => setSelectedEmployee(e.target.value)}
              className='mt-2 w-full rounded-md border border-gray-300 p-2'
            >
              <option value=''>Select Employee</option>
              {employees.map((emp) => (
                <option key={emp.id} value={emp.id}>
                  {emp.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className='mt-4 flex justify-end'>
          <button
            onClick={onClose}
            className='mr-2 px-4 py-2 text-gray-600 hover:text-gray-800'
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className='rounded bg-blue-500 px-4 py-2 text-white'
          >
            Save
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default CreateTraining;
