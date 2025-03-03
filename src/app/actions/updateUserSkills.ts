"use server";

import db from "@/lib/db";
import { getFullUser } from "@/lib/prismaQueries";

export async function updateUserSkills(createdById: string, userSkills: any[]) {
  try {
    // Delete existing user skills for the user
    await db.userSkill.deleteMany({ where: { createdById } });

    // Create new user skills
    await db.userSkill.createMany({
      data: userSkills,
    });

    const updatedUser = await db.user.findUnique(getFullUser(createdById));

    return {
      message: "Skills updated successfully",
      updatedUser,
    };
  } catch (error) {
    console.error("Error updating skills:", error);
    throw new Error("Internal Server Error");
  }
}
