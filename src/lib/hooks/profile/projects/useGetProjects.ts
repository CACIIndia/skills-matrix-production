import { getProjects } from "@/lib/api/getProjects";
import { useQuery } from "@tanstack/react-query";

const useGetProjects = (search?: string) => {
    return useQuery({
      queryKey: ["projects", search],
      queryFn: () => getProjects(search),
      throwOnError: true,
    });
  };
  
  export default useGetProjects;