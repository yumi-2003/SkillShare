import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../../stores/slices/authSlice";
import SkillShareLogo from "../../assets/skillshare.png";
import { Menu, X } from "lucide-react";
import ProfileSideBar from "../ProfileSideBar";

const Navbar = () => {
  const user = useSelector((state) => state.auth?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logOut());
    localStorage.removeItem("SkillShareToken");
    localStorage.removeItem("SkillShareUser");
    navigate("/");
    setMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img
              src={SkillShareLogo}
              alt="SkillShare Logo"
              className="h-10 w-10"
            />
            <span className="font-bold text-2xl text-blue-800">SkillShare</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive
                  ? "text-blue-700 border-b-2 border-blue-700 pb-1"
                  : "hover:text-blue-700"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/allcourses"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-700 border-b-2 border-blue-700 pb-1"
                  : "hover:text-blue-700"
              }
            >
              Courses
            </NavLink>
          </div>

          {/* Desktop User Actions */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                {/* {user.userType === "student" && (
                  <NavLink
                    to="/student-dashboard"
                    className={({ isActive }) =>
                      isActive
                        ? "text-blue-700 font-semibold border-b-2 border-blue-700 pb-1"
                        : "text-gray-700 hover:text-blue-700"
                    }
                  >
                    Student Dashboard
                  </NavLink>
                )}
                {user.userType === "instructor" && (
                  <NavLink
                    to="/instructor-dashboard"
                    className={({ isActive }) =>
                      isActive
                        ? "text-blue-700 font-semibold border-b-2 border-blue-700 pb-1"
                        : "text-gray-700 hover:text-blue-700"
                    }
                  >
                    Instructor Dashboard
                  </NavLink>
                )} */}
                <ProfileSideBar />
                <button
                  onClick={handleLogout}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-700 font-semibold border-b-2 border-blue-700 pb-1"
                      : "hover:text-gray-800"
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
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-700 hover:text-blue-700 focus:outline-none"
            >
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="flex flex-col px-4 py-3 space-y-2">
            <NavLink
              to="/"
              end
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "text-blue-700 font-semibold border-b-2 border-blue-700 pb-1"
                  : "text-gray-700 hover:text-blue-700"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/allcourses"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "text-blue-700 font-semibold border-b-2 border-blue-700 pb-1"
                  : "text-gray-700 hover:text-blue-700"
              }
            >
              Courses
            </NavLink>

            {user ? (
              <>
                {/* {user.userType === "student" && (
                  <NavLink
                    to="/student-dashboard"
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      isActive
                        ? "text-blue-700 font-semibold border-b-2 border-blue-700 pb-1"
                        : "text-gray-700 hover:text-blue-700"
                    }
                  >
                    Student Dashboard
                  </NavLink>
                )}
                {user.userType === "instructor" && (
                  <NavLink
                    to="/instructor-dashboard"
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      isActive
                        ? "text-blue-700 font-semibold border-b-2 border-blue-700 pb-1"
                        : "text-gray-700 hover:text-blue-700"
                    }
                  >
                    Instructor Dashboard
                  </NavLink>
                )} */}
                <ProfileSideBar />
                <button
                  onClick={handleLogout}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 font-medium mt-2"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-700 font-semibold border-b-2 border-blue-700 pb-1"
                      : "text-gray-700 hover:text-blue-700"
                  }
                >
                  Login
                </NavLink>
                <NavLink
                  to="/signup"
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    isActive
                      ? "bg-blue-700 text-white px-4 py-2 rounded font-medium border-b-2 border-blue-700 pb-1"
                      : "bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 font-medium"
                  }
                >
                  Sign Up
                </NavLink>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
