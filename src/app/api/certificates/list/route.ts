import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json(
      { message: "User ID is required" },
      { status: 400 },
    );
  }

  try {
    const certificates = await db.certification.findMany({
      where: { createdById: userId, status: 1 },
      select: {
        id: true,
        name: true,
        url: true,
        obtainedDate: true,
        expiryDate: true,
        description: true,
        createdAt: true,
        updatedAt: true,
        status: true,
        createdById: true,
        categoryId: true,
        categoryName: true,
        isTrainingLinked: true,
        trainingRecordId: true,
        skillId: true,
        skillName: true,
        createdBy:{
          select:{
            name:true,
            id:true
          }
        },
        
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return NextResponse.json(certificates, { status: 200 });
  } catch (error) {
    console.error("Error fetching certificates:", error);
    return NextResponse.json(
      { message: "Error fetching certificates" },
      { status: 500 },
    );
  }
}
