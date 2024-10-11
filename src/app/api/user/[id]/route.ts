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

  return NextResponse.json(user);
}
