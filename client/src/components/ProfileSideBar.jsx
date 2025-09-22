import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {
  X,
  Mail,
  Book,
  BookKey,
  GraduationCap,
  PlusCircle,
} from "lucide-react";

// Avatar component to show initials
const Avator = ({ name }) => {
  const initialName = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-300 to-blue-500 text-white font-medium text-sm">
      {initialName}
    </div>
  );
};

const ProfileSideBar = () => {
  const [openProfile, setOpenProfile] = useState(false);
  const sidebarRef = useRef(null); // Ref for sidebar
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  // Navigate to dashboard
  const navigateDashboard = () => {
    if (user?.userType === "student") {
      navigate("/student-dashboard");
      setOpenProfile(false);
    }
    if (user?.userType === "instructor") {
      navigate("/instructor-dashboard");
      setOpenProfile(false);
    }
  };

  // Close sidebar when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setOpenProfile(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarRef]);

  return (
    <div>
      {/* Avatar button */}
      <div onClick={() => setOpenProfile(true)} className="cursor-pointer">
        <Avator name={user?.name || ""} />
      </div>

      {openProfile && (
        <div className="fixed inset-0 bg-black/50 flex justify-end z-50">
          <div
            ref={sidebarRef}
            className="w-72 rounded-l-2xl shadow-lg relative mt-10 mx-2 h-24 bg-white"
          >
            {/* Header */}
            <div className="p-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-tl-2xl">
              <div className="flex flex-col items-center">
                <Avator name={user?.name || ""} />
                <span className="mt-2 font-bold">{user?.name}</span>
                <span className="bg-white text-blue-600 text-sm px-3 py-1 rounded-full mt-2">
                  {user?.userType === "student"
                    ? "🎓 Student"
                    : "👨‍🏫 Instructor"}
                </span>
                <span className="flex items-center justify-center bg-white text-blue-600 text-sm px-3 py-1 rounded-full mt-2 gap-2">
                  <Mail size={16} />
                  {user?.email}
                </span>
              </div>
            </div>

            {/* Activity section */}
            <div className="p-6 bg-white">
              {user?.userType === "student" ? (
                <Link
                  to="/allcourses"
                  className="flex items-center gap-2 mb-2 text-gray-800 hover:text-blue-600"
                >
                  <Book size={16} />
                  View Courses and Join Free
                </Link>
              ) : (
                <>
                  <p className="flex items-center gap-2 mb-2 text-gray-800 hover:text-blue-600">
                    <BookKey size={16} /> Manage Courses
                  </p>
                  <p className="flex items-center gap-2 mb-2 text-gray-800 hover:text-blue-600">
                    <GraduationCap size={16} /> Manage Students
                  </p>
                  <p className="flex items-center gap-2 text-gray-800 hover:text-blue-600">
                    <PlusCircle size={16} /> Join Courses
                  </p>
                </>
              )}
            </div>

            {/* Actions */}
            <div className="p-6 space-y-3 bg-white">
              <button
                onClick={navigateDashboard}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Go to Dashboard
              </button>
              <Link
                to={"/editProfile"}
                className="w-full block bg-gradient-to-r from-blue-500 to-purple-500 text-white text-center px-1 py-2 rounded-lg hover:opacity-90 transition"
              >
                Edit Profile
              </Link>
            </div>

            {/* Close button */}
            <button
              onClick={() => setOpenProfile(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-black"
            >
              <X />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileSideBar;
