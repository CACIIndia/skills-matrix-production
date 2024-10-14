import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";

interface SfiaLevel {
  id: string;
  level: string;
}

const getSfiaLevels = async (): Promise<SfiaLevel[]> => {
  try {
    const response = await axiosInstance.get("common/sfia-level");
    return response.data;
  } catch (error) {
    console.error("Error fetching SFIA levels:", error);
    throw error;
  }
};

const useGetSfiaLevels = () => {
  return useQuery({
    queryKey: ["sfia-levels"],
    queryFn: getSfiaLevels,
  });
};

export default useGetSfiaLevels;
