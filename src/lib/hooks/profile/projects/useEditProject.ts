import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { Project } from "@prisma/client";

const editProject = async (updatedProject: Partial<Project>): Promise<Project> => {
  const response = await axiosInstance.put(`/projects/edit`, updatedProject);
  return response.data;
};

const useEditProject = () => {
  return useMutation<Project, Error, Partial<Project>>({
    mutationFn: editProject
  });
};

export default useEditProject;
