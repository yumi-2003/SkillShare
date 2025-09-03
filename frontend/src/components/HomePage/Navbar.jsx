import { Link } from "react-router-dom";
import SkillShareLogo from "../../assets/skillshare.png";

const Navbar = () => {
  return (
    <div className="px-4 py-3 flex items-center justify-between w-full bg-white shadow-md">
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
          <Link
            to="/coursedetail"
            className="hover:text-blue-700 font-semibold"
          >
            Courses
          </Link>
        </div>
      </div>

      {/* auth buttons */}
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
    </div>
  );
};

export default Navbar;
