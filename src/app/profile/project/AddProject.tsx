import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSession } from "next-auth/react";
import useAddProject from "@/lib/hooks/profile/projects/useAddProjects";
import toast from "react-hot-toast";
import { useAppContext } from "@/app/context/AppContext";
import useEditProject from "@/lib/hooks/profile/projects/useEditProject";



type Project = {
  id: string;
  name: string;
  code: string;
};

type ProjectRole = {
  id: string;
  name: string;
};

type AddProjectModalProps = {
  handleClose: () => void;
  projects: Project[];
  isEdit: boolean;
  projectRoles: ProjectRole[];
  editData?: {
    projectId: string;
    projectName: string;
    roleInProject: string;
    startDate:Date ;
    endDate: string;
    isCurrentProject: boolean;
    id?: string; 
    
  };
};

const AddProject: React.FC<AddProjectModalProps> = ({
  handleClose,
  projects,
  isEdit,
  editData,
  projectRoles,
}) => {
  const { data: session } = useSession();
  const { addProject, replaceEditedProject } = useAppContext();
  const mutationAdd = useAddProject();
  const mutationEdit = useEditProject();


  const formatDate = (date?: string | Date): string => {
    if (!date) return "";
    return date instanceof Date ? date.toISOString().split("T")[0] : date.split("T")[0];
  };
  
  const formik = useFormik({
    initialValues: {
      projectName: editData?.projectName || "",
      roleInProject: editData?.roleInProject || "",
      startDate: formatDate(editData?.startDate) || "",
      endDate: formatDate(editData?.endDate) || "",
      isCurrentProject: editData?.isCurrentProject || false,
    },
    validationSchema: Yup.object({
      projectName: Yup.string().required("Project name is required"),
      roleInProject: Yup.string().required("Role is required"),
      startDate: Yup.date().required("From date is required"),
      endDate: Yup.date()
        .when("isCurrentProject", {
          is: false,
          then: (schema) =>
            schema.required("To date is required").min(Yup.ref("startDate"), "To date must be after from date"),
          otherwise: (schema) => schema.notRequired(),
        }),
    }),
    onSubmit: async (values) => {
      await handleSubmit(values);
    },
  });

  const handleSubmit = async (values: any) => {
    const toastId = toast.loading(
      `${isEdit ? "Editing" : "Submitting"} Project...`,
    );
    try {
      const selectedProject = projects.find((project) => project.name === values.projectName);

      const payload = isEdit
  ? {
      ...values,
      projectId: editData?.projectId ?? "",
      profileId: editData?.id ?? "",
      employeeId: session?.user?.id || "",
      employeeName: session?.user?.name || "",
      employeeImage: session?.user?.image || "",
    }
  : {
      ...values,
      projectId: selectedProject?.id ?? "",
      employeeId: session?.user?.id || "",
      employeeName: session?.user?.name || "",
      employeeImage: session?.user?.image || "",
    };

      const result = isEdit ? await mutationEdit.mutateAsync(payload) : await mutationAdd.mutateAsync(payload);
      toast.success(`Project ${isEdit ? "Edited" : "Added"} Successfully`, {
        id: toastId,
      });
      
      isEdit ? replaceEditedProject(result) : addProject(result);
      handleClose();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An unexpected error occurred", {
        id: toastId,
      });
    }
  };

  return (
    <div className="flex h-full flex-col">
      <form onSubmit={formik.handleSubmit} className="flex-1 space-y-4 overflow-y-auto px-6">
        <div className="flex flex-col sm:flex-row sm:gap-4">
          <label className={`mb-1 block text-sm font-medium sm:w-1/3 ${isEdit ? "text-gray-600" : "text-gray-700"}`}>
            Project Name<span className="text-red-500">*</span>
          </label>
          <div className="flex-1">
            <select
              name="projectName"
              disabled={isEdit}
              value={formik.values.projectName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full border p-2 ${isEdit && "bg-gray-200"}`}
            >
              <option value="" disabled>Select a project</option>
              {projects.length > 0 ? (
                projects.map((project) => (
                  <option key={project.id} value={project.name}>
                    {`${project.code}: ${project.name}`}
                  </option>
                ))
              ) : (
                <option disabled>No projects available</option>
              )}
            </select>
            {formik.touched.projectName && formik.errors.projectName && (
              <p className="text-sm text-red-500">{formik.errors.projectName}</p>
            )}
          </div>
        </div>
        <div className='flex items-center gap-2'>
          <span className='text-sm font-medium text-gray-700'>
            Currently working on this project
          </span>
          <button
            type='button'
            onClick={() =>
              formik.setFieldValue(
                "isCurrentProject",
                !formik.values.isCurrentProject,
              )
            }
            className={`relative flex h-6 w-12 items-center rounded-full transition-all duration-300 ${
              formik.values.isCurrentProject ? "bg-[#1b84ff]" : "bg-gray-400"
            }`}
          >
            <span
              className={`absolute left-1 h-4 w-4 rounded-full bg-white shadow-md transition-transform duration-300 ${
                formik.values.isCurrentProject
                  ? "translate-x-6"
                  : "translate-x-0"
              }`}
            ></span>
          </button>
        </div>
        <div className='flex flex-col sm:flex-row sm:gap-4'>
          <label className='mb-1 block text-sm font-medium text-gray-700 sm:w-1/3'>
            Role<span className='text-red-500'>*</span>
          </label>
          <div className="flex-1">
            <select
              name="roleInProject"
              value={formik.values.roleInProject}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full border p-2"
            >
              <option value="" disabled>Select a role</option>
              {projectRoles?.map((role) => (
                <option key={role.id} value={role.name}>
                  {role.name}
                </option>
              ))}
            </select>
            {formik.touched.roleInProject && formik.errors.roleInProject && (
              <p className="text-sm text-red-500">{formik.errors.roleInProject}</p>
            )}
          </div>
        </div>

        {/* Start & End Date */}
        <div className="flex flex-col sm:flex-row sm:gap-4">
          <label className="mb-1 block text-sm font-medium text-gray-700 sm:w-1/3">
            From Date<span className="text-red-500">*</span>
          </label>
          <div className="flex-1">
            <input
              type="date"
              name="startDate"
              value={formik.values.startDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full border p-2"
            />
            {formik.touched.startDate && formik.errors.startDate && (
              <p className='text-sm text-red-500'>{formik.errors.startDate}</p>
            )}
          </div>
        </div>
        <div
          className={`flex flex-col transition-all duration-300 sm:flex-row sm:gap-4 ${
            formik.values.isCurrentProject
              ? "h-0 scale-95 overflow-hidden opacity-0"
              : "h-auto scale-100 opacity-100"
          }`}
        >
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

        

        <div className='flex justify-end gap-4 bg-white p-4'>
          <button
            onClick={() => handleClose()}
            type='button'
            className='btn btn-secondary'
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            {isEdit ? "Update" : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProject;

