import { useQuery } from "@tanstack/react-query";

import { getProfile } from "@/lib/api/getProfile";

const useGetProfile = (userId: string) => {
  return useQuery({
    queryKey: ["profile", userId],
    queryFn: () => getProfile(userId),
    enabled: !!userId,
    throwOnError: true,
  });
};

export default useGetProfile;
