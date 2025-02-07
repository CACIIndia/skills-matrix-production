import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

type AddProjectModalProps = {
    handleClose: ()=> void
};
const AddProject: React.FC<AddProjectModalProps> = ({handleClose}) => {
  const projects = ["Project A", "Project B", "Project C"];
  const roles = ["Developer", "Designer", "Manager"];
  const formik = useFormik({
    initialValues: {
      projectName: "",
      role: "",
      toDate: "",
      fromDate: "",
    },
    validationSchema: Yup.object({
      projectName: Yup.string().required("Certificate name is required"),
      role: Yup.mixed().required("Certificate file is required"),

      toDate: Yup.date()
        .typeError("Please enter a valid date")
        .required("To date is required")
        .min(Yup.ref("fromDate"), "To date must be after from date"),
      fromDate: Yup.date()
        .typeError("Please enter a valid date")
        .required("From date is required"),
    }),

    onSubmit: (values) => {
      console.log("add project values", values);
    },
  });
  return (
    <div className="flex flex-col h-full">
      <form onSubmit={formik.handleSubmit} className='space-y-4 flex-1 overflow-y-auto px-6'>
        <div className='flex flex-col sm:flex-row sm:gap-4'>
          <label className='mb-1 block text-sm font-medium text-gray-700 sm:w-1/3'>
            Project Name<span className='text-red-500'>*</span>
          </label>
          <div className='flex-1'>
            <select
              name='projectName'
              value={formik.values.projectName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className='w-full border p-2'
            >
              <option value='' disabled>
                Select a project
              </option>
              {projects.map((project) => (
                <option key={project} value={project}>
                  {project}
                </option>
              ))}
            </select>
            {formik.touched.projectName && formik.errors.projectName && (
              <p className='text-sm text-red-500'>
                {formik.errors.projectName}
              </p>
            )}
          </div>
        </div>

        <div className='flex flex-col sm:flex-row sm:gap-4'>
          <label className='mb-1 block text-sm font-medium text-gray-700 sm:w-1/3'>
            Role<span className='text-red-500'>*</span>
          </label>
          <div className='flex-1'>
            <select
              name='role'
              value={formik.values.role}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className='w-full border p-2'
            >
              <option value='' disabled>
                Select a role
              </option>
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
            {formik.touched.role && formik.errors.role && (
              <p className='text-sm text-red-500'>{formik.errors.role}</p>
            )}
          </div>
        </div>

        <div className='flex flex-col sm:flex-row sm:gap-4'>
          <label className='mb-1 block text-sm font-medium text-gray-700 sm:w-1/3'>
            From Date<span className='text-red-500'>*</span>
          </label>
          <div className='flex-1'>
            <input
              type='date'
              name='fromDate'
              value={formik.values.fromDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className='w-full border p-2'
            />
            {formik.touched.fromDate && formik.errors.fromDate && (
              <p className='text-sm text-red-500'>{formik.errors.fromDate}</p>
            )}
          </div>
        </div>

        <div className='flex flex-col sm:flex-row sm:gap-4'>
          <label className='mb-1 block text-sm font-medium text-gray-700 sm:w-1/3'>
            To Date<span className='text-red-500'>*</span>
          </label>
          <div className='flex-1'>
            <input
              type='date'
              name='toDate'
              value={formik.values.toDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className='w-full border p-2'
            />
            {formik.touched.toDate && formik.errors.toDate && (
              <p className='text-sm text-red-500'>{formik.errors.toDate}</p>
            )}
          </div>
        </div>
      </form>
      {/* Buttons at the Bottom Inside Modal */}
    <div className='p-4 bg-white flex justify-end gap-4'>
      <button onClick={()=> handleClose()} type='button' className='btn btn-secondary'>
        Cancel
      </button>
      <button type='submit' className='btn btn-primary'>
        Upload
      </button>
    </div>
  </div>
   
  );
};

export default AddProject;
