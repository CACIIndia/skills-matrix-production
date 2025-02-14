import { NextResponse } from "next/server";
import { db } from "@/lib/db"; 

export async function PUT(req: Request) {
  try {
    const body = await req.json();
  

    if (!body.profileId) {
      return NextResponse.json({ message: "Profile ID is required" }, { status: 400 });
    }

    const updatedProfile = await db.cACIProfile.update({
      where: { id: body.profileId },
      data: {
        projectId: body.projectId,
        projectName: body.projectName,
        roleInProject: body.roleInProject,
        isCurrentProject: body.isCurrentProject,
        startDate: body.startDate ? new Date(body.startDate) : undefined,
        endDate: body.endDate ? new Date(body.endDate) : null,
      },
    });

    return NextResponse.json(updatedProfile, { status: 200 });
  } catch (error: unknown) {
    console.error("Error updating CACIProfile:", error);

    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "An unknown error occurred" }, { status: 500 });
  }
}
