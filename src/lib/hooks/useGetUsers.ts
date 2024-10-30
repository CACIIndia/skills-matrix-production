import { useQuery } from "@tanstack/react-query";
import { getUsers } from "@/lib/api/getUsers";

const useGetUsers = () => {
  return useQuery({
    queryKey: ["user-list"],
    queryFn: () => getUsers(),
    throwOnError: true,
  });
};

export default useGetUsers;
