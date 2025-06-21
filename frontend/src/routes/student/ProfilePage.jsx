import React, { useState } from "react";
import Header from "../../components/Client/Header";
import Sidebar from "../../components/Client/Sidebar";
import useUserEditProfile from "../../hooks/useUserEditProfile";
import { useDispatch } from "react-redux";

const ProfilePage = () => {
  const [name, setUserName] = useState(localStorage.getItem("name") || "");
  const [email] = useState("nimay@example.com"); // Placeholder
  const [profilePic, setProfilePic] = useState(null);
  const [preview, setPreview] = useState(null);

  const { mutate: updateProfile, isLoading } = useUserEditProfile();
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    updateProfile({name,profilePic}, {
      onSuccess: (res) => {
        localStorage.setItem("name", res.user.name);
        if (res.user.profilePic) {
          localStorage.setItem("profilePic", res.user.profilePic);
        }
        // Refresh the page
        window.location.reload();
      },
      onError: (err) => {
        alert(err.message || "Profile update failed");
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>

          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-md shadow-md max-w-xl"
          >
            {/* Profile Picture */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden">
                {preview ? (
                  <img
                    src={preview}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 font-bold text-xl">
                    {name
                      ? name
                          .split(" ")
                          .map((word) => word.charAt(0).toUpperCase())
                          .join("")
                      : "U"}
                  </div>
                )}
              </div>
              <div>
                <label className="block mb-1 font-medium">Change Picture</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="text-sm"
                />
              </div>
            </div>

            {/* Name Field */}
            <div className="mb-4">
              <label className="block mb-1 font-medium">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Email Field (non-editable) */}
            <div className="mb-6">
              <label className="block mb-1 font-medium">Email</label>
              <input
                type="email"
                value={email}
                disabled
                className="w-full bg-gray-100 border border-gray-300 px-3 py-2 rounded-md text-gray-500 cursor-not-allowed"
              />
            </div>

            {/* Save Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {isLoading && (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
                  ></path>
                </svg>
              )}
              {isLoading ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </main>
      </div>
    </div>
  );
};

export default ProfilePage;
