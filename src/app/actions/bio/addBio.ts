"use server";
import db from "@/lib/db";
import { getSession } from "next-auth/react";

type AddBioData = {
  userId: string;
  bioDetails: string;
};
type AddBioResponse = {
  message: string;
  error: boolean;
};
export async function addBio(data: AddBioData): Promise<AddBioResponse> {
  const session = await getSession();

  if (!session?.user) {
    throw new Error("User is not authenticated");
  }

  try {
    await db.user.update({
      data: {
        aboutMe: data.bio,
      },
      where: {
        id: data.userId,
      },
    });

    return {
      message: "Bio added successfully",
      error: false,
    };
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred.";
    console.error("Error adding bio:", errorMessage);
    return {
      message: errorMessage,
      error: true,
    };
  }
}
