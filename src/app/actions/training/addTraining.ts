"use server";
import db from "@/lib/db";
import { getSession } from "@/lib/auth";

type TrainingAddData = {
  categoryId: string;
  categoryName: string;
  skillId: string;
  skillName: string;
  fromDate: string;
  toDate: string;
  description: string;
  employeeId: string;
  employeeName: string;
  statusId: string;
  statusInProgress?:boolean;
};

type AddTrainingResponse = {
  message: string;
  training: {
    id: string;
    categoryId: string;
    categoryName: string;
    skillId: string |null;
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

export async function addTraining(data: TrainingAddData): Promise<AddTrainingResponse> {
  const session = await getSession();

  if (!session?.user) {
    throw new Error("User is not authenticated");
  }

  try {
    if (data.statusInProgress) {
      const existingInProgressTraining = await db.training.findFirst({
        where: {
          employeeId: data.employeeId,
          status: {
            name: "In Progress",
          },
        },
      });
      if (existingInProgressTraining) {
        throw new Error("User already has In Progress training. Please complete the existing training first.");
      }
    }
    const newTraining = await db.training.create({
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
        createdById: session.user.id || "", 
        statusId: data.statusId,
      },
    });

    return {
      message: "Training added successfully",
      training: newTraining,
    };
  } catch (error: unknown) {
    console.error("Error adding training:", error);
    if (error instanceof Error) {
      throw new Error(error.message || "Failed to add training");
    } else {
      throw new Error("Failed to add training");
    }
  }
}
