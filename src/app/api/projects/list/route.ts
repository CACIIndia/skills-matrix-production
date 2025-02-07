import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search");

  try {
    const projects = await db.project.findMany({
      where: search
        ? {
            OR: [
              { name: { contains: search, mode: "insensitive" } },
              { code: { contains: search, mode: "insensitive" } },
            ],
          }
        : undefined,
      select: {
        id: true,
        name: true,
        code: true,
        description: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        profiles: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching projects" },
      { status: 500 },
    );
  }
}
