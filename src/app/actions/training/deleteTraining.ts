"use server";
import db from "@/lib/db";
import { getSession } from "@/lib/auth";

type DeleteTrainingResponse = {
  message: string;
  trainingId: string;
  error:boolean;
};

export async function deleteTraining(trainingId: string): Promise<DeleteTrainingResponse> {
  const session = await getSession();

  if (!session?.user) {
    throw new Error("User is not authenticated");
  }

  try {
    // Check if the training exists
    const training = await db.training.findUnique({
      where: {
        id: trainingId,
      },
    });

    if (!training) {
      throw new Error("Training not found");
    }


    if (training.createdById !== session.user.id) {
      throw new Error("User is not authorized to delete this training");
    }

    await db.training.delete({
      where: {
        id: trainingId,
      },
    });

    return {
      message: "Training deleted successfully",
      trainingId,
      error:false
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
    console.error("Error deleting training:", errorMessage);
    return {
      message: errorMessage,
      error: true,
      trainingId
    };
  }
}
