import db from "@/lib/db";
import { NextResponse } from "next/server";



export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.employeeId || !body.projectId || !body.projectName || !body.roleInProject || body.isCurrentProject === undefined || !body.startDate) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

   
    const newProfile = await db.cACIProfile.create({
      data: {
        employeeId: body.employeeId,
        employeeName: body.employeeName,
        employeeImage: body.employeeImage || null,
        projectId: body.projectId,
        projectName: body.projectName,
        roleInProject: body.roleInProject,
        isCurrentProject: body.isCurrentProject,
        startDate: new Date(body.startDate),
        endDate: body.endDate ? new Date(body.endDate) : null,
        description: body.description || null,
      },
    });

    return NextResponse.json(newProfile, { status: 200 }); 

  } catch (error: unknown) {
    console.error("Error creating CACIProfile:", error);

    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "An unknown error occurred" }, { status: 500 });
  }
}
