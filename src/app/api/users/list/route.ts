// /app/api/users/list/route.ts (for the App Router)
import { NextResponse } from "next/server";
import db from "@/lib/db"; // Assuming you have a Prisma or database connection

export async function GET() {
  try {
    const users = await db.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        image: true, // Assuming 'image' is a field in your User model
      },
    });

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ message: "Error fetching users" }, { status: 500 });
  }
}
