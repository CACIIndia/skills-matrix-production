import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";

interface User {
  id: string;
  name: string;
  email: string;
  image: string;
}

const getUsers = async (): Promise<User[]> => {
  try {
    const response = await axiosInstance.get("/users/list");
    return response.data;
  } catch (error) {
    console.error("Error fetching users data:", error);
    throw error;
  }
};

const useGetUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });
};

export default useGetUsers;
