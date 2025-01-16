import React, { useState } from 'react';

const Profile = () => {
  const [profileData, setProfileData] = useState({
    name: '',
    email: 'enjoymov@rajawalibiru.com',
    phone: '',
    currentPassword: '',
    newPassword: '',
    verifyPassword: '',
    role: 'Editor',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    alert('Profile updated successfully!');
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (profileData.newPassword === profileData.verifyPassword) {
      alert('Password changed successfully!');
    } else {
      alert('New password and verify password do not match!');
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                name="email"
                className="border border-gray-300 rounded w-full p-2"
                value={profileData.email}
                onChange={handleInputChange}
                disabled
              />
              <p className="text-sm text-gray-500 mt-1">Email is used for login.</p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
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
          <div className="mb-8">
            <h2 className="text-lg font-bold mb-4">Profile picture</h2>
            <div className="flex items-center space-x-4">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-gray-400">Profile</span>
              </div>
              <button className="bg-gray-200 text-gray-700 py-2 px-4 rounded hover:bg-gray-300">
                Edit
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-2">Allowed JPG, PNG or WEBP. Max size of 300K</p>
          </div>

          <form onSubmit={handleChangePassword}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Current password</label>
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
              <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Verify Password</label>
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

          <div className="mt-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
            <input
              type="text"
              name="role"
              className="border border-gray-300 rounded w-full p-2"
              value={profileData.role}
              disabled
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
