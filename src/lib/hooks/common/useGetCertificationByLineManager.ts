import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { Certificate } from "@/lib/types/profile";






const getCertificates = async (LineManagerID: string): Promise<Certificate[]> => {
  try {
    const response = await axiosInstance.get(`/certificates/my-team/list?userId=${LineManagerID}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching certificates data:", error);
    throw error;
  }
};

const useGetCertificatesByLineManager = (LineManagerID?: string) => {
    return useQuery({
      queryKey: ["certificates", LineManagerID],
      queryFn: () => getCertificates(LineManagerID as string),
      enabled: !!LineManagerID, 
    });
  };

export default useGetCertificatesByLineManager;
