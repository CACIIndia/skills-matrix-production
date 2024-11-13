import { Certificate, SkillCategory } from "@/lib/types/profile";
import React from "react";
import DatePicker from "react-datepicker";
import { useFormik } from "formik";
import * as Yup from "yup";





type AddCertificateModalProps = {
  isAddModalOpen: boolean;
  handleToggleAddModal: () => void;
  handleUploadCertificate: (certificate: Certificate) => void;
  categoryskills:SkillCategory[];
};

const AddCertificateModal: React.FC<AddCertificateModalProps> = ({
  isAddModalOpen,
  handleToggleAddModal,
  handleUploadCertificate,
  categoryskills
}) => {
  // Formik form handling
  const formik = useFormik({
    initialValues: {
      name: "",
      certificateFile: null as File | null,
      obtainedDate: new Date(),
      expiryDate: new Date(),
      description: "",
      categoryId: "",
      categoryName: "", // Add categoryName to the form state
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Certificate Name is required"),
      certificateFile: Yup.mixed().required("Certificate file is required"),
      categoryId: Yup.string().required("Category is required"),
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
      (category) => category.id === selectedCategoryId
    );

    if (selectedCategory) {
      formik.setFieldValue("categoryId", selectedCategory.id);
      formik.setFieldValue("categoryName", selectedCategory.name); // Update categoryName as well
    }
  };

  return (
    isAddModalOpen && (
      <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
        <div className='w-full rounded-md bg-white p-6 shadow-lg sm:w-[600px]'>
          <h3 className='mb-4 text-lg font-semibold'>Add New Certificate</h3>

          <form
            onSubmit={formik.handleSubmit}
            className='space-y-4'
          >
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
                  <p className='text-red-500 text-sm'>{formik.errors.name}</p>
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
                {formik.touched.certificateFile && formik.errors.certificateFile && (
                  <p className='text-red-500 text-sm'>{formik.errors.certificateFile}</p>
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
                  onChange={(date) => formik.setFieldValue("obtainedDate", date)}
                  className='w-full border p-2'
                  dateFormat='yyyy-MM-dd'
                  showYearDropdown
                  showMonthDropdown
                />
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
                />
              </div>
            </div>

            {/* Category Dropdown */}
            <div className='flex flex-col sm:flex-row sm:gap-4'>
              <label className='mb-1 block text-sm font-medium text-gray-700 sm:w-1/3'>
                Category
              </label>
              <div className='flex-1'>
                <select
                  name='categoryId'
                  value={formik.values.categoryId}
                  onChange={handleCategoryChange} // Update categoryId and categoryName
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
                  <p className='text-red-500 text-sm'>{formik.errors.categoryId}</p>
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
