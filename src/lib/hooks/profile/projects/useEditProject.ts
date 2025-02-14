import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
// import { CACIProfile } from "@/lib/types/profile";

type CACIProfile = {
  id?: string;
  employeeId?: string;
  employeeName?: string;
  employeeImage?: string | null;
  projectId?: string;
  projectName?: string;
  roleInProject?: string | null;
  isCurrentProject?: boolean;
  startDate?: Date | string;
  endDate?: Date | string;
  updatedAt?: Date;
  
};

const editProject = async (updatedProject: Partial<CACIProfile>): Promise<CACIProfile> => {
  const response = await axiosInstance.put(`/projects/edit`, updatedProject);
  return response.data;
};

const useEditProject = () => {
  return useMutation<CACIProfile, Error, Partial<CACIProfile>>({
    mutationFn: editProject
  });
};

export default useEditProject;
