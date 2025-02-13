import { addProject } from "@/lib/api/addProject";
import { useMutation } from "@tanstack/react-query";


const useAddProject = () => {
  return useMutation({
    mutationFn: addProject
  });
};

export default useAddProject;
