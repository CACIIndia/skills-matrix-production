import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;

    const { userSkills } = await request.json();

    // Delete existing user skills for the user
    await db.userSkill.deleteMany({ where: { createdById: id } });

    // Create new user skills
    const updatedSkills = await db.userSkill.createMany({
      data: userSkills.map((skill: any) => ({
        createdById: id,
        skillId: skill.id,
        level: skill.level,
      })),
    });

    return NextResponse.json(
      { message: "Skills updated successfully", count: updatedSkills.count },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error updating skills:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
