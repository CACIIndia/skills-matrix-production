import { BASE_URL } from "@/lib/api/index";
import { Project } from "@prisma/client";

export const getProjects = async (search?: string): Promise<Project[]> => {
  try {
    let url = `${BASE_URL}/projects/list`;
    if (search) {
      url += `?search=${encodeURIComponent(search)}`;
    }

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch projects");
    }

    return response.json();
  } catch (error) {
    return [];
  }
};
