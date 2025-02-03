import { Certificate, SkillCategory, Training } from "@/lib/types/profile";
import React, { useEffect } from "react";
import DatePicker from "react-datepicker";
import { useFormik } from "formik";
import * as Yup from "yup";

type AddCertificateModalProps = {
  isAddModalOpen: boolean;
  handleToggleAddModal: () => void;
  handleUploadCertificate: (certificate: Certificate) => void;
  categoryskills: SkillCategory[];
  trainingData: Training[];
};

const AddCertificateModal: React.FC<AddCertificateModalProps> = ({
  isAddModalOpen,
  handleToggleAddModal,
  handleUploadCertificate,
  categoryskills,
  trainingData,
}) => {
  // Formik form handling
  const formik = useFormik({
    initialValues: {
      name: "",
      certificateFile: null as File | null,
      obtainedDate: null,
      expiryDate: null,
      description: "",
      categoryId: "",
      categoryName: "",
      training: "",
      isTrainingLinked: false,
      trainingRecordId: "",
      trainingRecordName: "",
      trainingRecordCategoryId: "",
      trainingRecordCategoryName: "",
      trainingRecordSkillId: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Certificate Name is required"),
      certificateFile: Yup.mixed().required("Certificate file is required"),
      categoryId: Yup.string().required("Category is required"),
      obtainedDate: Yup.date()
        .typeError("Please enter a valid date")
        .required("ObtainedDate is required"),
      expiryDate: Yup.date()
        .typeError("Please enter a valid date")
        .required("ExpiryDate is required"),
      isTrainingLinked: Yup.boolean().default(false),
      trainingRecordId: Yup.string().when("isTrainingLinked", {
        is: true,
        then: (schema) => schema.required("Training Record ID is required"),
        otherwise: (schema) => schema.notRequired(),
      }),
      trainingRecordName: Yup.string().when("isTrainingLinked", {
        is: true,
        then: (schema) => schema.required("Training Record Name is required"),
        otherwise: (schema) => schema.notRequired(),
      }),
      trainingRecordCategoryId: Yup.string().when("isTrainingLinked", {
        is: true,
        then: (schema) =>
          schema.required("Training Record Category ID is required"),
        otherwise: (schema) => schema.notRequired(),
      }),
      trainingRecordCategoryName: Yup.string().when("isTrainingLinked", {
        is: true,
        then: (schema) =>
          schema.required("Training Record Category Name is required"),
        otherwise: (schema) => schema.notRequired(),
      }),
      trainingRecordSkillId: Yup.string().when("isTrainingLinked", {
        is: true,
        then: (schema) =>
          schema.required("Training Record Skill ID is required"),
        otherwise: (schema) => schema.notRequired(),
      }),
    }),

    onSubmit: (values) => {
      handleUploadCertificate(values);
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      formik.setFieldValue("certificateFile", file);
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategoryId = e.target.value;

    const selectedCategory = categoryskills.find(
      (category) => category.id === selectedCategoryId,
    );

    if (selectedCategory) {
      formik.setFieldValue("categoryId", selectedCategory.id);
      formik.setFieldValue("categoryName", selectedCategory.name);
    }
  };

  return (
    isAddModalOpen && (
      <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
        <div className='w-full rounded-md bg-white p-6 shadow-lg sm:w-[600px]'>
          <div className='flex items-center justify-between'>
            <h3 className='mb-4 text-lg font-semibold'>Add New Certificate</h3>
            {trainingData.length > 0 && (
              <div className='flex items-center justify-end'>
                <label
                  htmlFor='certificateToggle'
                  className='mr-2 text-sm font-medium text-gray-700'
                >
                  Linked Training
                </label>
                <div className='relative inline-block w-11'>
                  <input
                    type='checkbox'
                    id='certificateToggle'
                    name='isTrainingLinked '
                    checked={formik.values.isTrainingLinked}
                    onChange={() =>
                      formik.setFieldValue(
                        "isTrainingLinked ",
                        !formik.values.isTrainingLinked,
                      )
                    }
                    className='sr-only' // Hidden input element
                  />
                  <div
                    className={`block h-6 w-full cursor-pointer rounded-full ${
                      formik.values.isTrainingLinked
                        ? "bg-green-500"
                        : "bg-gray-300"
                    }`}
                    onClick={() =>
                      formik.setFieldValue(
                        "isTrainingLinked",
                        !formik.values.isTrainingLinked,
                      )
                    } // Manually toggle on click
                  ></div>
                  <div
                    className={`absolute left-1 top-1 h-4 w-4 cursor-pointer rounded-full bg-white transition-transform ${
                      formik.values.isTrainingLinked
                        ? "translate-x-5"
                        : "translate-x-0"
                    }`}
                    onClick={() =>
                      formik.setFieldValue(
                        "isTrainingLinked",
                        !formik.values.isTrainingLinked,
                      )
                    }
                  ></div>
                </div>
              </div>
            )}
          </div>

          <form onSubmit={formik.handleSubmit} className='space-y-4'>
            {formik.values.isTrainingLinked && (
              <div className='flex flex-col sm:flex-row sm:gap-4'>
                <label
                  htmlFor='training'
                  className='mb-1 block text-sm font-medium text-gray-700 sm:w-1/3'
                >
                  Training List
                </label>
                <div className='flex-1'>
                  <select
                    id='training'
                    name='training'
                    value={formik.values.training}
                    onChange={(e) => {
                      const selectedTrainingId = e.target.value;
                      formik.setFieldValue("training", selectedTrainingId);
                      const selectedTraining = trainingData.find(
                        (training) => training.id === selectedTrainingId,
                      );
                      if (selectedTraining) {
                        formik.setFieldValue(
                          "trainingRecordId",
                          selectedTraining.id,
                        );

                        formik.setFieldValue(
                          "skills",
                          selectedTraining.skillName,
                        );
                        formik.setFieldValue(
                          "categoryId",
                          selectedTraining.categoryId,
                        );
                        formik.setFieldValue(
                          "trainingRecordCategoryId",
                          selectedTraining.categoryId,
                        );

                        formik.setFieldValue(
                          "categoryName",
                          selectedTraining.categoryName,
                        );
                        formik.setFieldValue(
                          "trainingRecordCategoryName",
                          selectedTraining.categoryName,
                        );
                        formik.setFieldValue(
                          "trainingRecordName",
                          selectedTraining.skillName,
                        );
                        formik.setFieldValue(
                          "trainingRecordSkillId",
                          selectedTraining.skillId,
                        );
                      }
                    }}
                    className='w-full border p-2'
                  >
                    <option value='' disabled>
                      Select a training
                    </option>
                    {trainingData.map((training) => (
                      <option key={training.id} value={training.id}>
                        {training.skillName} - {training.categoryName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
            {/* Category Dropdown */}
            <div className='flex flex-col sm:flex-row sm:gap-4'>
              <label className='mb-1 block text-sm font-medium text-gray-700 sm:w-1/3'>
                Category
              </label>
              <div className='flex-1'>
                <select
                  name='categoryId'
                  value={formik.values.categoryId}
                  onChange={handleCategoryChange}
                  onBlur={formik.handleBlur}
                  className='w-full border p-2'
                >
                  <option value='' disabled>
                    Select a category
                  </option>
                  {categoryskills.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {formik.touched.categoryId && formik.errors.categoryId && (
                  <p className='text-sm text-red-500'>
                    {formik.errors.categoryId}
                  </p>
                )}
              </div>
            </div>

            {/* Certificate Name */}
            <div className='flex flex-col sm:flex-row sm:gap-4'>
              <label className='mb-1 block text-sm font-medium text-gray-700 sm:w-1/3'>
                Certificate Name
              </label>
              <div className='flex-1'>
                <input
                  type='text'
                  name='name'
                  placeholder='Enter certificate name'
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className='w-full border p-2'
                />
                {formik.touched.name && formik.errors.name && (
                  <p className='text-sm text-red-500'>{formik.errors.name}</p>
                )}
              </div>
            </div>

            {/* Certificate File */}
            <div className='flex flex-col sm:flex-row sm:gap-4'>
              <label className='mb-1 block text-sm font-medium text-gray-700 sm:w-1/3'>
                Upload Certificate File
              </label>
              <div className='flex-1'>
                <input
                  type='file'
                  accept='application/pdf'
                  onChange={handleFileChange}
                  className='w-full border p-2'
                />
                {formik.touched.certificateFile &&
                  formik.errors.certificateFile && (
                    <p className='text-sm text-red-500'>
                      {formik.errors.certificateFile}
                    </p>
                  )}
              </div>
            </div>

            {/* Obtained Date */}
            <div className='flex flex-col sm:flex-row sm:gap-4'>
              <label className='mb-1 block text-sm font-medium text-gray-700 sm:w-1/3'>
                Obtained Date
              </label>
              <div className='flex-1'>
                <DatePicker
                  selected={formik.values.obtainedDate}
                  onChange={(date) =>
                    formik.setFieldValue("obtainedDate", date)
                  }
                  className='w-full border p-2'
                  dateFormat='yyyy-MM-dd'
                  showYearDropdown
                  showMonthDropdown
                  dropdownMode="scroll"  // 👈 Required for arrows to work
                  scrollableYearDropdown
                  maxDate={new Date()}
                /> 
                {formik.touched.obtainedDate && formik.errors.obtainedDate && (
                  <p className='text-sm text-red-500'>
                    {formik.errors.obtainedDate}
                  </p>
                )}
              </div>
            </div>

            {/* Valid Until */}
            <div className='flex flex-col sm:flex-row sm:gap-4'>
              <label className='mb-1 block text-sm font-medium text-gray-700 sm:w-1/3'>
                Valid Until
              </label>
              <div className='flex-1'>
                <DatePicker
                  selected={formik.values.expiryDate}
                  onChange={(date) => formik.setFieldValue("expiryDate", date)}
                  className='w-full border p-2'
                  dateFormat='yyyy-MM-dd'
                  showYearDropdown
                  showMonthDropdown
                  dropdownMode="scroll"  // 👈 Required for arrows to work
                  scrollableYearDropdown
                />
                {formik.touched.expiryDate && formik.errors.expiryDate && (
                  <p className='text-sm text-red-500'>
                    {formik.errors.expiryDate}
                  </p>
                )}
              </div>
            </div>

            {/* Description */}
            <div className='flex flex-col sm:flex-row sm:gap-4'>
              <label className='mb-1 block text-sm font-medium text-gray-700 sm:w-1/3'>
                Description
              </label>
              <div className='flex-1'>
                <textarea
                  name='description'
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder='Enter certificate description'
                  className='w-full border p-2'
                  rows={4}
                />
              </div>
            </div>

            <div className='flex justify-end gap-4'>
              <button
                type='button'
                className='btn btn-secondary'
                onClick={handleToggleAddModal}
              >
                Cancel
              </button>
              <button type='submit' className='btn btn-primary'>
                Upload
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default AddCertificateModal;
