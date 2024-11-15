import { useQuery } from "@tanstack/react-query";
import { getSkillCategories } from "@/app/actions/skills/getCategorySkills";

const useGetSkillCategory = () => {
  return useQuery({
    queryKey: ["skills-category-list"],
    queryFn: () => getSkillCategories(),
    throwOnError: true,
  });
};

export default useGetSkillCategory;
