import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(request: Request, { params }: { params: { userId: string } }) {
  const { userId } = params;

  try {
    const trainingData = await db.Training.findMany({
      where: { createdById: userId },
      select: {
        id: true,
        categoryId: true,
        categoryName: true,
        skillId: true,
        skillName: true,
        fromDate: true,
        tentativeEndDate: true,
        description: true,
        createdAt: true,
        updatedAt: true,
        createdById: true,
        statusId: true,
        employeeId: true,
        employeeName: true,
      },
    });
    return NextResponse.json(
      { message: "Training data retrieved successfully", data: trainingData },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching training data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
