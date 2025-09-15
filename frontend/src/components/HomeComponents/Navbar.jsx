import { Link } from "react-router-dom";
import SkillShareLogo from "../../assets/skillshare.png";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../stores/slices/userSlice";
import { useNavigate } from "react-router-dom";
// import Theme from "../../pages/homePage/Theme";

const Navbar = () => {
  //get user from redux
  const user = useSelector((state) => state.user?.user);
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
          <Link to="/" className="hover:text-blue-700 font-semibold">
            Home
          </Link>
          <Link to="/allcourses" className="hover:text-blue-700 font-semibold">
            Courses
          </Link>
        </div>
      </div>

      {/* {show login and signup button if users are not in database but when user is logged in show logout and profile button} */}
      {user ? (
        <div className="flex items-center gap-3">
          {/* <Theme /> */}
          {user && user.userType === "student" && (
            <Link
              to="/student-dashboard"
              className="text-gray-600 hover:text-blue-700 font-medium"
            >
              Student Dashboard
            </Link>
          )}
          {user && user.userType === "instructor" && (
            <Link
              to="/instructor-dashboard"
              className="text-gray-600 hover:text-blue-700 font-medium"
            >
              Instructor Dashboard
            </Link>
          )}

          <button
            onClick={() => {
              // Clear user from Redux store
              dispatch(setUser(null));
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
          <Link
            to="/login"
            className="text-gray-600 hover:text-gray-800 font-medium"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 font-medium"
          >
            Sign Up
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
