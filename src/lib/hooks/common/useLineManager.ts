import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const isLineManager = async (userId: string): Promise<boolean> => {
  try {
    const response = await axiosInstance.get(`/is-line-manager`, {
      params: { userId }, // Pass userId as a query parameter
    });
    console.log(response, "response");
    return response.data.isLineManager;
  } catch (error) {
    throw new Error("Failed to check line manager status");
  }
};

export const useIsLineManager = (userId: string) => {
  return useQuery<boolean, Error>({
    queryKey: ["line-manager", userId],
    queryFn: () => isLineManager(userId),
    enabled: !!userId, // Only runs if userId is provided
  });
};
