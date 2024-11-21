import { NextResponse } from "next/server";
import db from "@/lib/db";
import { getFullUser } from "@/lib/prismaQueries";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const user = await db.user.findUnique(getFullUser(id));

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const isLineManager = await db.user.findFirst({
      where: {
        reportedToId: id,
      },
    });

    const userWithLineManagerStatus = {
      ...user,
      isLineManager: !!isLineManager,
    };

    return NextResponse.json(
      { 
        user: userWithLineManagerStatus, 
        success: true 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error fetching user or checking line manager status:", error);
    return NextResponse.json(
      { error: "Internal Server Error" }, 
      { status: 500 }
    );
  }
}
