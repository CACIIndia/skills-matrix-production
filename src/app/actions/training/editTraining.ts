"use server";
import db from "@/lib/db";
import { getSession } from "@/lib/auth";

type TrainingEditData = {
  id: string; 
  categoryId: string;
  categoryName: string;
  skillId: string | null;
  skillName: string;
  fromDate: string;
  toDate: string;
  description: string;
  employeeId: string;
  employeeName: string;
  statusId: string;
};

type EditTrainingResponse = {
  message: string;
  training: {
    id: string;
    categoryId: string;
    categoryName: string;
    skillId: string | null;
    skillName: string;
    fromDate: Date;
    tentativeEndDate: Date;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    createdById: string;
    statusId: string;
  };
};

export async function editTraining(trainingId :string,data: TrainingEditData): Promise<EditTrainingResponse> {
  const session = await getSession();

  if (!session?.user) {
    throw new Error("User is not authenticated");
  }
   

  try {
    // Find the training record to edit
    const existingTraining = await db.training.findUnique({
      where: {
        id: trainingId,
      },
    });

    if (!existingTraining) {
      throw new Error("Training record not found");
    }

    // Update the training record
    const updatedTraining = await db.training.update({
      where: {
        id: trainingId,
      },
      data: {
        categoryId: data.categoryId,
        categoryName: data.categoryName,
        skillId: data.skillId,
        skillName: data.skillName,
        fromDate: new Date(data.fromDate),
        tentativeEndDate: new Date(data.toDate),
        description: data.description,
        employeeId: data.employeeId,
        employeeName: data.employeeName,
        statusId: data.statusId,
        updatedAt: new Date(), 
      },
    });

    return {
      message: "Training updated successfully",
      training: updatedTraining,
    };
  } catch (error) {
    console.error("Error updating training:", error);
    throw new Error("Failed to update training. Please try again.");
  }
}
