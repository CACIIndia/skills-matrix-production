"use client";

import React, { useState, useRef, useEffect } from "react";
import { UserDetails } from "@/lib/types/profile";
import Image from "next/image";
import default_image from "../../../../public/assets/media/avatars/default-images.png";
import { uploadImage } from "@/app/utils/imageUpload";
import { useAppContext } from "@/app/context/AppContext";
import image_spinner from "../../../../public/assets/media/misc/spinner.gif";
import ProfileHeaderSkeleton from "@/components/skeletons/ProfileHeader";
import RoleIcon from "@/components/custom-icons/RoleIcon";
import LocationIcon from "@/components/custom-icons/LocationIcon";
import EmailIcon from "@/components/custom-icons/EmailIcon";

type ProfileHeaderProps = {
  data?: UserDetails;
  isLoading?: boolean;
  editProfile?: boolean;
};

const ProfileHeader = ({
  data,
  isLoading,
  editProfile,
}: ProfileHeaderProps) => {
  const { profile, setProfile } = useAppContext();

  const [profileImage, setProfileImage] = useState("");
  const [uploading, setUploading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      alert("No file selected!");
      return;
    }
    try {
      setUploading(true);
      const uploadedImage = await uploadImage(file, data?.id || "");
      setProfileImage(uploadedImage.image_url);
      setProfile({ ...profile, image: uploadedImage.image_url });
    } catch (uploadError: unknown) {
      console.error("Error uploading image:", uploadError);
      alert(
        "Error uploading image: " +
          (uploadError instanceof Error
            ? uploadError.message
            : "Unknown error"),
      );
    } finally {
      setUploading(false);
    }
  };

  const handleEditClick = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    if (data) {
      setProfileImage(data.image);
    }
  }, [data]);

  if (isLoading || !data) {
    return (
      <div className='hero-bg bg-cover bg-center bg-no-repeat'>
        <div className=''>
          <ProfileHeaderSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className='hero-bg bg-cover bg-center bg-no-repeat'>
      <div className='flex flex-col items-center gap-4'>
        {/* Profile Image */}
        <div className='flex flex-col items-center'>
          <Image
            className='profile_image border-3 border-success size-[100px] rounded-full object-cover'
            src={uploading ? image_spinner : profileImage || default_image}
            alt={data?.name || "Profile"}
            width={100}
            height={100}
          />
          <input
            type='file'
            accept='image/*'
            onChange={handleImageUpload}
            className='hidden'
            ref={fileInputRef}
            disabled={uploading}
          />
        </div>

        {/* Profile Details (Name, Role, Location, Email) */}
        <div className='mt-1 flex flex-col items-center gap-2'>
          {data?.name && (
            <div className='flex items-center gap-1.5'>
              <div className='font-inter text-lg font-bold text-gray-900'>
                {data?.name}
              </div>
              <svg
                className='text-primary'
                fill='none'
                height='16'
                viewBox='0 0 15 16'
                width='15'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M14.5425 6.89749L13.5 5.83999...'
                  fill='currentColor'
                ></path>
              </svg>
            </div>
          )}

          <div className='flex flex-wrap items-center justify-center gap-3 text-sm'>
            {data?.role && (
              <div className='flex items-center gap-1.5'>
                <RoleIcon />
                <span className='text-gray-800 text-[14px]'>{data?.role}</span>
              </div>
            )}
            {data?.location && (
              <div className='flex items-center gap-1.5'>
                <LocationIcon/>

                <span className='text-gray-800 text-[14px]'>{data?.location}</span>
              </div>
            )}
            {data?.email && (
              <div className='flex items-center gap-1.5'>
               <EmailIcon/>

                <a
                  className='text-gray-800 text-[14px] hover:text-primary'
                  href={`mailto:${data?.email}`}
                >
                  {data?.email}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
