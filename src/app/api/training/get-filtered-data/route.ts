import { NextResponse } from "next/server";
import db from "@/lib/db";
import { newDate } from "react-datepicker/dist/date_utils";

export async function POST(request: Request) {
  try {
    const {
      categoryName,
      skillId,
      fromDate,
      tentativeEndDate,
      employeeId,
      createdById
    } = await request.json();

   

    const trainings = await db.training.findMany({
      where: {
        ...(categoryName && { categoryName }),
        ...(skillId && { skillId }),
       
        ...(fromDate && {fromDate: { gte: new Date(fromDate as string).toISOString()}}),
        ...(tentativeEndDate && {tentativeEndDate: { lte: new Date(tentativeEndDate as string).toISOString()}}),
        ...(employeeId && { employeeId }),
        createdById,
        
      },
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
      orderBy: {
        createdAt: "asc",
      },
    });

    return NextResponse.json(trainings, { status: 200 });
  } catch (error) {
    console.error("Error fetching training records:", error);
    return NextResponse.json({ message: "Error fetching training records" }, { status: 500 });
  }
}
