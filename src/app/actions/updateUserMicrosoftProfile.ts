import db from "@/lib/db";
import { UserDetails } from "@/lib/types/profile";
import { uploadUserImageBuffer } from "./utils/uploadUserImageBuffer";
import { fetchUserManager, fetchUserProfile, fetchUserProfilePicture } from "@/lib/microsoft-graph";
import { ERROR_CODES } from "@/lib/utils/errorCodes";

const updateUserMicrosoftProfile = async (
  accessToken: string,
  user: UserDetails,
) => {
  const userId = user.id;

  let response = {
    "success": false,
    "error_code": '',
  };

  const updateProfilePhotoResponse = await updateProfilePhoto(accessToken, userId);
  if (!updateProfilePhotoResponse.success) {
    response.error_code = updateProfilePhotoResponse.error_code;
    return response;
  }

  const updateProfileResponse = await updateProfile(accessToken, userId);
  if (!updateProfileResponse.success) {
    response.error_code = updateProfileResponse.error_code;
    return response;
  }

  const updateManagerResponse = await updateManager(accessToken, userId);
  if (!updateManagerResponse.success) {
    response.error_code = updateManagerResponse.error_code;
    return response;
  }

  response.success = true;
  
  return response;
};

async function updateProfilePhoto(
  accessToken: string,
  userId: string,
) {
  let response = {
    "success": false,
    "error_code": '',
  };

  const imageBuffer = await fetchUserProfilePicture(accessToken);
  if (imageBuffer && !Buffer.isBuffer(imageBuffer)) {
    response.error_code = imageBuffer.error || ERROR_CODES.UNKNOWN_ERROR;
  } else {
    const profileImage = await uploadUserImageBuffer(imageBuffer, userId);
    response.success = true;
  }

  return response;
}

async function updateProfile(
  accessToken: string,
  userId: string,
) {
  let response = {
    "success": false,
    "error_code": '',
  };
    const userProfile = await fetchUserProfile(
      accessToken,
      'id,mail,displayName,jobTitle,officeLocation,mobilePhone,employeeHireDate'
    );
    if (userProfile.error) {
      response.error_code = userProfile.error || ERROR_CODES.UNKNOWN_ERROR;
    } else {
      await db.user.update({
        where: { id: userId },
        data: {
          name: userProfile.displayName,
          location: userProfile.officeLocation,
          role: userProfile.jobTitle,
          phone: userProfile.mobilePhone,
          joiningDate: userProfile.employeeHireDate,
        },
      });
      response.success = true;
    }

  return response;
}


async function updateManager(
  accessToken: string,
  userId: string,
) {
  let response = {
    "success": false,
    "error_code": '',
  };
    const manager = await fetchUserManager(accessToken);

    if (manager.error) {
      response.error_code = manager.error || ERROR_CODES.UNKNOWN_ERROR;
    } else {
      await db.user.update({
        where: { id: userId },
        data: {
          reportedTo: manager.displayName,
          reportedToId: manager.id,
        },
      });
      response.success = true;
    }

  return response;
}

export { updateUserMicrosoftProfile};
