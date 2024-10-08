import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { Skill } from "@/lib/types/profile";

const getSkills = async (): Promise<Record<string, Skill[]>> => {
  try {
    const response = await axiosInstance.get("/skill/list");

    return response.data;
  } catch (error) {
    console.error("Error fetching skills:", error);
    throw error;
  }
};

const useGetSkills = () => {
  return useQuery({
    queryKey: ["skills-list"],
    queryFn: getSkills,
  });
};

export default useGetSkills;
