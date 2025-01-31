
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios"; 
import { UserDetails } from "@/lib/types/profile"; 


const updateMicrosoftProfile = async (
  accessToken: string,
  user: UserDetails
): Promise<UserDetails> => {
  try {
    const response = await axiosInstance.post('update-user-ad-profile', {
      accessToken,
      user,
    });
    return response.data.updatedUser; 
  } catch (error) {
    throw error;
  }
};


const useUpdateMicrosoftProfile = (onError: (error: Error) => void) => {
  return useMutation<UserDetails, Error, { accessToken: string; user: UserDetails }>({
    mutationFn: ({ accessToken, user }) => updateMicrosoftProfile(accessToken, user),
    onError, 
  });
};

export { useUpdateMicrosoftProfile, updateMicrosoftProfile };
