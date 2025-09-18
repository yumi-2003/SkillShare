import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  X,
  Mail,
  Book,
  BookKey,
  GraduationCap,
  PlusCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

//avator name to show as initial login or sign up
const Avator = ({ name }) => {
  const initialName = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-blue-800 text-white font-medium text-sm">
      {initialName}
    </div>
  );
};
const ProfileSideBar = () => {
  const [openProfile, setOpenProfile] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  //   function to navigate dashboard
  const navigateDashboard = () => {
    if (user?.userType === "student") navigate("/student-dashboard");
    if (user?.userType === "instructor") navigate("/instructor-dashboard");
  };

  return (
    <div className="">
      {/* get avator */}
      <div onClick={() => setOpenProfile(true)} className="cursor-pointer">
        <Avator name={user?.name} />
      </div>
      {openProfile && (
        <div className="fixed inset-0 bg-black/50 flex justify-end">
          <div className="w-72 rounded-l-2xl shadow-lg relative mt-10 mx-2 h-20">
            <div className="p-6 bg-gradient-to-r from-blue-500 to bg-purple-500 text-white rounded-tl-2xl">
              <div className="flex flex-col items-center">
                <Avator name={user?.name} />
                <span className="mt-2 font-bold">{user?.name}</span>
                <span className="bg-white text-blue-600 text-sm px-3 py-1 rounded-full mt-2">
                  {user?.userType === "student"
                    ? "🎓 Student"
                    : "👨‍🏫 Instructor"}
                </span>
                <span className="flex items-center justify-center bg-white text-blue-600 text-sm px-3 py-1 rounded-full mt-2 gap-3 ">
                  <Mail size={20} />
                  {user?.email}
                </span>
              </div>
            </div>

            {/* activity based on userType*/}
            <div className="p-6 bg-white">
              {user?.userType === "student" ? (
                <>
                  <Link
                    to={"/allcourses"}
                    className="flex items-center justify-center text-gray-800"
                  >
                    <Book />
                    View Courses and Join Free
                  </Link>
                </>
              ) : (
                <>
                  <p className="flex gap-2 mb-4 text-gray-800">
                    <BookKey />
                    Manage Courses
                  </p>
                  <p className="flex gap-2 mb-4 text-gray-800">
                    <GraduationCap />
                    Manage Students
                  </p>
                  <p className="flex gap-2 text-gray-800">
                    <PlusCircle />
                    Join Courses
                  </p>
                </>
              )}
            </div>

            {/* action */}
            <div className="p-6 space-y-3 bg-white">
              <button
                onClick={() => navigateDashboard()}
                className="w-full bg-blue-600 text-white py-2 rounded-lg"
              >
                Go to Dashboard
              </button>
              <button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 rounded-lg">
                Edit Profile
              </button>
            </div>
            {/* close button */}
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
