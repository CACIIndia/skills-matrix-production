"use server";

import db from "@/lib/db";
import { revalidateTag } from "next/cache";

export async function updateUserSkills(userId: string, userSkills: any[]) {
  try {
    // Delete existing user skills for the user
    await db.userSkill.deleteMany({ where: { userId } });

    // Create new user skills
    const updatedSkills = await db.userSkill.createMany({
      data: userSkills.map((skill: any) => ({
        userId,
        skillId: skill.id,
        level: skill.level,
      })),
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
