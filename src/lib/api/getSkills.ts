import { BASE_URL } from "@/lib/api/index";
import { Skill } from "@prisma/client";

type SkillsResponse = {
  category: string;
  skills: Skill[];
}[];

export const getSkills = async (): Promise<SkillsResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/skill/list`);

    const skills = await response.json();

    return skills;
  } catch (error) {
    console.error("Error fetching skills:", error);

    return [];
  }
};
