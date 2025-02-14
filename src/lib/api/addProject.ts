import { BASE_URL } from "@/lib/api";

interface ProjectData {
  employeeId: string;
  employeeName: string;
  employeeImage?: string;
  projectId: string;
  projectName: string;
  roleInProject: string;
  isCurrentProject: boolean;
  startDate: string;
  endDate?: string;
  description?: string;
}

export const addProject = async (projectData: ProjectData) => {
  try {
    const response = await fetch(`${BASE_URL}/projects/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(projectData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.message || "Failed to add project");
    }

    return await response.json();
  } catch (error) {
    console.error("Error adding project:", error);
    throw error;
  }
};
