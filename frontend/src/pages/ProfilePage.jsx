import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera } from "lucide-react";

function ProfilePage() {
  const { authUser, updateProfile, isUpdatingProfile } = useAuthStore();
  const [selectedImage, setSelectedImage] = useState(null);
  console.log(authUser);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64 = reader.result;
      setSelectedImage(base64);
      await updateProfile({ profilePic: base64 });
    };
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-1/2 flex flex-col gap-y-6">
        <div className="bg-zinc-900 p-4 rounded-md">
          <div className="flex flex-col items-center space-y-2">
            <h2 className="text-2xl font-semibold">Profile</h2>
            <p>Your profile information</p>

            <div className="relative size-[6rem] mt-2 rounded-full bg-gray-300 border-2">
              <img
                src={
                  selectedImage ||
                  authUser.profilePic ||
                  "https://images.unsplash.com/photo-1634896941598-b6b500a502a7?q=80&w=1956&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                }
                alt="Profile"
                className="w-full h-full object-cover object-top rounded-full"
              />
              <label
                htmlFor="avatar-upload"
                className="absolute bottom-0 right-0 p-2 bg-zinc-800 rounded-full cursor-pointer"
              >
                <Camera />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm mt-2">
              {isUpdatingProfile
                ? "Updating profile..."
                : "Click the camera icon to upload a new profile picture"}
            </p>
          </div>

          <form>
            <div className="flex flex-col gap-y-4 mt-4">
              <div className="flex flex-col gap-y-2">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={authUser?.fullName || "N/A"}
                  className="p-2 rounded-md bg-zinc-800"
                  disabled
                />
              </div>

              <div className="flex flex-col gap-y-2">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={authUser?.email || "N/A"}
                  className="p-2 rounded-md bg-zinc-800"
                  disabled
                />
              </div>
            </div>
          </form>
        </div>

        <div className="bg-zinc-900 p-4 rounded-md">
          <h2 className="text-xl font-semibold mb-4">Account Information</h2>

          {[
            {
              label: "Member Since",
              value: authUser?.createdAt?.split("T")[0] || "N/A",
            },
            {
              label: "Last Updated",
              value: authUser?.updatedAt?.split("T")[0] || "N/A",
            },
            {
              label: "Account Status",
              value: authUser?.isVerified ? "Verified" : "Not Verified",
            },
          ].map((info, idx) => (
            <div
              key={idx}
              className="flex justify-between py-2 border-b border-zinc-600"
            >
              <p>{info.label}</p>
              <p>{info.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
