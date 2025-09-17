import { Link, NavLink } from "react-router-dom";
import SkillShareLogo from "../../assets/skillshare.png";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../../stores/slices/authSlice";
import { useNavigate } from "react-router-dom";
// import Theme from "../../pages/homePage/Theme";

const Navbar = () => {
  //get user from redux
  const user = useSelector((state) => state.auth?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="px-4 py-3 flex items-center justify-between w-full shadow-md fixed top-0 left-0 z-50 bg-white bg-opacity-100">
      {/* logo + nav links */}
      <div className="flex items-center gap-x-8">
        <Link to="/" className="flex items-center space-x-2">
          <img src={SkillShareLogo} alt="SkillShare Logo" className="h-8 w-8" />
          <span className="font-bold text-xl text-blue-800">SkillShare</span>
        </Link>

        <div className="flex space-x-6 text-gray-600">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive
                ? "font-bold text-blue-700 border-b-2 border-blue-700 pb-1"
                : "text-gray-600 hover:text-blue-700 font-semibold"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/allcourses"
            className={({ isActive }) =>
              isActive
                ? "font-bold text-blue-700 border-b-2 border-blue-700 pb-1"
                : "text-gray-600 hover:text-blue-700 font-semibold"
            }
          >
            Courses
          </NavLink>
        </div>
      </div>

      {/* {show login and signup button if users are not in database but when user is logged in show logout and profile button} */}
      {user ? (
        <div className="flex items-center gap-3">
          {/* <Theme /> */}
          {user && user.userType === "student" && (
            <NavLink
              to="/student-dashboard"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-700 font-semibold border-b-2 border-blue-700 pb-1"
                  : "text-gray-600 hover:text-blue-700 font-medium"
              }
            >
              Student Dashboard
            </NavLink>
          )}
          {user && user.userType === "instructor" && (
            <NavLink
              to="/instructor-dashboard"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-700 font-semibold border-b-2 border-blue-700 pb-1"
                  : "text-gray-600 hover:text-blue-700 font-medium"
              }
            >
              Instructor Dashboard
            </NavLink>
          )}

          <button
            onClick={() => {
              // Clear user from Redux store
              dispatch(logOut());
              // Clear localStorage
              localStorage.removeItem("SkillShareToken");
              localStorage.removeItem("SkillShareUser");
              // Navigate to home page
              navigate("/");
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 font-medium"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive
                ? "text-blue-700 font-semibold border-b-2 border-blue-700 pb-1"
                : "text-gray-600 hover:text-gray-800 font-medium"
            }
          >
            Login
          </NavLink>
          <NavLink
            to="/signup"
            className={({ isActive }) =>
              isActive
                ? "bg-blue-700 text-white px-4 py-2 rounded font-medium border-b-2 border-blue-700 pb-1"
                : "bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 font-medium"
            }
          >
            Sign Up
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default Navbar;
