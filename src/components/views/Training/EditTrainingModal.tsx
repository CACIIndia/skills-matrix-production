import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Skill, Training } from "@/lib/types/profile";



export type TrainingStatus = {
  id: string;
  name: string;
};

interface EditTrainingProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedTrainingData: any) => void;
  categoriesData: CategoryResponse;
  employeeData: Employee[];
  trainingStatus: TrainingStatus[];
  initialTrainingData: Training;
}

type CategoryResponse = {
  category: string;
  categoryId?: string; 
  skills: Skill[];
}[];

type Employee = {
  id: string;
  name: string;
  email: string;
  image: string;
};

const EditTraining = ({
  isOpen,
  onClose,
  onSave,
  categoriesData,
  employeeData,
  trainingStatus,
  initialTrainingData,
}: EditTrainingProps) => {
  const [skills, setSkills] = useState<Skill[]>([]);
  console.log(
    initialTrainingData,
    "initialTrainingDatainitialTrainingDatainitialTrainingData",
  );

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      categoryId: initialTrainingData?.categoryId || "",
      categoryName: initialTrainingData?.categoryName || "",
      skillId: initialTrainingData?.skillId || "",
      skillName: initialTrainingData?.skillName || "",
      fromDate: initialTrainingData?.fromDate || null,
      toDate: initialTrainingData?.tentativeEndDate || null,
      description: initialTrainingData?.description || "",
      employeeId: initialTrainingData?.employeeId || "",
      employeeName: initialTrainingData?.employeeName || "",
      statusId: initialTrainingData?.statusId || "",
    },
    validationSchema: Yup.object({
      categoryName: Yup.string().required("Category is required"),
      categoryId: Yup.string().required("Category is required"),
      skillId: Yup.string().required("Skill is required"),
      fromDate: Yup.date().nullable().required("From Date is required"),
      toDate: Yup.date()
        .nullable()
        .min(Yup.ref("fromDate"), "To Date cannot be before From Date")
        .required("To Date is required"),
      description: Yup.string().required("Description is required"),
      employeeId: Yup.string().required("Employee selection is required"),
      employeeName: Yup.string().required("Employee Name is required"),
      statusId: Yup.string().required("Status is required"),
    }),
    onSubmit: (values) => {
      const selectedSkill = skills.find((sk) => sk.id === values.skillId);
      const selectedEmployee = employeeData.find(
        (emp) => emp.id === values.employeeId,
      );
      onSave({
        ...values,
        skillName: selectedSkill ? selectedSkill.name : "",
        categoryId: selectedSkill ? selectedSkill.categoryId : "",
        employeeName: selectedEmployee ? selectedEmployee.name : "",
      });
      onClose();
    },
  });

  console.log(formik, "formikformik");

  useEffect(() => {
    if (isOpen) {
      formik.resetForm();
    }
  }, [isOpen]);

  useEffect(() => {
    const selectedCategory = categoriesData.find(
      (cat) => cat.category === formik.values.categoryName,
    );
    setSkills(selectedCategory ? selectedCategory.skills : []);
    formik.setFieldValue("skillId", "");
    formik.setFieldValue("skillName", "");
  }, [formik.values.categoryName, categoriesData]);

  return isOpen ? (
    <div
      className='fixed inset-0 z-[100] flex items-center justify-center bg-gray-700 bg-opacity-80'
      style={{ backdropFilter: "blur(4px)" }}
    >
      <div className='relative w-full max-w-lg rounded-lg bg-white p-6 shadow-xl'>
        <h2 className='mb-4 text-xl font-semibold'>Edit Training Data</h2>
        <form
          onSubmit={formik.handleSubmit}
          className='max-h-[500px] overflow-y-auto'
        >
          <div>
            <label className='mb-1 block text-sm font-medium'>Category</label>
            <select
              name='categoryName'
              value={formik.values.categoryName}
              onChange={formik.handleChange}
              className='w-full rounded-md border border-gray-300 p-2'
            >
              <option value=''>Select Category</option>
              {categoriesData.map((cat) => (
                <option key={cat.category} value={cat.category}>
                  {cat.category}
                </option>
              ))}
            </select>
            {formik.touched.categoryName && formik.errors.categoryName ? (
              <div className='text-sm text-red-500'>
                {formik.errors.categoryName}
              </div>
            ) : null}
          </div>

          <div className='mt-4'>
            <label className='mb-1 block text-sm font-medium'>Skill</label>
            <select
              name='skillId'
              value={formik.values.skillId}
              onChange={formik.handleChange}
              className='w-full rounded-md border border-gray-300 p-2'
              disabled={!formik.values.categoryName}
            >
              <option value=''>Select Skill</option>
              {skills.map((sk) => (
                <option key={sk.id} value={sk.id}>
                  {sk.name}
                </option>
              ))}
            </select>
            {formik.touched.skillId && formik.errors.skillId ? (
              <div className='text-sm text-red-500'>
                {formik.errors.skillId}
              </div>
            ) : null}
          </div>

          <div className='mt-4'>
            <label className='mb-1 block text-sm font-medium'>From Date</label>
            <DatePicker
              selected={formik.values.fromDate}
              onChange={(date) => formik.setFieldValue("fromDate", date)}
              className='w-full rounded-md border border-gray-300 p-2'
              dateFormat='yyyy/MM/dd'
              placeholderText='Select date'
            />
            {formik.touched.fromDate && formik.errors.fromDate ? (
              <div className='text-sm text-red-500'>
                {typeof formik.errors.fromDate === "string"
                  ? formik.errors.fromDate
                  : ""}
              </div>
            ) : null}
          </div>

          <div className='mt-4'>
            <label className='mb-1 block text-sm font-medium'>To Date</label>
            <DatePicker
              selected={formik.values.toDate}
              onChange={(date) => formik.setFieldValue("toDate", date)}
              className='w-full rounded-md border border-gray-300 p-2'
              dateFormat='yyyy/MM/dd'
              placeholderText='Select date'
            />
            {formik.touched.toDate && formik.errors.toDate ? (
              <div className='text-sm text-red-500'>
                {typeof formik.errors.toDate === "string"
                  ? formik.errors.toDate
                  : ""}
              </div>
            ) : null}
          </div>

          <div className='mt-4'>
            <label className='mb-1 block text-sm font-medium'>
              Description
            </label>
            <textarea
              name='description'
              value={formik.values.description}
              onChange={formik.handleChange}
              className='w-full rounded-md border border-gray-300 p-2'
              rows={3}
            />
            {formik.touched.description && formik.errors.description ? (
              <div className='text-sm text-red-500'>
                {formik.errors.description}
              </div>
            ) : null}
          </div>

          <div className='mt-4'>
            <label className='mb-1 block text-sm font-medium'>
              Select Employee
            </label>
            <select
              name='employeeId'
              value={formik.values.employeeId}
              onChange={formik.handleChange}
              className='mt-2 w-full rounded-md border border-gray-300 p-2'
            >
              <option value=''>Select Employee</option>
              {employeeData.map((emp) => (
                <option key={emp.id} value={emp.id}>
                  {emp.name}
                </option>
              ))}
            </select>
            {formik.touched.employeeId && formik.errors.employeeId ? (
              <div className='text-sm text-red-500'>
                {formik.errors.employeeId}
              </div>
            ) : null}
          </div>

          {/* New dropdown for Status */}
          <div className='mt-4'>
            <label className='mb-1 block text-sm font-medium'>
              Training Status
            </label>
            <select
              name='statusId'
              value={formik.values.statusId}
              onChange={formik.handleChange}
              className='w-full rounded-md border border-gray-300 p-2'
            >
              <option value=''>Select Status</option>
              {trainingStatus.map((status) => (
                <option key={status.id} value={status.id}>
                  {status.name}
                </option>
              ))}
            </select>
            {formik.touched.statusId && formik.errors.statusId ? (
              <div className='text-sm text-red-500'>
                {formik.errors.statusId}
              </div>
            ) : null}
          </div>

          <div className='mt-6 flex justify-between'>
            <button
              type='button'
              onClick={onClose}
              className='rounded-md bg-gray-300 px-4 py-2'
            >
              Cancel
            </button>
            <button
              type='submit'
              className='rounded-md bg-blue-500 px-4 py-2 text-white'
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : null;
};

export default EditTraining;
