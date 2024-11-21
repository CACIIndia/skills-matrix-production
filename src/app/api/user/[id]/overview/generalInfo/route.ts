import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;
  

    const { phone, sfia_level, reported_to,reported_to_id } = await request.json();



    // Update the user's general info
    const updatedGeneralInfo = await db.user.update({
      where: { id },
      data: {
        phone,
        sfiaLevel:sfia_level,
        reportedTo:reported_to,
        reportedToId:reported_to_id,
      },
    });

    return NextResponse.json(
      { message: "General info updated successfully", data: updatedGeneralInfo ,success:true},
      { status: 200 },
    );
  } catch (error) {
    console.error("Error updating general info:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
