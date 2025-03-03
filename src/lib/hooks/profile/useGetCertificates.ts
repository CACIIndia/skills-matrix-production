import { useQuery } from "@tanstack/react-query";

import { BASE_URL } from "@/lib/api/index";
import { Skill } from "@prisma/client";

type CertificatesResponse = {
  category: string;
  skills: Skill[];
}[];

export const getCertificates = async (userId: string): Promise<any> => {
  try {
    const params = new URLSearchParams({
      userId,
    });

    const response = await fetch(
      `${BASE_URL}/certificates/list?${params.toString()}`,
    );

    const certificates = await response.json();

    return certificates;
  } catch (error) {
    console.error("Error fetching certificates:", error);

    return [];
  }
};

const useGetCertificates = (userId: string) => {
  return useQuery({
    queryKey: ["certificates", userId],
    queryFn: () => getCertificates(userId),
    throwOnError: true,
    enabled: !!userId,
  });
};

export default useGetCertificates;
