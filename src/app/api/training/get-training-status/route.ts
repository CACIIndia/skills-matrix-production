
import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(request: Request) {
  try {
    const trainingStatus = await db.trainingStatus.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    return NextResponse.json(
      { message: "Training status retrieved successfully", data: trainingStatus, success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching training status:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
