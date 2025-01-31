import db from "@/lib/db";
import { UserDetails } from "@/lib/types/profile";
import { uploadUserImageBuffer } from "./utils/uploadUserImageBuffer";
import { fetchUserManager, fetchUserProfile, fetchUserProfilePicture } from "@/lib/microsoft-graph";


const updateUserMicrosoftProfile = async (
  accessToken: string,
  user: UserDetails,
): Promise<UserDetails> => {
  try {
    let updatedUser = await updateProfilePhoto(accessToken, user);
    updatedUser.id = user.id;
    updatedUser = await updateProfile(accessToken, user);
    updatedUser = await updateManager(accessToken, updatedUser);
    return updatedUser;
  } catch (error) {
    console.error(
      "Unexpected error during updating profile: ",
      error instanceof Error ? error.message : "Unknown error",
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
      const profileImage = await uploadUserImageBuffer(imageBuffer, user.id);
      user.image = profileImage;
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
    const userProfile = await fetchUserProfile(accessToken);

    if (userProfile) {
      await db.user.update({
        where: { id: user.id },
        data: {
          name: userProfile.displayName,
          location: userProfile.officeLocation,
          role: userProfile.jobTitle,
          phone: userProfile.mobilePhone,
        },
      });
      user.name = userProfile.displayName;  
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
      user.reportedTo = manager.displayName;
      user.reportedToId = manager.id;
    } else {
      console.log("No manager data found for the user:", user.id);
    }
    return user;
  } catch (error) {
    console.error(
      "Error updating manager information for user:",
      user.id,
      error,
    );
    throw error;
  }
}



// Exporting main function
export { updateUserMicrosoftProfile };
