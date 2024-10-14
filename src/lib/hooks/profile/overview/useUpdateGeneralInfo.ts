import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios"; // Import your axios instance
import { UserDetails } from "@/lib/types/profile";

// API function to update general info
const updateGeneralInfo = async (
  userId: string,
  updatedData: Omit<UserDetails, '_id'> // Exclude '_id' if it's not needed
): Promise<UserDetails> => {
  const response = await axiosInstance.put(`/user/${userId}/overview/generalInfo`, updatedData);
  return response.data; // Return the updated user data
};

// Custom hook to use the update function with React Query
const useUpdateGeneralInfo = (onError: (error: Error) => void) => {
    
  return useMutation<UserDetails, Error, { userId: string; updatedData: Omit<UserDetails, '_id'> }>({
    mutationFn: ({ userId, updatedData }) => updateGeneralInfo(userId, updatedData),
    onError, // Handle error with the provided callback
  });
};

export default useUpdateGeneralInfo;
