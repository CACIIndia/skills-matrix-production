import { BASE_URL } from "@/lib/api";

export const getProfileDetails = async (userId: string) => {
  try {
    const response = await fetch(`${BASE_URL}/user/${userId}`, {
      next: { tags: ["user-details"] },
    });

    const profile = await response.json();

    return profile;
  } catch (error) {
    console.error("Error fetching profile details:", error);
  }
};
