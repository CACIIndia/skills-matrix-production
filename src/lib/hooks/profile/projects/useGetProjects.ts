import { getProjects } from "@/lib/api/getProjects";
import { useQuery } from "@tanstack/react-query";

const useGetProjects = (shouldFetch: boolean = true, search?: string) => {
    return useQuery({
      queryKey: ["projects", search],
      queryFn: () => getProjects(search),
      enabled: shouldFetch || !!search,
      throwOnError: true,
    });
  };
  
  export default useGetProjects;