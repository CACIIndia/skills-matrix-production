import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;
  

    const { discipline, specialism, employee_type, location, cost_centre } = await request.json();



    // Upsert the user's additional info (update if exists, create otherwise)
    const upsertedAdditionalInfo = await db.additionalInfo.upsert({
      where: { userId: id },
      update: {
        discipline,
        specialism,
        employeeType: employee_type, 
        location,
        costCentre: cost_centre, 
      },
      create: {
        userId: id,
        discipline,
        specialism,
        employeeType: employee_type, 
        location,
        costCentre: cost_centre, 
      },
      select: {
        id: true,
        discipline: true,
        specialism: true,
        employeeType: true,
        location: true,
        costCentre: true,
        userId: true,
      },
    });

    return NextResponse.json(
      { message: "Additional info upserted successfully", data: upsertedAdditionalInfo,success:true },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error upserting additional info:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
