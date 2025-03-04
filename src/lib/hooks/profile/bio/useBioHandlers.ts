import { addBio } from "@/app/actions/bio/addBio";
import toast from "react-hot-toast";

export const useBioHandlers = ( refetch: () => void) => {
  // Function to add training data
  const addBioData = async (BioData: any, closeModal: () => void) => {
    const toastId = toast.loading("Please wait...");
    try {
      const result = await addBio(BioData);
      if (result.error) {
        throw new Error(result.message);
      }

      closeModal();
      toast.success(result.message, { id: toastId });
      refetch();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred.";
      console.error("Error adding bio:", errorMessage);
      toast.error(errorMessage, { id: toastId });
    }
  };

  return { addBioData };
};
