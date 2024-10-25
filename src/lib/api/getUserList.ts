import { BASE_URL } from "@/lib/api";

export const getUsersList = async () => {
  try {
    const response = await fetch(`${BASE_URL}/users/list`, {
      next: { tags: ["user-list"] },
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching profile details:", error);
  }
};
