import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";

interface User {
  id: string;
  name: string;
  email: string;
  image: string;
}

const getUsers = async (reportedToId: string): Promise<User[]> => {
  try {
    const response = await axiosInstance.get(`/users/list`, {
      params: { reportedToId },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching users data:", error);
    throw error;
  }
};

const useGetUsersByLineManager = (reportedToId: string) => {
  return useQuery({
    queryKey: ["users", reportedToId],
    queryFn: () => getUsers(reportedToId),
    enabled: !!reportedToId, 
  });
};

export default useGetUsersByLineManager;
