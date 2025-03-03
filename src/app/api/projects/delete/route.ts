import { NextResponse } from "next/server";
import { db } from "@/lib/db"; 

export async function DELETE(req: Request) {
  try {
    const { profileId } = await req.json();

    if (!profileId) {
      return NextResponse.json({ message: "Profile ID is required" }, { status: 400 });
    }

    const deletedProfile = await db.cACIProfile.delete({
      where: { id: profileId },
    });

    return NextResponse.json({ message: "Profile deleted successfully" }, { status: 200 });
  } catch (error: unknown) {
    console.error("Error deleting CACIProfile:", error);

    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "An unknown error occurred" }, { status: 500 });
  }
}
