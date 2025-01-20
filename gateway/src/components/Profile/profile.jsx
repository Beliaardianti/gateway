import React, { useState, useEffect } from "react";
import axios from "axios";

const Profile = () => {
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    currentPassword: "",
    newPassword: "",
    verifyPassword: "",
    role: "",
  });

  useEffect(() => {
  
    const email = localStorage.getItem("userEmail") || "User";
    setProfileData((prevData) => ({ ...prevData, email }));

    
    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/profile");
        setProfileData((prevData) => ({
          ...prevData,
          ...response.data,
        }));
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    alert("Profile updated successfully!");
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (profileData.newPassword === profileData.verifyPassword) {
      alert("Password changed successfully!");
    } else {
      alert("New password and verify password do not match!");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <p className="text-gray-600 mb-6">Manage your profile.</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <form onSubmit={handleUpdateProfile}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                className="border border-gray-300 rounded w-full p-2"
                value={profileData.name}
                onChange={handleInputChange}
                placeholder="Your name"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                className="border border-gray-300 rounded w-full p-2"
                value={profileData.email}
                onChange={handleInputChange}
                disabled
              />
              <p className="text-sm text-gray-500 mt-1">
                Email is used for login.
              </p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                className="border border-gray-300 rounded w-full p-2"
                value={profileData.phone}
                onChange={handleInputChange}
                placeholder="Phone number"
              />
            </div>
            <button
              type="submit"
              className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
            >
              Update profile
            </button>
          </form>
        </div>

        <div>
          <form onSubmit={handleChangePassword}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current password
              </label>
              <input
                type="password"
                name="currentPassword"
                className="border border-gray-300 rounded w-full p-2"
                value={profileData.currentPassword}
                onChange={handleInputChange}
                placeholder="Input password"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Password
              </label>
              <input
                type="password"
                name="newPassword"
                className="border border-gray-300 rounded w-full p-2"
                value={profileData.newPassword}
                onChange={handleInputChange}
                placeholder="Input password"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Verify Password
              </label>
              <input
                type="password"
                name="verifyPassword"
                className="border border-gray-300 rounded w-full p-2"
                value={profileData.verifyPassword}
                onChange={handleInputChange}
                placeholder="Verify password"
              />
            </div>
            <button
              type="submit"
              className="bg-black text-white py-2 px-4 rounded"
            >
              Change password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
