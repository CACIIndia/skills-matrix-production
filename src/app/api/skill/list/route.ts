import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
  const skills = await db.skill.findMany({
    include: {
      skillCategory: true,
    },
  });

  if (!skills) {
    return NextResponse.json({ message: "Skills not found" }, { status: 404 });
  }

  const categorisedSkills = skills.reduce(
    (acc: Record<string, any[]>, skill: any) => {
      const category = skill.skillCategory?.name || "Other";
      acc[category] = [...(acc[category] || []), skill];
      return acc;
    },
    {},
  );

  const result = Object.entries(categorisedSkills)
    .sort(([categoryA], [categoryB]) => categoryA.localeCompare(categoryB))
    .map(([category, skills]) => ({
      category,
      skills,
    }));

  return NextResponse.json(result);
}

