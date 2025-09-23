import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getProfile,
  updateProfile,
  deleteProfile,
} from "../../stores/slices/profileSlice";
import { Camera } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { logOut } from "../../stores/slices/authSlice";
import { toast } from "react-toastify";

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, status, error, success } = useSelector(
    (state) => state.profile
  );

  // Local state
  const [preview, setPreview] = useState(null);
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Fetch profile on mount
  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  // Update local state when user data is fetched
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setPreview(user.image || null);
      setCurrentPassword(user.password || "");
    }
  }, [user]);

  // Handle image selection
  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setImage(selectedFile);
      setPreview(URL.createObjectURL(selectedFile)); // show temporary preview
    }
  };

  // Handle profile update
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Password validation
    if (newPassword) {
      if (!currentPassword) {
        alert("You must enter your current password to set a new password");
        return;
      }
      if (newPassword !== confirmPassword) {
        alert("Password and Confirm Password must match");
        return;
      }
    }

    // Build form data
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    if (image) formData.append("image", image);
    if (currentPassword && newPassword) {
      formData.append("currentPassword", currentPassword);
      formData.append("newPassword", newPassword);
    }

    try {
      const resultAction = await dispatch(updateProfile(formData));

      if (updateProfile.fulfilled.match(resultAction)) {
        const updatedUser = resultAction.payload.user;
        setPreview(updatedUser.image || preview); // update preview with server URL
        toast.success("Profile updated successfully!");
        navigate("/login");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        if (error) {
          toast.error(
            resultAction.payload?.message || "Failed to update profile"
          );
        }
      }
    } catch (err) {
      console.error(err);
      toast.error(err);
    }
  };

  // Handle account deletion
  const handleDelete = async () => {
    const password = prompt("Enter your password to delete your account");
    if (!password) return;
    try {
      const deleteAccount = await dispatch(deleteProfile({ password }));

      if (deleteProfile.fulfilled.match(deleteAccount)) {
        toast.success(deleteAccount.payload);
        dispatch(logOut());
        localStorage.removeItem("SkillShareToken");
        localStorage.removeItem("SkillShareUser");
        navigate("/");
      } else {
        toast.error(
          deleteAccount.payload?.message || "Failed to delete account"
        );
      }
    } catch (err) {
      toast.error("Something went wrong!");
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col h-auto p-6 gap-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Profile Card */}
        <div className="w-full lg:w-1/3 h-72 bg-white rounded-2xl shadow p-6 flex flex-col items-center mt-12">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-green-400 shadow-md">
            {preview ? (
              <img
                src={preview}
                alt={name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-blue-500 text-white text-4xl font-bold">
                {name?.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <h2 className="text-xl font-bold text-blue-700 mt-4">{name}</h2>
          <p className="text-gray-500 mb-2 capitalize">{user?.userType}</p>
          <button
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 shadow"
            onClick={() => handleDelete()}
          >
            Delete Account
          </button>
        </div>

        {/* Right Profile Edit Form */}
        <div className="w-full lg:w-2/3 bg-white rounded-2xl shadow p-6 mt-12">
          <h3 className="text-lg font-bold text-gray-600 mb-4">
            Profile Setting
          </h3>

          {/* Status messages */}
          {status === "loading" && <p>Loading...</p>}
          {/* {error && <p className="text-red-600">{error}</p>}
          {success && (
            <p className="text-green-600">Profile updated successfully!</p>
          )} */}

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Profile Image Upload */}
            <div>
              <label className="block text-sm text-gray-600 mb-2">
                Profile Image
              </label>
              <div className="relative w-24 h-24">
                <div className="w-24 h-24 rounded-full overflow-hidden border border-gray-300 shadow">
                  {preview ? (
                    <img
                      src={preview}
                      alt="preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-lg">
                      No Image
                    </div>
                  )}
                </div>
                <label className="absolute bottom-0 right-0 bg-white p-1 rounded-full cursor-pointer hover:bg-gray-100">
                  <Camera className="w-5 h-5 text-gray-600" />
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
              {/* Personal Info */}
              <div className="flex-1 grid grid-cols-1 gap-4">
                <h4 className="text-md font-semibold text-gray-700">
                  Personal Info
                </h4>
                <div>
                  <label className="block text-sm text-gray-600 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    className="w-full border rounded-lg p-2"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full border rounded-lg p-2"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-2">
                    User Type
                  </label>
                  <input
                    type="text"
                    className="w-full border rounded-lg p-2 capitalize"
                    value={user?.userType || ""}
                    readOnly
                  />
                </div>
              </div>

              {/* Change Password */}
              <div className="flex-1 grid grid-cols-1 gap-4">
                <h4 className="text-md font-semibold text-gray-700">
                  Change Password
                </h4>
                <div>
                  <label className="block text-sm text-gray-600 mb-2">
                    Current Password
                  </label>
                  <input
                    type="password"
                    className="w-full border rounded-lg p-2"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    className="w-full border rounded-lg p-2"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-2">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    className="w-full border rounded-lg p-2"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-400 to-orange-300 text-black px-4 py-2 rounded-lg shadow hover:opacity-90"
            >
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
