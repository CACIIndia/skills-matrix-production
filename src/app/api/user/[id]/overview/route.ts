import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;

    const { phone, sfiaLevel, reportedTo } = await request.json();

    // Update the user's general info
    const updatedGeneralInfo = await db.user.update({
      where: { id },
      data: {
        phone,
        sfiaLevel:sfiaLevel,
        reportedTo:reportedTo,
      },
    });

    return NextResponse.json(
      { message: "General info updated successfully", data: updatedGeneralInfo },
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
