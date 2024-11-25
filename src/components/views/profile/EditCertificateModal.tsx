import { Certificate, SkillCategory } from "@/lib/types/profile";
import React from "react";
import DatePicker from "react-datepicker";
import { useFormik } from "formik";
import * as Yup from "yup";

type EditCertificateModalProps = {
  isEditModalOpen: boolean;
  handleToggleEditModal: () => void;
  handleUpdateCertificate: (certificate: Certificate) => void;
  editingCertificate: Certificate;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  categoryskills: SkillCategory[];
};

const EditCertificateModal: React.FC<EditCertificateModalProps> = ({
  isEditModalOpen,
  handleToggleEditModal,
  handleUpdateCertificate,
  editingCertificate,
  handleFileChange,
  categoryskills,
}) => {
  const formik = useFormik({
    initialValues: {
      id: editingCertificate.id,
      name: editingCertificate.name,
      certificateFile: null as File | null,
      obtainedDate: editingCertificate.obtainedDate,
      expiryDate: editingCertificate.expiryDate,
      description: editingCertificate.description,
      categoryId: editingCertificate.categoryId,
      categoryName: editingCertificate.categoryName, // Category name from the existing certificate
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Certificate Name is required"),
      certificateFile: Yup.mixed().nullable().notRequired(),
      categoryId: Yup.string().required("Category is required"),
      obtainedDate: Yup.date().required("obtainedDate is required"),
      expiryDate: Yup.date().required("expiryDate is required"),
    }),
    onSubmit: (values) => {
      handleUpdateCertificate(values);
    },
  });

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategoryId = e.target.value;

    const selectedCategory = categoryskills.find(
      (category) => category.id === selectedCategoryId,
    );

    if (selectedCategory) {
      formik.setFieldValue("categoryId", selectedCategory.id);
      formik.setFieldValue("categoryName", selectedCategory.name); // Update categoryName as well
    }
  };

  return (
    isEditModalOpen && (
      <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
        <div className='w-full rounded-md bg-white p-6 shadow-lg sm:w-[600px]'>
          <h3 className='mb-4 text-lg font-semibold'>Edit Certificate</h3>

          <form onSubmit={formik.handleSubmit} className='space-y-4'>
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
                Upload New Certificate File (Optional)
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
                  className='w-full border p-2'
                  rows={4}
                  placeholder='Enter certificate description'
                />
              </div>
            </div>

            <div className='flex justify-end gap-4'>
              <button
                type='button'
                className='btn btn-secondary'
                onClick={handleToggleEditModal}
              >
                Cancel
              </button>
              <button type='submit' className='btn btn-primary'>
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default EditCertificateModal;
