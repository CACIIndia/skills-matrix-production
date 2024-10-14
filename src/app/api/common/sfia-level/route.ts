import { NextResponse } from "next/server";
import db from "@/lib/db"; // Comment out the db import for now

export async function GET() {
  // Temporarily use dummy data or an empty array for sfiaLevels

  const sfiaLevels = await db.sfiaLevel.findMany({});
  
  if (!sfiaLevels || sfiaLevels.length === 0) {
    return NextResponse.json({ message: "SFIA Levels not found" }, { status: 404 });
  }

  return NextResponse.json(sfiaLevels);
}
