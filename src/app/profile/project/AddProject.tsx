import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import useGetProjectRoles from "@/lib/hooks/common/useGetProjectRoles";
import { useSession } from "next-auth/react";

type AddProjectModalProps = {
  handleClose: () => void;
  projects: [];
};
// useGetProjectRoles

const AddProject: React.FC<AddProjectModalProps> = ({
  handleClose,
  projects,
}) => {
  const { data: session } = useSession();
  const { data: projectRoles } = useGetProjectRoles();
  console.log("sesseion data", session);
  const formik = useFormik({
    initialValues: {
      projectName: "",
      roleInProject: "",
      startDate: "",
      endDate: "",
      isCurrentProject: false,
    },
    validationSchema: Yup.object({
      projectName: Yup.string().required("Certificate name is required"),
      roleInProject: Yup.mixed().required("Certificate file is required"),

      startDate: Yup.date()
        .typeError("Please enter a valid date")
        .required("To date is required"),

      endDate: Yup.date()
        .typeError("Please enter a valid date")
        .required("From date is required")
        .min(Yup.ref("startDate"), "To date must be after from date"),
    }),

    onSubmit: (values) => {
      const selectedProject = projects?.find(
        (project) => project.name === values.projectName,
      );

      const payload = {
        ...values,
        projectId: selectedProject?.id || "", // Ensures id exists
        employeeId: session?.user?.id || "",
        employeeName: session?.user?.name || "",
        employeeImage: session?.user?.image || "",
      };

      console.log("add project values", payload);
    },
  });
  return (
    <div className='flex h-full flex-col'>
      <form
        onSubmit={formik.handleSubmit}
        className='flex-1 space-y-4 overflow-y-auto px-6'
      >
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
              {projects && projects.length > 0 ? (
                projects.map((project) => (
                  <option key={project.id} value={project.name}>
                    {`${project.code}: ${project.name}`}
                  </option>
                ))
              ) : (
                <p className='text-gray-500'>No projects available.</p>
              )}
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
              name='roleInProject'
              value={formik.values.roleInProject}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className='w-full border p-2'
            >
              <option value='' disabled>
                Select a role
              </option>
              {projectRoles &&
                projectRoles.map((role) => (
                  <option key={role.id} value={role.name}>
                    {role.name}
                  </option>
                ))}
            </select>
            {formik.touched.roleInProject && formik.errors.roleInProject && (
              <p className='text-sm text-red-500'>
                {formik.errors.roleInProject}
              </p>
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
              name='startDate'
              value={formik.values.startDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className='w-full border p-2'
            />
            {formik.touched.startDate && formik.errors.startDate && (
              <p className='text-sm text-red-500'>{formik.errors.startDate}</p>
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
              name='endDate'
              value={formik.values.endDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className='w-full border p-2'
            />
            {formik.touched.endDate && formik.errors.endDate && (
              <p className='text-sm text-red-500'>{formik.errors.endDate}</p>
            )}
          </div>
        </div>
        {/* isCurrentProject Checkbox */}
        <div className='flex items-center gap-2'>
          <input
            type='checkbox'
            name='isCurrentProject'
            checked={formik.values.isCurrentProject}
            onChange={formik.handleChange}
            className='w-4 h-4'
          />
          <label className='text-sm font-medium text-gray-700'>
            Currently working on this project
          </label>
        </div>
        <div className='flex justify-end gap-4 bg-white p-4'>
          <button
            onClick={() => handleClose()}
            type='button'
            className='btn btn-secondary'
          >
            Cancel
          </button>
          <button type='submit' className='btn btn-primary'>
            Save
          </button>
        </div>
      </form>
      {/* Buttons at the Bottom Inside Modal */}
    </div>
  );
};

export default AddProject;
