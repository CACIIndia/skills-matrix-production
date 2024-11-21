"use server";
import db from "@/lib/db";
import { getSession } from "@/lib/auth";

type DeleteTrainingResponse = {
  message: string;
  trainingId: string;
};

export async function deleteTraining(trainingId: string): Promise<DeleteTrainingResponse> {
  const session = await getSession();

  if (!session?.user) {
    throw new Error("User is not authenticated");
  }

  try {
    // Check if the training exists
    const training = await db.Training.findUnique({
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

    await db.Training.delete({
      where: {
        id: trainingId,
      },
    });

    return {
      message: "Training deleted successfully",
      trainingId,
    };
  } catch (error) {
    console.error("Error deleting training:", error);
    throw new Error("Failed to delete training. Please try again.");
  }
}
