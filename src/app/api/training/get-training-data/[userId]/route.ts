import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(request: Request, { params }: { params: { userId: string } }) {
  const { userId } = params;
  const url = new URL(request.url);
  const filter_status = url.searchParams.get("filter_status");
  const filter_type = url.searchParams.get("filter_type"); 

  try {
    let statusId = null;

    if (filter_status) {
      const status = await db.trainingStatus.findFirst({
        where: {
          name: filter_status,
        }
      });

      if (status) {
        statusId = status.id;
      }
    }

  
    const whereCondition: any = {};
    if (filter_type === "createdBy") {
      whereCondition.createdById = userId;
 
    } else if (filter_type === "employeeId") {
      whereCondition.employeeId = userId;
    } else {
      return NextResponse.json(
        { error: "Invalid filter type provided" },
        { status: 400 }
      );
    }
    whereCondition.status =1;
    if (statusId) {
      whereCondition.statusId = statusId;
    }

    const trainingData = await db.training.findMany({
      where: whereCondition,
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
        trainingStatus: {
         select:{
          name: true,
         }
        },
        employeeId: true,
        employeeName: true,
        employee: {
          select: {
            role: true, 
          },
        },
      },
    });
    const formattedtrainingData = trainingData.map(training => ({
      ...training,
      trainingStatus: training.trainingStatus.name,
    }));

    return NextResponse.json(
      { message: "Training data retrieved successfully", data: formattedtrainingData, success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching training data:", error);
    return NextResponse.json(
      { error: error },
      { status: 500 }
    );
  }
}
