import { NextResponse } from "next/server";
import { updateUserMicrosoftProfile } from "@/app/actions/updateUserMicrosoftProfile";
import { UserDetails } from "@/lib/types/profile";

export async function POST(request: Request) {
  const { accessToken, user }: { accessToken: string; user: UserDetails } = await request.json();

  if (!accessToken || !user) {
    return NextResponse.json({ message: "Access token and user data are required" }, { status: 400 });
  }

  try {
    const updatedUser = await updateUserMicrosoftProfile(accessToken, user);
    return NextResponse.json({ success: true, updatedUser });
  } catch (error) {
    console.error("Error updating Microsoft profile:", error);
    return NextResponse.json({ message: "Error updating profile", error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 });
  }
}
