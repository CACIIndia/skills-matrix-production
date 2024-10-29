import { BASE_URL } from "@/lib/api";

export const getUsers = async () => {
  try {
    const response = await fetch(`${BASE_URL}/users/list`);

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching profile details:", error);
  }
};
