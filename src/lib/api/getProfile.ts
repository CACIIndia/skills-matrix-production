import { BASE_URL } from "@/lib/api";

export const getProfile = async (userId: string) => {
  try {
    const response = await fetch(`${BASE_URL}/user/${userId}`);

    const profile = await response.json();

    return profile;
  } catch (error) {
    console.error("Error fetching profile:", error);
  }
};
