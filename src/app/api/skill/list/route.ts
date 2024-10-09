import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
  const skills = await db.skill.findMany();

  const categorisedSkills = skills.reduce((acc: any, skill: any) => {
    const category = skill.category || "Other";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push({
      ...skill,
      level: 0,
    });
    return acc;
  }, {});

  if (!skills) {
    return NextResponse.json({ message: "Skills not found" }, { status: 404 });
  }

  return NextResponse.json(categorisedSkills);
}
