import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params;

  const user = await db.user.findUnique({
    where: {
      id,
    },
    include: {
      additionalInfo: true,
      userSkills: {
        include: {
          skill: true,
        },
      },
      projects: true,
    },
  });

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  // Transform userSkills into an object with arrays for each skill category
  const categorizedSkills = user.userSkills.reduce(
    (acc, userSkill) => {
      const { category } = userSkill.skill;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(userSkill);
      return acc;
    },
    {} as Record<string, typeof user.userSkills>,
  );

  const transformedUser = {
    ...user,
    userSkills: categorizedSkills,
  };

  return NextResponse.json(transformedUser);
}
