import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { Training } from "@/lib/types/profile";



const getTrainingDataByUserId = async (userId: string): Promise<Training[]> => {
  try {
    const response = await axiosInstance.get(`training/get-training-data/${userId}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching training data for user:", error);
    throw error;
  }
};

const useGetTrainingDataByUserId = (userId: string) => {
  return useQuery({
    queryKey: ["training-data", userId],
    queryFn: () => getTrainingDataByUserId(userId),
    enabled: !!userId,
  });
};

export default useGetTrainingDataByUserId;
