import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";

const deleteProject = async ({ profileId }: { profileId: string }) => {
  try {
    const response = await axiosInstance.delete(`/projects/delete`, {
      data: { profileId },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting project:", error);
    throw error;
  }
};

const useDeleteProject = () => {
  return useMutation<void, Error, { profileId: string }>({
    mutationFn: deleteProject
  });
};

export default useDeleteProject;
