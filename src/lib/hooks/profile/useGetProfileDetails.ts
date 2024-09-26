import { useQuery } from "@tanstack/react-query";

import axiosInstance from "@/lib/api";
import { UserDetails } from "@/lib/types/profile";

const getProfileDetails = async (
  userId: string,
): Promise<UserDetails | undefined> => {
  try {
    const response = await axiosInstance.get(`/userdetails/${userId}`);

    return response.data.data;
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
