import { useQuery } from "@tanstack/react-query";
import { getSkills } from "@/lib/api/getSkills";

const useGetSkills = (shouldFetch: boolean = true) => {
  return useQuery({
    queryKey: ["skills-list"],
    queryFn: () => getSkills(),
    enabled: shouldFetch,
    throwOnError: true,
  });
};

export default useGetSkills;
