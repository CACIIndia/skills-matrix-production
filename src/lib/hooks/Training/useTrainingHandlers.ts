import { addTraining } from "@/app/actions/training/addTraining";
import { deleteTraining } from "@/app/actions/training/deleteTraining";
import { editTraining } from "@/app/actions/training/editTraining";

import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useTrainingHandlers = (userId: string, refetch: () => void) => {
  const queryClient = useQueryClient();
  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ["training", userId] });
  };

  // Function to add training data
  const addTrainingData = async (TrainingData: any,closeModal:()=>void) => {
    const toastId = toast.loading("Please wait...");
    try {
      const result = await addTraining(TrainingData);
      
      invalidate();
      closeModal();
      toast.success(result.message, { id: toastId });
      refetch();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred.";
      console.error("Error uploading certificate:", errorMessage);
      toast.error(errorMessage, { id: toastId });
    }
  };

  // Function to delete a training record
  const handleDelete = async (trainingId: string) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this training record?");

    if (!isConfirmed) {
      return;
    }
    const toastId = toast.loading("Deleting training...");

    try {
      const result = await deleteTraining(trainingId);
      console.log(result, "Delete result");

      invalidate();
      await refetch();
      toast.success("Training deleted successfully", { id: toastId });
     
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred.";
      console.error("Error deleting training:", errorMessage);
      toast.error(errorMessage, { id: toastId });
    }
  };

  // Function to edit a training record
  const handleEdit = async ( editingId:string,updatedTrainingData: any) => {
    const toastId = toast.loading("Please wait...");

    try {
      const result = await editTraining(editingId,updatedTrainingData);

      invalidate();
      toast.success(result.message, { id: toastId });
      refetch();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred.";
      console.error("Error editing training:", errorMessage);
      toast.error(errorMessage, { id: toastId });
    }
  };

  return { addTrainingData, handleDelete, handleEdit };
};
