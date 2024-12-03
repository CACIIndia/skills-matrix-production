import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

const getTrainingStatus = async (): Promise<any> => {
  try {
    const response = await axiosInstance.get("training/get-training-status");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching training status:", error);
    throw error;
  }
};


const useGetTrainingStatus = () => {
    return useQuery({
      queryKey: ["training-status"],
      queryFn: getTrainingStatus,
    });
  };
  
  export default useGetTrainingStatus;
