// /app/api/users/list/route.ts
import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const reportedToId = searchParams.get("reportedToId");

  try {
    const users = await db.user.findMany({
      where: reportedToId ? { reportedToId } : undefined,
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
        location: true,
        userSkills: {
          select: {
            skill: {
              select: {
                id: true,
                name: true,
               
              },
            },
          },
        },
      },
    });

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ message: "Error fetching users" }, { status: 500 });
  }
}
