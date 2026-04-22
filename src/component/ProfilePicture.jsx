import React from "react";
import { useAuth } from "../context/AuthContext";
import { Camera, User } from "lucide-react";

const ProfilePicture = () => {
  const { handleProfilePhotoUpload, uploading, profileImage } = useAuth();

  return (
    <div className="relative">
      <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden group cursor-pointer bg-gray-100">
        {/* Profile Image Display */}
        {profileImage ? (
          <img
            src={profileImage}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <User className="w-16 h-16 text-white" />
          </div>
        )}

        {/* Upload Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center rounded-full">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center text-white">
            <Camera className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">Change Photo</span>
          </div>
        </div>

        {/* Hidden File Input */}
        <input
          name="file"
          id="file"
          type="file"
          accept="image/png, image/jpeg, image/gif, image/webp, image/jpg, image/avif"
          onChange={handleProfilePhotoUpload}
          disabled={uploading}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer rounded-full"
        />

        {/* Loading State */}
        {uploading && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-full">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePicture;
