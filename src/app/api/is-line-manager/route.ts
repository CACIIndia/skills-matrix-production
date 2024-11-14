import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json(
      { error: "User ID is required and should be a string" },
      { status: 400 }
    );
  }

  try {
    const lineManager = await db.user.findFirst({
      where: {
        reportedToId: userId,
      },
    });

    return NextResponse.json({ isLineManager: !!lineManager }, { status: 200 });
  } catch (error) {
    console.error("Error checking line manager:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
