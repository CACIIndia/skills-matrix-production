"use client";
import React, { useState, useRef } from "react";
import { UserDetails } from "@/lib/types/profile";
import Image from "next/image";
import default_image from "../../../../public/assets/media/avatars/default-image.png";
import { FaEdit } from "react-icons/fa"; // Optional: Use an edit icon from react-icons
import {  uploadImage } from "@/app/utils/imageUpload";
import { useAppContext } from "@/app/context/AppContext";
import image_spinner from "../../../../public/assets/media/misc/spinner.gif";

type ProfileHeaderProps = {
  data: UserDetails;
};

const ProfileHeader = ({ data: { name, image, email, role, location ,id} }: ProfileHeaderProps) => {
  const [profileImage, setProfileImage] = useState<string>(image || "");
  const [uploading, setUploading] = useState(false);
  const { profile ,setProfile} = useAppContext();
  const fileInputRef = useRef<HTMLInputElement | null>(null); // Create a ref for the file input
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      alert("No file selected!");
      return;
    }
    try {
      setUploading(true);
      const uploadedImage = await uploadImage(file,id);
      setProfileImage(uploadedImage.image_url);
      setProfile({...profile,image:uploadedImage.image_url});
      
    } catch (uploadError: unknown) {
      if (uploadError instanceof Error) {
        console.error("Error uploading image:", uploadError);
        alert('Error uploading image: ' + uploadError.message);
      } else {
        console.error("Unknown error uploading image:", uploadError);
        alert('Error uploading image: Unknown error');
      }
    } finally {
      setUploading(false); // Reset uploading state after the process finishes
    }
  };

  const handleEditClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="hero-bg bg-cover bg-center bg-no-repeat">
      <div className="container-fixed">
        <div className="flex flex-col items-center gap-2 py-4 lg:gap-3.5 lg:pb-10 lg:pt-5">
          {/* Profile Image */}
          <div className="relative flex flex-col items-center gap-2">
            <Image
              className="profile_image border-3 border-success size-[100px] shrink-0 rounded-full"
              src={ uploading?image_spinner:  profileImage || default_image}
              alt={name}
              width={100}
              height={100}
            />
            
            {/* Edit Icon */}
            <button
              type="button"
              onClick={handleEditClick} // Trigger file input on button click
              className="absolute bottom-0 right-0 bg-gray-700 text-white p-1 rounded-full hover:bg-gray-500"
            >
              <FaEdit size={20} />
            </button>
          </div>

          {/* File Input for Uploading Image (hidden but triggered on button click) */}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            ref={fileInputRef} // Attach ref to the file input
            disabled={uploading}
          />

          {/* User Info */}
          <div className="flex items-center gap-1.5">
            <div className="text-lg font-semibold leading-5 text-gray-900">{name}</div>
            <svg
              className="text-primary"
              fill="none"
              height="16"
              width="15"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* SVG Path */}
            </svg>
          </div>
          <div className="lg:gap-4.5 flex flex-wrap justify-center gap-1 text-sm">
            {role && (
              <div className="gap-1.25 flex items-center">
                <i style={{ zIndex: -10 }} className="ki-filled ki-geolocation text-sm text-gray-500"></i>
                <span className="text-gray-600">{role}</span>
              </div>
            )}
            {location && (
              <div className="gap-1.25 flex items-center">
                <i style={{ zIndex: -10 }} className="ki-filled ki-geolocation text-sm text-gray-500"></i>
                <span className="text-gray-600">{location}</span>
              </div>
            )}
            <div className="gap-1.25 flex items-center">
              <i style={{ zIndex: -10 }} className="ki-filled ki-sms text-sm text-gray-500"></i>
              <a className="text-gray-600 hover:text-primary" href={`mailto:${email}`}>
                {email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
