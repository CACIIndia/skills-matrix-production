import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios"; // Import your axios instance
import { AdditionalInfo } from "@/lib/types/profile"; // Import the type for AdditionalInfo

// API function to update additional info
const updateAdditionalInfo = async (
  userId: string,
  updatedData: Omit<AdditionalInfo, '_id'> // Exclude '_id' if it's not needed
): Promise<AdditionalInfo> => {

  const response = await axiosInstance.put(`/user/${userId}/overview/additionalInfo`, updatedData);
  return response.data; // Return the updated additional info data
};

// Custom hook to use the update function with React Query
const useUpdateAdditionalInfo = (onError: (error: Error) => void) => {
    
  return useMutation<AdditionalInfo, Error, { userId: string; updatedData: Omit<AdditionalInfo, '_id'> }>({
    mutationFn: ({ userId, updatedData }) => updateAdditionalInfo(userId, updatedData),
    onError, // Handle error with the provided callback
  });
};

export { useUpdateAdditionalInfo, updateAdditionalInfo };
