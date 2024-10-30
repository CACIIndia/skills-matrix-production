import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json({ message: "Certificate ID is required" }, { status: 400 });
    }

    const updatedCertificate = await db.certification.update({
      where: { id },
      data: { status: "Inactive" },
    });

    return NextResponse.json({ message: "Certificate status updated to Inactive", updatedCertificate }, { status: 200 });
  } catch (error) {
    console.error("Error updating certificate status:", error);
    return NextResponse.json({ message: "Error updating certificate status" }, { status: 500 });
  }
}
