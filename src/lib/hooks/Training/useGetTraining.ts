import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { Training } from "@/lib/types/profile";



const getTrainingDataByUserId = async (
  userId: string,
  filter_type: string = "createdBy", 
  filter_status?: string 
): Promise<Training[]> => {
  try {
    const response = await axiosInstance.get(`training/get-training-data/${userId}`, {
      params: {
        filter_type: filter_type,
        filter_status: filter_status, 
      },
    });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching training data for user:", error);
    throw error;
  }
};

const useGetTrainingDataByUserId = (
  userId: string,
  filter_type: string = "createdBy",
  filter_status?: string
) => {
  return useQuery({
    queryKey: ["training-data", userId, filter_type, filter_status],
    queryFn: () => getTrainingDataByUserId(userId, filter_type, filter_status),
    enabled: !!userId,
  });
};

export default useGetTrainingDataByUserId;
