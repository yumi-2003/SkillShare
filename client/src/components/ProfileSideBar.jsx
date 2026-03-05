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
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-end z-50">
          <div
            ref={sidebarRef}
            className="w-80 shadow-2xl relative mt-4 mx-4 rounded-3xl bg-[var(--bg-primary)] border border-[var(--border-color)] overflow-hidden"
          >
            {/* Header */}
            <div className="p-8 bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-hover)] text-white shadow-lg">
              <div className="flex flex-col items-center">
                {userProfile?.user?.image ? (
                  <div className="relative group">
                    <img
                      className="w-20 h-20 flex items-center justify-center rounded-3xl shadow-xl border-4 border-white/20 object-cover"
                      src={userProfile?.user.image}
                      alt="user profile"
                    />
                    <div className="absolute inset-0 bg-black/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                ) : (
                  <Avator name={user?.name || ""} />
                )}
                <span className="mt-4 font-black text-xl tracking-tight">
                  {userProfile?.user?.name || user?.name}
                </span>
                <span className="bg-white/20 backdrop-blur-md text-white text-xs font-black px-4 py-1.5 rounded-full mt-3 uppercase tracking-widest shadow-sm">
                  {user?.userType === "student"
                    ? "🎓 Student"
                    : "👨‍🏫 Instructor"}
                </span>
                <span className="flex items-center justify-center bg-black/10 backdrop-blur-sm text-white text-xs px-4 py-2 rounded-2xl mt-3 gap-2 font-medium">
                  <Mail size={14} />
                  {userProfile?.user?.email || user?.email}
                </span>
              </div>
            </div>

            {/* Activity section */}
            <div className="p-8 space-y-5">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] mb-2">Activities</h3>
              {user?.userType === "student" ? (
                <Link
                  to="/allcourses"
                  className="flex items-center gap-3 p-3 rounded-2xl bg-[var(--bg-muted)] text-[var(--text-primary)] hover:bg-[var(--accent-primary)] hover:text-white transition-all duration-300 group shadow-sm"
                >
                  <Book size={18} className="text-[var(--accent-primary)] group-hover:text-white" />
                  <span className="font-bold text-sm">View Courses</span>
                </Link>
              ) : (
                <div className="space-y-3">
                  <p className="flex items-center gap-3 p-3 rounded-2xl bg-[var(--bg-muted)] text-[var(--text-primary)] hover:bg-[var(--accent-primary)] hover:text-white transition-all duration-300 group cursor-pointer shadow-sm">
                    <BookKey size={18} className="text-[var(--accent-primary)] group-hover:text-white" />
                    <span className="font-bold text-sm">Manage Courses</span>
                  </p>
                  <p className="flex items-center gap-3 p-3 rounded-2xl bg-[var(--bg-muted)] text-[var(--text-primary)] hover:bg-[var(--accent-primary)] hover:text-white transition-all duration-300 group cursor-pointer shadow-sm">
                    <GraduationCap size={18} className="text-[var(--accent-primary)] group-hover:text-white" />
                    <span className="font-bold text-sm">Manage Students</span>
                  </p>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="p-8 pt-0 space-y-4">
              <button
                onClick={navigateDashboard}
                className="w-full bg-[var(--accent-primary)] text-white py-4 rounded-2xl font-black shadow-lg shadow-emerald-100 dark:shadow-none hover:bg-[var(--accent-hover)] hover:scale-[1.02] active:scale-95 transition-all duration-300"
              >
                Go to Dashboard
              </button>
              <Link
                to={"/editProfile"}
                className="w-full block bg-[var(--bg-muted)] text-[var(--text-primary)] text-center py-4 rounded-2xl font-black hover:bg-[var(--accent-primary)] hover:text-white transition-all duration-300 shadow-sm"
              >
                Edit Profile
              </Link>
            </div>

            {/* Close button */}
            <button
              onClick={() => setOpenProfile(false)}
              className="absolute top-6 right-6 text-white/80 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileSideBar;
