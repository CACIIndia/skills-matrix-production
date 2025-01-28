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

type UserResponse = {
  id: string;
  name: string;
  location: string;
  jobTitle: string;
}[];

export const fetchUsers = async (query: any): Promise<UserResponse> => {
  try {
    if (query?.queryRules?.rules?.length === 0) {
    } else {
      const hasValidValues = (queryRules: any): boolean => {
        return queryRules.rules.some((rule: any) => {
          if ("rules" in rule) {
            return hasValidValues(rule);
          } else {
            return rule.value && rule.value.trim() !== "";
          }
        });
      };
      if (!hasValidValues(query.queryRules)) {
        console.error("Invalid query: missing values in some rules.");
        return []; 
      }
    }
    const response = await fetch(`${BASE_URL}/advance-search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(query),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};
