import db from "@/lib/db";
import { UserDetails } from "@/lib/types/profile";
import { uploadUserImageBuffer } from "./utils/uploadUserImageBuffer";
const GRAPH_API_BASE_URL = "https://graph.microsoft.com/v1.0";

const updateUserMicrosoftProfile = async (
  accessToken: string,
  user: UserDetails,
): Promise<UserDetails> => {
  try {
    console.log("Starting user profile update for:", user.id);
    let updatedUser = await updateProfilePhoto(accessToken, user);
    
    console.log("User profile photo update complete. Proceeding with profile details update...");
    updatedUser.id = user.id;
    updatedUser = await updateProfile(accessToken, user);
    
    console.log("Profile details update complete. Proceeding with manager information update...");
    updatedUser = await updateManager(accessToken, updatedUser);
    
    console.log("User profile update process completed for:", updatedUser);
    return updatedUser;
  } catch (error) {
    console.error(
      "Unexpected error during updating profile: ",
      error instanceof Error ? error.message : "Unknown error"
    );
    throw error;
  }
};

async function updateProfilePhoto(
  accessToken: string,
  user: UserDetails,
): Promise<UserDetails> {
  try {
    console.log("Attempting to update profile photo for user:", user.id);
    const imageBuffer = await fetchUserProfilePicture(accessToken);

    if (imageBuffer) {
      console.log("Profile photo fetched successfully. Uploading photo...");
      const profileImage = await uploadUserImageBuffer(imageBuffer, user.id);
      user.image = profileImage;
      console.log("Profile photo uploaded successfully.");
    } else {
      console.log("No profile picture found for the user:", user.id);
    }
    return user;
  } catch (error) {
    console.error("Error processing profile image for user:", user.id, error);
    throw error;
  }
}

async function updateProfile(
  accessToken: string,
  user: UserDetails,
): Promise<UserDetails> {
  try {
    console.log("Fetching user profile data from Microsoft Graph API...");
    const userProfile = await fetchUserProfile(accessToken);

    if (userProfile) {
      console.log("Updating user profile details in the database...");
      await db.user.update({
        where: { id: user.id },
        data: {
          location: userProfile.officeLocation,
          role: userProfile.jobTitle,
          phone: userProfile.mobilePhone,
        },
      });
      console.log("Database update successful for user:", user.id);

      user.location = userProfile.officeLocation;
      user.role = userProfile.jobTitle;
      user.phone = userProfile.mobilePhone;
    } else {
      console.log("User profile data not found for user:", user.id);
    }
    return user;
  } catch (error) {
    console.error("Error updating profile for user:", user.id, error);
    throw error;
  }
}

async function updateManager(
  accessToken: string,
  user: UserDetails,
): Promise<UserDetails> {
  try {
    console.log("Fetching manager information for user:", user.id);
    const manager = await fetchUserManager(accessToken);

    if (manager) {
      console.log("Updating manager information in the database...");
      await db.user.update({
        where: { id: user.id },
        data: {
          reportedTo: manager.displayName,
          reportedToId: manager.id,
        },
      });
      console.log("Manager information updated successfully for user:", user.id);

      user.reportedTo = manager.displayName;
      user.reportedToId = manager.id;
    } else {
      console.log("No manager data found for the user:", user.id);
    }
    return user;
  } catch (error) {
    console.error("Error updating manager information for user:", user.id, error);
    throw error;
  }
}

async function makeGraphRequest(
  accessToken: string,
  endpoint: string,
  method: string = "GET",
  body?: any,
): Promise<Response> {
  console.log(`Making ${method} request to ${endpoint} on Microsoft Graph API...`);
  const response = await fetch(`${GRAPH_API_BASE_URL}${endpoint}`, {
    method,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  console.log(`Response from Microsoft Graph API: ${response.status} ${response.statusText}`);
  return response;
}

export async function fetchUserProfile(accessToken: string): Promise<any> {
  console.log("Fetching user profile...");
  const response = await makeGraphRequest(accessToken, "/me");
  return response.json();
}

export async function fetchUserManager(accessToken: string): Promise<any> {
  console.log("Fetching user manager data...");
  const response = await makeGraphRequest(accessToken, "/me/manager");
  return response.json();
}

export async function fetchUserProfilePicture(
  accessToken: string,
): Promise<Buffer | null> {
  console.log("Fetching user profile photo...");
  const response = await makeGraphRequest(accessToken, "/me/photo/$value");

  if (response.status === 404) {
    console.log("No profile photo found for user.");
    return null;
  }

  if (!response.ok) {
    throw new Error(
      `Error fetching profile photo: ${response.status} - ${response.statusText}`
    );
  }

  try {
    const arrayBuffer = await response.arrayBuffer();
    console.log("Profile photo fetched successfully as an array buffer.");
    return Buffer.from(arrayBuffer);
  } catch (error) {
    console.error(
      "Unexpected error during fetching profile photo:",
      error instanceof Error ? error.message : "Unknown error"
    );
    throw error;
  }
}

// Exporting main function
export { updateUserMicrosoftProfile };
