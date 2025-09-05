import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../../features/Auth/authAction";
import { Link, useLocation, useNavigate } from "react-router-dom";

const AuthForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  const { loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    userType: "student",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userType = await dispatch(
        loginUser(formData, isLoginPage ? "login" : "signUp")
      );
      if (userType) {
        navigate(
          userType === "instructor"
            ? "/instructor-dashboard"
            : "/student-dashboard"
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="h-screen flex items-center justify-center bg-gray-100">
      {/* <div className="mt-10">
        <h1>SkillShare</h1>
      </div> */}
      <div className="w-full max-w-md p-6 rounded-xl bg-white">
        <h2 className="font-bold text-blue-600 text-2xl mb-6 text-center">
          {isLoginPage ? "Welcome Back" : "Join SkillShare"}
        </h2>
        {error && (
          <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLoginPage && (
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full border px-3 py-2 rounded-lg focus:outline-blue-500"
              required
            />
          )}
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full border px-3 py-2 rounded-lg focus:outline-blue-500"
            required
          />

          {!isLoginPage && (
            <div className="w-full">
              <p className="mb-2 font-medium text-gray-700">
                I want to join as
              </p>
              <div className="flex flex-col gap-3">
                <label className="flex items-center border rounded-lg p-3 cursor-pointer hover:border-blue-500">
                  <input
                    type="radio"
                    name="userType"
                    value="student"
                    checked={formData.userType === "student"}
                    onChange={handleChange}
                    className="mr-3"
                  />
                  <span className="text-gray-800">Student</span>
                </label>
                <label className="flex items-center border rounded-lg p-3 cursor-pointer hover:border-blue-500">
                  <input
                    type="radio"
                    name="userType"
                    value="instructor"
                    checked={formData.userType === "instructor"}
                    onChange={handleChange}
                    className="mr-3"
                  />
                  <span className="text-gray-800">Instructor</span>
                </label>
              </div>
            </div>
          )}
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full border px-3 py-2 rounded-lg focus:outline-blue-500"
            required
          />
          {!isLoginPage && (
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="w-full border px-3 py-2 rounded-lg focus:outline-blue-500"
              required
            />
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-2xl hover:bg-blue-700"
          >
            {loading
              ? isLoginPage
                ? "Logging in..."
                : "Registering..."
              : isLoginPage
              ? "Login"
              : "Register"}
          </button>
        </form>
        <p className="text-sm text-gray-600 mt-4 text-center">
          {isLoginPage ? (
            <>
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-blue-500 hover:underline font-medium"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-500 hover:underline font-medium"
              >
                Login
              </Link>
            </>
          )}
        </p>
      </div>
    </section>
  );
};

export default AuthForm;
