import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lineManagerId = searchParams.get("userId");

  if (!lineManagerId) {
    return NextResponse.json({ message: "Line Manager ID is required" }, { status: 400 });
  }

  try {
    const reportingUsers = await db.user.findMany({
      where: { reportedToId: lineManagerId },
      select: { id: true },
    });

    const reportingUserIds = reportingUsers.map((user) => user.id);

    const certificates = await db.certification.findMany({
      where: {
        status: 1,
        createdById: {
          in: reportingUserIds,
        },
      },
      select: {
        id: true,
        name: true,
        url: true,
        obtainedDate: true,
        expiryDate: true,
        description: true,
        createdAt: true,
        updatedAt: true,
        status: true,
        createdById: true,
        createdBy: {
          select: {
           name:true 
          }
        },
        categoryName: true,
      
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
    const formattedCertificates = certificates.map(cert => ({
      ...cert,
      employeeName: cert.createdBy.name, 
      createdBy: undefined, 
    }));
    
    return NextResponse.json(formattedCertificates, { status: 200 });
  } catch (error) {
    console.error("Error fetching line manager certificates list:", error);
    return NextResponse.json({ message: "Error fetching line manager certificates list" }, { status: 500 });
  }
}
