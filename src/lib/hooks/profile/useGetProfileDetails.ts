import { useQuery } from "@tanstack/react-query";

import axiosInstance from "@/lib/axios";
import { UserDetails } from "@/lib/types/profile";

const getProfileDetails = async (
  userId: string,
): Promise<UserDetails | undefined> => {
  try {
    console.log(userId,"userId");
    const response = await axiosInstance.get(`user/${userId}`);
    // Ensure that the data structure is as expected
    const { projects } = response.data;
    console.log(projects,"projects");

    if (projects && Array.isArray(projects)) {
      // Extract current and previous projects
      const currentProject = projects.find(
        (project: any) => project.isCurrentProject
      );
      const previousProjects = projects.filter(
        (project: any) => !project.isCurrentProject
      );

      // Safely update the data structure
      return {
        ...response.data,
        currentProject,
        previousProjects,
      };
    }

    return response?.data;
   
  } catch (error) {
    console.error("Error fetching profile details:", error);
    throw error;
  }
};

const useGetProfileDetails = (userId: string) => {

  return useQuery({
    queryKey: ["profile-details", userId],
    queryFn: () => getProfileDetails(userId),
    enabled: !!userId,
    throwOnError: true,
  });
};

export default useGetProfileDetails;
