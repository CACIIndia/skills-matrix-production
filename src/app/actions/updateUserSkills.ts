"use server";

import db from "@/lib/db";
import { revalidateTag } from "next/cache";

export async function updateUserSkills(createdById: string, userSkills: any[]) {
  try {
    // Delete existing user skills for the user
    await db.userSkill.deleteMany({ where: { createdById } });

    // Create new user skills
    const updatedSkills = await db.userSkill.createMany({
      data: userSkills,
    });

    revalidateTag("user-details");

    return {
      message: "Skills updated successfully",
      count: updatedSkills.count,
    };
  } catch (error) {
    console.error("Error updating skills:", error);
    throw new Error("Internal Server Error");
  }
}
