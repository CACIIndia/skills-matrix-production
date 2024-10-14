import { useQuery } from "@tanstack/react-query";
import { getSkills } from "@/lib/api/getSkills";

const useGetSkills = () => {
  return useQuery({
    queryKey: ["skills-list"],
    queryFn: () => getSkills(),
    throwOnError: true,
  });
};

export default useGetSkills;
