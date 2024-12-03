import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { Training } from "@/lib/types/profile";


interface FetchTrainingParams {
  categoryName: string;
  skillId: string;
  fromDate: string;
  tentativeEndDate: string;
  employeeId: string;
  createdById: string;
}

const fetchTrainingRecords = async (
  params: FetchTrainingParams
): Promise<Training[]> => {
  const response = await axiosInstance.post("training/get-filtered-data", params);
  return response.data;
};


const useFetchTrainingRecords = (onError: (error: Error) => void) => {
  return useMutation<Training[], Error, FetchTrainingParams>({
    mutationFn: fetchTrainingRecords,
    onError,
  });
};

export { useFetchTrainingRecords, fetchTrainingRecords };
