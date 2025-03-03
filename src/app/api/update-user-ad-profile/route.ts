import { NextResponse } from "next/server";
import { updateUserMicrosoftProfile } from "@/app/actions/updateUserMicrosoftProfile";
import { UserDetails } from "@/lib/types/profile";
import { ERROR_CODES } from "@/lib/utils/errorCodes";

export async function POST(request: Request) {
  const { accessToken, user }: { accessToken: string; user: UserDetails } = await request.json();

  if (!accessToken || !user) {
    const response = {
      "success": false,
      "error_code": ERROR_CODES.BAD_REQUEST,
    };
    return NextResponse.json(response);
  }

  try {
    const response = await updateUserMicrosoftProfile(accessToken, user);
    return NextResponse.json(response);
  } catch (error) {
    const response =  {
      "success": false,
      "error_code": ERROR_CODES.INTERNAL_SERVER_ERROR,
    };
    return NextResponse.json(response);
  }
}
