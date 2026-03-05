import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../../stores/slices/authSlice";
import SkillShareLogo from "../../assets/skillshare.png";
import { Menu, X } from "lucide-react";
import ProfileSideBar from "../ProfileSideBar";
import Theme from "../../pages/homePage/Theme";

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
    <nav className="shadow-md fixed top-0 left-0 w-full z-50 transition-colors duration-300">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img
              src={SkillShareLogo}
              alt="SkillShare Logo"
              className="h-10 w-10"
            />
            <span className="font-bold text-2xl">
              IngyinLearn
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8 font-medium">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive
                  ? "text-[var(--accent-primary)] border-b-2 border-[var(--accent-primary)]"
                  : "text-[var(--text-primary)] hover:text-[var(--accent-primary)]"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/allcourses"
              className={({ isActive }) =>
                isActive
                  ? "text-[var(--accent-primary)] border-b-2 border-[var(--accent-primary)]"
                  : "text-[var(--text-primary)] hover:text-[var(--accent-primary)]"
              }
            >
              Courses
            </NavLink>
            <NavLink
              to="/quicks"
              className={({ isActive }) =>
                isActive
                  ? "text-[var(--accent-primary)] border-b-2 border-[var(--accent-primary)]"
                  : "text-[var(--text-primary)] hover:text-[var(--accent-primary)]"
              }
            >
              Quicks
            </NavLink>
            <NavLink
              to="/roadmaps"
              className={({ isActive }) =>
                isActive
                  ? "text-[var(--accent-primary)] border-b-2 border-[var(--accent-primary)]"
                  : "text-[var(--text-primary)] hover:text-[var(--accent-primary)]"
              }
            >
              Roadmaps
            </NavLink>
          </div>

          {/* Desktop User Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Theme />
            {user && (
              <button
                onClick={() => {
                  const isStudentView = window.location.pathname.includes("student");
                  navigate(isStudentView ? "/instructor-dashboard" : "/student-dashboard");
                }}
                className="text-[var(--text-primary)] hover:text-[var(--accent-primary)] font-semibold flex items-center gap-1 border border-[var(--border-color)] px-3 py-1 rounded-lg transition"
              >
                {window.location.pathname.includes("student") ? "Switch to Instructor View" : "Switch to Student View"}
              </button>
            )}
            {user ? (
              <>
                <ProfileSideBar />
                <button
                  onClick={handleLogout}
                  className="bg-[var(--accent-primary)] text-white px-4 py-2 rounded hover:bg-[var(--accent-hover)] font-medium transition"
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
                      ? "text-[var(--accent-primary)] font-semibold"
                      : "text-[var(--text-primary)] hover:text-[var(--accent-primary)]"
                  }
                >
                  Login
                </NavLink>
                <NavLink
                  to="/signup"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-[var(--accent-hover)] text-white px-4 py-2 rounded font-medium border border-[var(--accent-primary)]"
                      : "bg-[var(--accent-primary)] text-white px-4 py-2 rounded hover:bg-[var(--accent-hover)] font-medium transition shadow-md"
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
              className="text-[var(--text-primary)] hover:text-[var(--accent-primary)] focus:outline-none transition"
            >
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[var(--bg-primary)] border-t border-[var(--border-color)] shadow-lg animate-in slide-in-from-top duration-300">
          <div className="flex flex-col px-4 py-5 space-y-4">
            <NavLink
              to="/"
              end
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "text-[var(--accent-primary)] font-black border-l-4 border-[var(--accent-primary)] pl-3"
                  : "text-[var(--text-primary)] hover:text-[var(--accent-primary)] pl-3"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/allcourses"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "text-[var(--accent-primary)] font-black border-l-4 border-[var(--accent-primary)] pl-3"
                  : "text-[var(--text-primary)] hover:text-[var(--accent-primary)] pl-3"
              }
            >
              Courses
            </NavLink>
            <NavLink
              to="/quicks"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "text-[var(--accent-primary)] font-black border-l-4 border-[var(--accent-primary)] pl-3"
                  : "text-[var(--text-primary)] hover:text-[var(--accent-primary)] pl-3"
              }
            >
              Quicks
            </NavLink>
            <NavLink
              to="/roadmaps"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "text-[var(--accent-primary)] font-black border-l-4 border-[var(--accent-primary)] pl-3"
                  : "text-[var(--text-primary)] hover:text-[var(--accent-primary)] pl-3"
              }
            >
              Roadmaps
            </NavLink>

            <div className="flex items-center justify-between py-2 border-y border-[var(--border-color)]">
              <span className="text-[var(--text-primary)] font-bold">Dark Mode</span>
              <Theme />
            </div>

            {user ? (
              <div className="flex flex-col gap-3 pt-2">
                <button
                  onClick={() => {
                    const isStudentView = window.location.pathname.includes("student");
                    navigate(isStudentView ? "/instructor-dashboard" : "/student-dashboard");
                    setMenuOpen(false);
                  }}
                  className="w-full text-[var(--accent-primary)] font-bold border-2 border-[var(--accent-primary)] px-4 py-3 rounded-2xl transition hover:bg-[var(--accent-primary)] hover:text-white text-center"
                >
                  {window.location.pathname.includes("student") ? "Instructor View" : "Student View"}
                </button>
                <div className="flex justify-center border-t border-[var(--border-color)] pt-3">
                  <ProfileSideBar />
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-3 rounded-2xl font-black shadow-lg shadow-red-200 active:scale-95 transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3 pt-2">
                <NavLink
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="w-full text-center py-3 font-bold text-[var(--text-primary)] border border-[var(--border-color)] rounded-2xl"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/signup"
                  onClick={() => setMenuOpen(false)}
                  className="w-full text-center py-3 font-bold bg-[var(--accent-primary)] text-white rounded-2xl shadow-lg shadow-emerald-100"
                >
                  Sign Up
                </NavLink>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
