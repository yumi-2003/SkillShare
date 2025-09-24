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
    <nav className="bg-[#f0fdf4] shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img
              src={SkillShareLogo}
              alt="SkillShare Logo"
              className="h-10 w-10"
            />
            <span className="font-bold text-2xl text-[#064e3b]">
              SkillShare
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8 font-medium">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive
                  ? "text-white border-b-2 border-[#10b981]"
                  : "text-white hover:text-[#10b981]"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/allcourses"
              className={({ isActive }) =>
                isActive
                  ? "text-white border-b-2 border-[#10b981]"
                  : "text-white hover:text-[#10b981]"
              }
            >
              Courses
            </NavLink>
          </div>

          {/* Desktop User Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Theme />
            {user ? (
              <>
                <ProfileSideBar />
                <button
                  onClick={handleLogout}
                  className="bg-[#059669] text-white px-4 py-2 rounded hover:bg-[#065f46] font-medium transition"
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
                      ? "text-white font-semibold border-none border-[#10b981]"
                      : "text-white hover:text-[#10b981]"
                  }
                >
                  Login
                </NavLink>
                <NavLink
                  to="/signup"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-[#065f46] nav-link-white px-4 py-2 rounded font-medium border border-[#10b981]"
                      : "bg-[#059669] nav-link-white px-4 py-2 rounded hover:bg-[#065f46] font-medium transition"
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
              className="text-[#064e3b] hover:text-[#10b981] focus:outline-none transition"
            >
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#f0fdf4] border-t border-[#d1fae5] shadow-lg">
          <div className="flex flex-col px-4 py-3 space-y-2">
            <NavLink
              to="/"
              end
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "text-[#10b981] font-semibold border border-[#10b981] pb-1"
                  : "text-[#064e3b] hover:text-[#10b981]"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/allcourses"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "text-[#10b981] font-semibold border border-[#10b981] pb-1"
                  : "text-[#064e3b] hover:text-[#10b981]"
              }
            >
              Courses
            </NavLink>

            {user ? (
              <>
                <ProfileSideBar />
                <button
                  onClick={handleLogout}
                  className="bg-[#059669] text-white px-4 py-2 rounded hover:bg-[#065f46] font-medium mt-2 transition"
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
                      ? "text-white font-semibold border border-[#10b981] pb-1"
                      : "text-white hover:text-[#10b981]"
                  }
                >
                  Login
                </NavLink>
                <NavLink
                  to="/signup"
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    isActive
                      ? "bg-[#065f46] nav-link-white px-4 py-2 rounded font-medium border-b-2 border-[#10b981]"
                      : "bg-[#059669] nav-link-white px-4 py-2 rounded hover:bg-[#065f46] font-medium transition"
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
