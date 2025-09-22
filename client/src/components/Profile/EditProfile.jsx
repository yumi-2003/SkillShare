import React from "react";
import { useSelector } from "react-redux";

const EditProfile = () => {
  // const dispatch = useDispatch();
  //get user information
  const user = useSelector((state) => state.user.user);

  return (
    <div className="flex flex-col min-h-screen p-6 gap-6">
      {/* Top section  */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* left profile card  */}
        <div className="w-full lg:w-1/3 h-64 bg-white rounded-2xl shadow p-6 flex flex-col items-center mt-12">
          {user.profileImage ? (
            <img
              src={user.profileImage}
              alt={user.name}
              className="w-32 h-32 rounded-full object-cover mb-4"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-blue-500 text-white text-3xl flex items-center justify-center mb-3">
              {user.name.charAt(0).toUpperCase()}
            </div>
          )}
          <h2 className="text-xl font-bold px-3 text-blue-700">{user.name}</h2>
          <p className="text-gray-500 mb-2 px-2 capitalize">{user.userType}</p>
          <button className="bg-red-600 text-white px-4 py-2 rounded-lg">
            Delete Account
          </button>
        </div>
        {/* right profile Edit form */}
        <div className="w-full lg:w-2/3 bg-white rounded-2xl shadow p-6 mt-12">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-600">Profile Setting</h3>
          </div>

          {/* edit profile form  */}
          <form className="flex flex-col gap-6">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* LEFT: Personal Info */}
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
                    value={user.name}
                    // onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full border rounded-lg p-2"
                    value={user.email}
                    // onChange={(e) => setEmail(e.target.value)}
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

              {/* RIGHT: Change Password */}
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
                    // value={currentPassword}
                    // onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    className="w-full border rounded-lg p-2"
                    // value={newPassword}
                    // onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-2">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    className="w-full border rounded-lg p-2"
                    // value={confirmPassword}
                    // onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* FULL-WIDTH BUTTON BELOW BOTH COLUMNS */}
            <div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-orange-400 text-white px-4 py-2 rounded-lg"
              >
                Update Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
