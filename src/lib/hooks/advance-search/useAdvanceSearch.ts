import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "@/lib/api/getUsers";

export const useSearchUsers = (query: any) => {
  const wrappedQuery = {
    queryRules: query,
  };
  return useQuery({
    queryKey: ["searchUsers", wrappedQuery],
    queryFn: () => fetchUsers(wrappedQuery),
    enabled: !!query,
  });
};

