import db from "@/lib/db";
import { UserDetails } from "@/lib/types/profile";
import { uploadUserImageBuffer } from "./utils/uploadUserImageBuffer";
const GRAPH_API_BASE_URL = "https://graph.microsoft.com/v1.0";

const updateUserMicrosoftProfile = async (
  accessToken: string,
  user: UserDetails,
): Promise<UserDetails> => {
  try {
    let updatedUser = await updateProfilePhoto(accessToken, user);
    console.log(updatedUser, "updatedUserupdatedUser");
    updatedUser.id = user.id;
    updatedUser = await updateProfile(accessToken, user);
    updatedUser = await updateManager(accessToken, updatedUser);
    return updatedUser;
  } catch (error) {
    throw new Error(
      "Unexpected error during updating profile: " +
        (error instanceof Error ? error.message : "Unknown error"),
    );
  }
};

async function updateProfilePhoto(
  accessToken: string,
  user: UserDetails,
): Promise<UserDetails> {
  try {
    console.log("Updating profile photo for user:", user);
    const imageBuffer = await fetchUserProfilePicture(accessToken);
    console.log(imageBuffer,"imageBufferimageBuffer");

    if (imageBuffer) {
      const profileImage = await uploadUserImageBuffer(imageBuffer, user.id);
      user.image = profileImage;
    } else {
      console.log("No profile picture found for the user.");
    }
    return user;
  } catch (error) {
    console.error("Error processing profile image:", error);
    throw error;
  }
}

async function updateProfile(
  accessToken: string,
  user: UserDetails,
): Promise<UserDetails> {
  try {
    const userProfile = await fetchUserProfile(accessToken);
    if (userProfile) {
      await db.user.update({
        where: { id: user.id },
        data: {
          location: userProfile.officeLocation,
          role: userProfile.jobTitle,
          phone: userProfile.mobilePhone,
        },
      });

      user.location = userProfile.officeLocation;
      user.role = userProfile.jobTitle;
      user.phone = userProfile.mobilePhone;
    } else {
      console.log("User profile data not found.");
    }
    return user;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
}

async function updateManager(
  accessToken: string,
  user: UserDetails,
): Promise<UserDetails> {
  try {
    const manager = await fetchUserManager(accessToken);
    if (manager) {
      await db.user.update({
        where: { id: user.id },
        data: {
          reportedTo: manager.displayName,
          reportedToId: manager.id,
        },
      });

      user.reportedTo = manager.displayName;
      user.reportedToId = manager.id;
    } else {
      console.log("No manager data found for the user.");
    }
    return user;
  } catch (error) {
    console.error("Error updating manager information:", error);
    throw error;
  }
}

async function makeGraphRequest(
  accessToken: string,
  endpoint: string,
  method: string = "GET",
  body?: any,
): Promise<Response> {
  const response = await fetch(`${GRAPH_API_BASE_URL}${endpoint}`, {
    method,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
 


  if (!response.ok) {
    throw new Error(
      `Error ${method} ${endpoint}: ${response.status} - ${response.statusText}`,
    );
  }

  return response;
}

export async function fetchUserProfile(accessToken: string): Promise<any> {
  const response = await makeGraphRequest(accessToken, "/me");
  return response.json();
}

export async function fetchUserManager(accessToken: string): Promise<any> {
  const response = await makeGraphRequest(accessToken, "/me/manager");
  return response.json();
}

export async function fetchUserProfilePicture(
  accessToken: string,
): Promise<Buffer | null> {
  const response = await makeGraphRequest(accessToken, "/me/photo/$value");
  console.log(response,"response");

  if (response.status === 404) {
    return null; // No photo found
  }

  if (!response.ok) {
    throw new Error(
      `Error fetching profile photo: ${response.status} - ${response.statusText}`,
    );
  }

  try {
    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer);
  } catch (error) {
    throw new Error(
      "Unexpected error during fetching profile photo: " +
        (error instanceof Error ? error.message : "Unknown error"),
    );
  }
}



// Exporting main function
export { updateUserMicrosoftProfile };
