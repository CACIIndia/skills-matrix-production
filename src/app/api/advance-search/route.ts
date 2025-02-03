import { parseQueryRules } from "@/app/actions/utils/searchQueryParser";
import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const reqBody = await req.json();
  const queryRules = reqBody.queryRules;
  if (!queryRules) {
    return NextResponse.json(
      { error: "Query rules not provided" },
      { status: 404 },
    );
  }

  try {
    const whereConditions = parseQueryRules(queryRules);
    const persons = await db.user.findMany({
      where: whereConditions,
    });
    return NextResponse.json(persons, { status: 200 });
  } catch (error) {
    console.error("Error fetching persons:", error);
  }
}
