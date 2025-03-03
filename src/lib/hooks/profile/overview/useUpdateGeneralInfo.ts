import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios"; // Import your axios instance
import { GeneralInfo } from "@/lib/types/profile";








// API function to update general info
const updateGeneralInfo = async (
  userId: string,
  updatedData: Omit<GeneralInfo, '_id'> // Exclude '_id' if it's not needed
): Promise<GeneralInfo> => {
  const response = await axiosInstance.put(`/user/${userId}/overview/generalInfo`, updatedData);
  return response.data; // Return the updated user data
};

// Custom hook to use the update function with React Query
const useUpdateGeneralInfo = (onError: (error: Error) => void) => {
    
  return useMutation<GeneralInfo, Error, { userId: string; updatedData: Omit<GeneralInfo, '_id'> }>({
    mutationFn: ({ userId, updatedData }) => updateGeneralInfo(userId, updatedData),
    onError, // Handle error with the provided callback
  });
};

export default useUpdateGeneralInfo;
