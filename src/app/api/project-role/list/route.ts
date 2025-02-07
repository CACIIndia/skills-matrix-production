import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const projectRoles = await prisma.projectRole.findMany({
      orderBy: { createdAt: "desc" }
    });

    return NextResponse.json(projectRoles, { status: 200 });
  } catch (error) {
    console.error("Error fetching project roles:", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
