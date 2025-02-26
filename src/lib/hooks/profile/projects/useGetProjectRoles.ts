import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { ProjectRole } from "@/lib/types/profile";



const getProjectRoles = async (): Promise<ProjectRole[]> => {
  try {
    const response = await axiosInstance.get("/project-role/list");
    return response.data;
  } catch (error) {
    console.error("Error fetching project roles data:", error);
    throw error;
  }
};

const useGetProjectRoles = (defaultEnabled: boolean = true) => {
  return useQuery({
    queryKey: ["projectRoles"],
    queryFn: getProjectRoles,
    enabled: defaultEnabled
  });
};

export default useGetProjectRoles;
