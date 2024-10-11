import { useQuery } from "@tanstack/react-query";

import { getProfileDetails } from "@/lib/api/getProfileDetails";

const useGetProfileDetails = (userId: string) => {
  return useQuery({
    queryKey: ["profile-details", userId],
    queryFn: () => getProfileDetails(userId),
    enabled: !!userId,
    throwOnError: true,
  });
};

export default useGetProfileDetails;
