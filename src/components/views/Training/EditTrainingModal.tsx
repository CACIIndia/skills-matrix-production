import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Skill, Training } from "@/lib/types/profile";
import CustomSelect from "@/components/form-controls/CustomSelect";

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

type Option = {
  value: string;
  label: string;
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
  const [employeeOptions, setEmployeeOptions] = useState<Option[]>([]);
  const [trainingStatusOptions, setTrainingStatusOptions] = useState<Option[]>([]);
  const [categoryOptions, setCategoryOptions] = useState<Option[]>([]);
  const [skillOptions, setSkillOptions] = useState<Option[]>([]);

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

  useEffect(() => {
    if (employeeData) {
      setEmployeeOptions(
        employeeData?.map((employee) => ({
          value: employee?.id,
          label: employee?.name,
        })),
      );
    }

    if (trainingStatus) {
      setTrainingStatusOptions(
        trainingStatus?.map((status) => ({
          value: status?.id,
          label: status?.name,
        })),
      );
    }

    if (categoriesData) {
      setCategoryOptions(
        categoriesData?.map((cat) => ({
          value: cat?.category,
          label: cat?.category,
        })),
      );
    }

    if (skills) {
      setSkillOptions(
        skills?.map((skill) => ({
          value: skill?.id,
          label: skill?.name,
        })),
      );
    }
  }, [categoriesData, skills, employeeData]);

  useEffect(() => {
    if (isOpen) {
      formik.resetForm();
    }
  }, [isOpen, formik.resetForm]);

  useEffect(() => {
    const selectedCategory = categoriesData.find(
      (cat) => cat.category === formik.values.categoryName,
    );
    setSkills(selectedCategory ? selectedCategory.skills : []);
  }, [formik.values.categoryName, categoriesData]);

  return isOpen ? (
    <div
      className='fixed inset-0 z-[100] flex items-center justify-center bg-black/30'
    >
      <div className='relative w-full max-w-lg rounded-lg bg-white p-6 shadow-xl'>
        <h2 className='mb-4 text-xl font-semibold'>Edit Training Data</h2>
        <form
          onSubmit={formik.handleSubmit}
          className='max-h-[500px] overflow-y-auto'
        >
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <label className='mb-1 block text-sm font-medium'>
                Select Employee<span className='text-red-500'>*</span>
              </label>
              <CustomSelect
                options={employeeOptions}
                name='employeeId'
                value={
                  employeeOptions?.find(
                    (opt) => opt?.value === formik?.values?.employeeId,
                  ) || null
                }
                onBlur={() => formik?.setFieldTouched("employeeId", true)}
                onChange={(selected) =>
                  formik.setFieldValue("employeeId", selected?.value || "")
                }
                placeholder='Select Employee'
              />
              {formik.touched.employeeId && formik.errors.employeeId ? (
                <div className='text-sm text-red-500'>
                  {formik.errors.employeeId}
                </div>
              ) : null}
            </div>

            <div>
              <label className='mb-1 block text-sm font-medium'>
                Training Status<span className='text-red-500'>*</span>
              </label>
              <CustomSelect
                  options={trainingStatusOptions}
                  name='statusId'
                  value={
                    trainingStatusOptions?.find(
                      (opt) => opt?.value === formik?.values?.statusId,
                    ) || null
                  }
                  onBlur={() => formik?.setFieldTouched("statusId", true)}
                  onChange={(selected) =>
                    formik.setFieldValue("statusId", selected?.value || "")
                  }
                  placeholder='Select Status'
                />
              {formik.touched.statusId && formik.errors.statusId ? (
                <div className='text-sm text-red-500'>
                  {formik.errors.statusId}
                </div>
              ) : null}
            </div>
          </div>
          <div className='mt-4 grid grid-cols-2 gap-4'>
            <div>
              <label className='mb-1 block text-sm font-medium'>Category<span className='text-red-500'>*</span></label>
              <CustomSelect
                options={categoryOptions}
                name='categoryName'
                value={
                  categoryOptions?.find(
                    (opt) => opt?.value === formik?.values?.categoryName,
                  ) || null
                }
                onBlur={() => formik?.setFieldTouched("categoryName", true)}
                onChange={(selected) =>
                  formik.setFieldValue("categoryName", selected?.value || "")
                }
                placeholder='Select category'
              />
              {formik.touched.categoryName && formik.errors.categoryName ? (
                <div className='text-sm text-red-500'>
                  {formik.errors.categoryName}
                </div>
              ) : null}
            </div>

            <div>
              <label className='mb-1 block text-sm font-medium'>Skill<span className='text-red-500'>*</span></label>
              <CustomSelect
                options={skillOptions}
                name='skillId'
                value={
                  skillOptions?.find(
                    (opt) => opt?.value === formik?.values?.skillId,
                  ) || null
                }
                onBlur={() => formik?.setFieldTouched("skillId", true)}
                onChange={(selected) =>
                  formik.setFieldValue("skillId", selected?.value || "")
                }
                placeholder='Select or search a skill'
              />
              {formik.touched.skillId && formik.errors.skillId ? (
                <div className='text-sm text-red-500'>
                  {formik.errors.skillId}
                </div>
              ) : null}
            </div>
          </div>
          <div className='mt-4 grid grid-cols-2 gap-4'>
            <div>
              <label className='mb-1 block text-sm font-medium'>
                From Date<span className='text-red-500'>*</span>
              </label>
              <DatePicker
                selected={formik.values.fromDate}
                onChange={(date) => formik.setFieldValue("fromDate", date)}
                className='w-full rounded-md border border-gray-300 p-2'
                dateFormat='dd-MM-yyyy'
                onKeyDown={(e) => e.preventDefault()}
                placeholderText='Select date'
                maxDate={new Date()}
              />
              {formik.touched.fromDate && formik.errors.fromDate ? (
                <div className='text-sm text-red-500'>
                  {typeof formik.errors.fromDate === "string"
                    ? formik.errors.fromDate
                    : ""}
                </div>
              ) : null}
            </div>

            <div>
              <label className='mb-1 block text-sm font-medium'>To Date<span className='text-red-500'>*</span></label>
              <DatePicker
                selected={formik.values.toDate}
                onChange={(date) => formik.setFieldValue("toDate", date)}
                className='w-full rounded-md border border-gray-300 p-2'
                dateFormat='dd-MM-yyyy'
                onKeyDown={(e) => e.preventDefault()}
                placeholderText='Select date'
                minDate={formik?.values?.fromDate || new Date()}
              />
              {formik.touched.toDate && formik.errors.toDate ? (
                <div className='text-sm text-red-500'>
                  {typeof formik.errors.toDate === "string"
                    ? formik.errors.toDate
                    : ""}
                </div>
              ) : null}
            </div>
          </div>

          <div className='grid grid-cols-1'>
            <div className='mt-4'>
              <label className='mb-1 block text-sm font-medium'>
                Description<span className='text-red-500'>*</span>
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
          </div>

          <div className='mt-6 flex justify-between'>
            <button
              type='button'
              onClick={onClose}
              className='rounded-md bg-gray-300 px-4 py-2'
            >
              Close
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
