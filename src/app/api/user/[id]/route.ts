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

    const [isLineManager, trainingEmployees] = await Promise.all([
      db.user.findFirst({
        where: {
          reportedToId: id,
        },
      }),
      db.training.findMany({
        where: {
          employeeId: id,
        },
        include: {
          trainingStatus: {
            select: {
              name: true, 
            },
          },
        },
      }),
    ]);

    const userWithLineManagerAndTrainingStatus = {
      ...user,
      isLineManager: !!isLineManager,
      trainingEmployees,
    };

    return NextResponse.json(
      { 
        user: userWithLineManagerAndTrainingStatus, 
        success: true 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error fetching user or checking line manager/training status:", error);
    return NextResponse.json(
      { error: "Internal Server Error" }, 
      { status: 500 }
    );
  }
}
