import { addProject } from "@/lib/api/addProject";
import { useMutation } from "@tanstack/react-query";


const useAddProject = () => {
  return useMutation({
    mutationFn: addProject,
    throwOnError: true,
  });
};

export default useAddProject;
