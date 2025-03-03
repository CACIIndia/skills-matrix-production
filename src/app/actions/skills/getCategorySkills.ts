"use server";

import db from "@/lib/db";

export async function getSkillCategories() {
  try {
    const skillCategories = await db.skillCategory.findMany({});
    return skillCategories;
  } catch (error) {
    console.error("Error fetching skill categories:", error);
    throw new Error("Internal Server Error");
  }
}
