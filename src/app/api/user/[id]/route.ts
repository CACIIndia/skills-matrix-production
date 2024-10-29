import { NextResponse } from "next/server";
import db from "@/lib/db";
import { getFullUser } from "@/lib/prismaQueries";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  const user = await db.user.findUnique(getFullUser(id));

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  return NextResponse.json(user);
}
