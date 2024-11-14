import db from "@/lib/db";

export async function getLineManager(userId: string): Promise<boolean> {
  
  if (!userId || typeof userId !== "string") {
    throw new Error("User ID is required and should be a string");
  }

  try {
   
    const lineManager = await db.user.findFirst({
      where: {
        reportedToId: userId,
      },
    });

   
    return !!lineManager;
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error checking line manager:", error);

    // Handle specific error cases
    if (error instanceof Error) {
      throw new Error(`Error occurred while checking line manager: ${error.message}`);
    }

    // Return a generic error message for unforeseen issues
    throw new Error("An unexpected error occurred while checking the line manager.");
  }
}
