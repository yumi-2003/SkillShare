import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {
  X,
  Mail,
  Book,
  BookKey,
  GraduationCap,
  PlusCircle,
} from "lucide-react";
import { getProfile } from "../stores/slices/profileSlice";

// Avatar component to show initials
const Avator = ({ name }) => {
  const initialName = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-[#059669] to-[#10b981] text-white font-medium text-sm">
      {initialName}
    </div>
  );
};

const ProfileSideBar = () => {
  const [openProfile, setOpenProfile] = useState(false);
  const sidebarRef = useRef(null);
  const user = useSelector((state) => state.auth.user);
  const userProfile = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Fetch profile on mount
  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);
  console.log("User Updated Profile", userProfile);
  console.log(userProfile?.user?.image);

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
  console.log("User:", user);

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
        {userProfile?.user?.image ? (
          <img
            className="w-12 h-12 flex items-center justify-center rounded-full"
            src={userProfile?.user.image}
            alt="user profile"
          />
        ) : (
          <Avator name={user?.name || ""} />
        )}
      </div>

      {openProfile && (
        <div className="fixed inset-0 bg-black/50 flex justify-end z-50">
          <div
            ref={sidebarRef}
            className="w-72 rounded-l-2xl shadow-lg relative mt-10 mx-2 bg-[#f0fdf4]"
          >
            {/* Header */}
            <div className="p-6 bg-gradient-to-r from-[#059669] to-[#10b981] text-white rounded-tl-2xl">
              <div className="flex flex-col items-center">
                {userProfile?.user?.image ? (
                  <img
                    className="w-12 h-12 flex items-center justify-center rounded-full"
                    src={userProfile?.user.image}
                    alt="user profile"
                  />
                ) : (
                  <Avator name={user?.name || ""} />
                )}
                <span className="mt-2 font-bold">
                  {userProfile?.user?.name || user?.name}
                </span>
                <span className="bg-white text-[#064e3b] text-sm px-3 py-1 rounded-full mt-2">
                  {user?.userType === "student"
                    ? "🎓 Student"
                    : "👨‍🏫 Instructor"}
                </span>
                <span className="flex items-center justify-center bg-white text-[#064e3b] text-sm px-3 py-1 rounded-full mt-2 gap-2">
                  <Mail size={16} />
                  {userProfile?.user?.email || user?.email}
                </span>
              </div>
            </div>

            {/* Activity section */}
            <div className="p-6">
              {user?.userType === "student" ? (
                <Link
                  to="/allcourses"
                  className="flex items-center gap-2 mb-2 text-[#064e3b] hover:text-[#10b981]"
                >
                  <Book size={16} />
                  View Courses and Join Free
                </Link>
              ) : (
                <>
                  <p className="flex items-center gap-2 mb-2 text-[#064e3b] hover:text-[#10b981]">
                    <BookKey size={16} /> Manage Courses
                  </p>
                  <p className="flex items-center gap-2 mb-2 text-[#064e3b] hover:text-[#10b981]">
                    <GraduationCap size={16} /> Manage Students
                  </p>
                  <p className="flex items-center gap-2 text-[#064e3b] hover:text-[#10b981]">
                    <PlusCircle size={16} /> Join Courses
                  </p>
                </>
              )}
            </div>

            {/* Actions */}
            <div className="p-6 space-y-3">
              <button
                onClick={navigateDashboard}
                className="w-full bg-[#059669] text-white py-2 rounded-lg hover:bg-[#065f46] transition"
              >
                Go to Dashboard
              </button>
              <Link
                to={"/editProfile"}
                className="w-full block bg-gradient-to-r from-[#059669] to-[#10b981] nav-link-white text-center px-1 py-2 rounded-lg hover:opacity-90 transition"
              >
                Edit Profile
              </Link>
            </div>

            {/* Close button */}
            <button
              onClick={() => setOpenProfile(false)}
              className="absolute top-4 right-4 text-[#064e3b] hover:text-[#10b981]"
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
