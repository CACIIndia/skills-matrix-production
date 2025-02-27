import { Certificate, Skill, Training } from "@/lib/types/profile";
import React, { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import { useFormik } from "formik";
import * as Yup from "yup";
import FileUploadIcon from "@/components/custom-icons/FileUploadIcon";

type AddCertificateModalProps = {
  isAddModalOpen: boolean;
  handleToggleAddModal: () => void;
  handleUploadCertificate: (certificate: Certificate) => void;
  categorySkills: CategorySkillsData[];
  trainingData: Training[];
};

type CategorySkillsData = {
  category: string;
  categoryId?: string;
  skills: Skill[];
};

const AddCertificateModal: React.FC<AddCertificateModalProps> = ({
  isAddModalOpen,
  handleToggleAddModal,
  handleUploadCertificate,
  categorySkills,
  trainingData,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
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
      skillId: "",
      skillName: "",
      isTrainingLinked: false,
      trainingRecordId: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Certificate name is required"),
      certificateFile: Yup.mixed().required("Certificate file is required"),
      categoryName: Yup.string().required("Category is required"),
      skillId: Yup.string().required("Skill is required"),
      obtainedDate: Yup.date()
        .typeError("Please enter a valid date")
        .required("Obtained date is required"),
      expiryDate: Yup.date()
        .typeError("Please enter a valid date")
        .required("Valid until date is required")
        .min(
          Yup.ref("obtainedDate"),
          "Valid until date cannot be before obtained date",
        )
        .test(
          "not-equal-to-obtained-date",
          "Valid until date cannot be the same as obtained date",
          function (value) {
            const { obtainedDate } = this.parent;
            return (
              value &&
              obtainedDate &&
              new Date(value).getTime() !== new Date(obtainedDate).getTime()
            );
          },
        ),
      isTrainingLinked: Yup.boolean().default(false),
      trainingRecordId: Yup.string().when("isTrainingLinked", {
        is: true,
        then: (schema) => schema.required("Training is required"),
        otherwise: (schema) => schema.notRequired(),
      }),
    }),

    onSubmit: (values) => {
      if (!formik?.values?.isTrainingLinked) {
        const selectedSkill = skills?.find((sk) => sk?.id === values?.skillId);
        const updatedValues = {
          ...values,
          skillName: selectedSkill ? selectedSkill.name : "",
          categoryId: selectedSkill ? selectedSkill.categoryId : "",
        };
        handleUploadCertificate(updatedValues);
      } else {
        handleUploadCertificate(values);
      }
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      formik.setFieldValue("certificateFile", file);
    }
  };

  /* const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategoryName = e.target.value;

    const selectedCategory = categorySkills.find(
      (cat) => cat?.category === selectedCategory
    );

    if (selectedCategory) {
      formik.setFieldValue("categoryId", selectedCategory.id);
      formik.setFieldValue("categoryName", selectedCategory.name);
    }
  }; */
  //console.log(formik.errors,"formikerroes");

  useEffect(() => {
    formik?.resetForm({
      values: {
        ...formik.initialValues,
        isTrainingLinked: formik?.values?.isTrainingLinked,
      },
    });
    if (fileInputRef?.current) {
      fileInputRef.current.value = "";
    }
  }, [formik?.values?.isTrainingLinked]);

  useEffect(() => {
    if (!formik.values.isTrainingLinked) {
      const selectedCategory = categorySkills?.find(
        (cat) => cat?.category === formik?.values?.categoryName,
      );

      setSkills(selectedCategory ? selectedCategory?.skills : []);
      formik?.setFieldValue("skillId", "");
      formik?.setFieldValue("skillName", "");
    }
  }, [
    formik?.values?.isTrainingLinked,
    formik?.values?.categoryName,
    categorySkills,
  ]);

  return (
    isAddModalOpen && (
      <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
        <div className='mx-2 h-[95%] w-[100%] overflow-y-auto rounded-md bg-white p-6 shadow-lg sm:mx-0 sm:h-auto sm:w-[600px]'>
          <div className='flex flex-wrap items-center justify-between'>
            <h3 className='mb-4 text-lg font-semibold'>Add New Certificate</h3>
            {trainingData.length > 0 && (
              <div className='mb-4 flex items-center justify-end'>
                <label
                  htmlFor='certificateToggle'
                  className='mr-2 text-sm font-medium text-gray-700'
                >
                  Link with training
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
                  Training List<span className='text-red-500'>*</span>
                </label>
                <div className='flex-1'>
                  <select
                    id='trainingRecordId'
                    name='trainingRecordId'
                    onBlur={formik.handleBlur}
                    value={formik?.values?.trainingRecordId}
                    onChange={(e) => {
                      const selectedTrainingId = e.target.value;
                      const selectedTraining = trainingData.find(
                        (training) => training.id === selectedTrainingId,
                      );
                      if (selectedTraining) {
                        formik.setFieldValue(
                          "trainingRecordId",
                          selectedTraining.id,
                        );
                        formik.setFieldValue(
                          "categoryId",
                          selectedTraining.categoryId,
                        );

                        formik.setFieldValue(
                          "categoryName",
                          selectedTraining.categoryName,
                        );
                        formik.setFieldValue(
                          "skillId",
                          selectedTraining?.skillId,
                        );
                        formik.setFieldValue(
                          "skillName",
                          selectedTraining?.skillName,
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
                  {formik.touched.trainingRecordId &&
                    formik.errors.trainingRecordId && (
                      <p className='text-sm text-red-500'>
                        {formik?.errors?.trainingRecordId}
                      </p>
                    )}
                </div>
              </div>
            )}
            {/* Category Dropdown */}
            {!formik?.values?.isTrainingLinked && (
              <div className='flex flex-col sm:flex-row sm:gap-4'>
                <label className='mb-1 block text-sm font-medium text-gray-700 sm:w-1/3'>
                  Category<span className='text-red-500'>*</span>
                </label>
                <div className='flex-1'>
                  <select
                    name='categoryName'
                    value={formik?.values?.categoryName}
                    onChange={formik?.handleChange}
                    onBlur={formik.handleBlur}
                    className='w-full border p-2'
                    disabled={!!formik?.values?.trainingRecordId}
                  >
                    <option value='' disabled>
                      Select a category
                    </option>
                    {categorySkills?.map((cat) => (
                      <option key={cat?.category} value={cat?.category}>
                        {cat?.category}
                      </option>
                    ))}
                  </select>
                  {formik.touched.categoryName &&
                    formik.errors.categoryName && (
                      <p className='text-sm text-red-500'>
                        {formik?.errors?.categoryName}
                      </p>
                    )}
                </div>
              </div>
            )}
            {!formik?.values?.isTrainingLinked && (
              <div className='flex flex-col sm:flex-row sm:gap-4'>
                <label className='mb-1 block text-sm font-medium text-gray-700 sm:w-1/3'>
                  Skill<span className='text-red-500'>*</span>
                </label>
                <div className='flex-1'>
                  <select
                    name='skillId'
                    value={formik?.values?.skillId}
                    onChange={formik?.handleChange}
                    onBlur={formik.handleBlur}
                    className='w-full border p-2'
                    disabled={!formik?.values?.categoryName}
                  >
                    <option value='' disabled>
                      Select skill
                    </option>
                    {skills?.map((sk) => (
                      <option key={sk?.id} value={sk?.id}>
                        {sk?.name}
                      </option>
                    ))}
                  </select>
                  {formik.touched.skillId && formik.errors.skillId ? (
                    <div className='text-sm text-red-500'>
                      {formik.errors?.skillId}
                    </div>
                  ) : null}
                </div>
              </div>
            )}

            {/* Certificate Name */}
            <div className='flex flex-col sm:flex-row sm:gap-4'>
              <label className='mb-1 block text-sm font-medium text-gray-700 sm:w-1/3'>
                Certificate Name<span className='text-red-500'>*</span>
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
              <label
                htmlFor='certificateFile'
                className='mb-1 block text-sm font-medium text-gray-700 sm:w-1/3'
              >
                Upload Certificate File<span className='text-red-500'>*</span>
              </label>
              <div className='flex flex-col'>
                <div className='flex'>
                  <label className='cursor-pointer' htmlFor='certificateFile'>
                    <button
                      tabIndex={-1}
                      data-qa='bulk-upload-button'
                      type={"button"}
                      className='btn-primary pointer-events-none flex h-[100%] w-[46px] flex-grow-0 cursor-pointer items-center justify-center rounded-l-[6px]'
                    >
                      <FileUploadIcon />
                    </button>
                  </label>
                  <div className='flex flex-col'>
                    <input
                      type='file'
                      id='certificateFile'
                      ref={fileInputRef}
                      accept='application/pdf'
                      onChange={handleFileChange}
                      className='w-full cursor-pointer border px-2 py-2'
                    />
                  </div>
                </div>
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
                Obtained Date<span className='text-red-500'>*</span>
              </label>
              <div className='flex-1'>
                <DatePicker
                  selected={formik.values.obtainedDate}
                  name='obtainedDate'
                  onBlur={formik.handleBlur}
                  onChange={(date) =>
                    formik.setFieldValue("obtainedDate", date)
                  }
                  className='w-full border p-2'
                  dateFormat='dd-MM-yyyy'
                  showYearDropdown
                  showMonthDropdown
                  dropdownMode='scroll'
                  scrollableYearDropdown
                  maxDate={new Date()}
                  onKeyDown={(e) => e.preventDefault()}
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
                Valid Until<span className='text-red-500'>*</span>
              </label>
              <div className='flex-1'>
                <DatePicker
                  selected={formik.values.expiryDate}
                  name='expiryDate'
                  onBlur={formik.handleBlur}
                  onChange={(date) => formik.setFieldValue("expiryDate", date)}
                  className='w-full border p-2'
                  dateFormat='dd-MM-yyyy'
                  showYearDropdown
                  showMonthDropdown
                  dropdownMode='scroll'
                  minDate={formik?.values?.obtainedDate || new Date()}
                  onKeyDown={(e) => e.preventDefault()}
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
                Close
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
