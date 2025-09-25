import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../../features/Auth/authAction.js";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { emailValidate, passwordValidate } from "../../util/validation.js";
import { User, Mail, Eye, EyeOff, XCircle, CheckCircle } from "lucide-react";
import Toast from "../ui/Toast";

const AuthForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const { loading } = useSelector((state) => state.auth);
  const [show, setShow] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);

  const handlePassword = () => {
    setShow((show) => !show);
  };

  const handleCpassword = () => {
    setShowCPassword((showCPassword) => !showCPassword);
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
    userType: "",
  });

  const [formError, setFormError] = useState({});

  //Taost state
  const [toast, setToast] = useState({
    isOpen: false,
    message: "",
    icon: null,
    iconColor: "",
    duration: 3000,
  });

  // Clear form whenever location changes
  useEffect(() => {
    setFormData({
      name: "",
      email: "",
      password: "",
      cpassword: "",
      userType: "",
      successMsg: "",
    });
    setFormError({});
  }, [location.pathname]);

  //show toast and hide
  const showToast = ({ message, icon, iconColor, duration }) => {
    setToast({ isOpen: true, message, icon, iconColor, duration });
  };
  const closeToast = () => setToast((t) => ({ ...t, isOpen: false }));

  // Handle user input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // form input validation
  const validateForm = () => {
    const errors = {};

    if (!isLoginPage && !formData.name) {
      errors.name = "Please enter username!";
    }

    if (!formData.email) {
      errors.email = "Please enter email!";
    } else if (!emailValidate(formData.email)) {
      errors.email = "Please enter valid email!";
    }

    if (!formData.password) {
      errors.password = "Please enter password!";
    } else if (!passwordValidate(formData.password)) {
      errors.password =
        "Password should be included 8 character, At least 8 characters, including 1 uppercase, 1 lowercase, 1 number, and 1 special character.!";
    }

    if (!isLoginPage) {
      if (!formData.cpassword) {
        errors.cpassword = "Please confirm your password!";
      } else if (formData.password !== formData.cpassword) {
        errors.cpassword = "Passwords do not match!";
      }
      if (!formData.userType) {
        errors.userType = "Please select a role!";
      }
    }

    setFormError(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const payload = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      userType: formData.userType || "student",
    };

    try {
      const response = await dispatch(
        loginUser(payload, isLoginPage ? "login" : "signUp")
      );

      if (isLoginPage) {
        showToast({
          message: "Login Successful",
          icon: CheckCircle,
          iconColor: "text-green-500",
          duration: 2000,
        });

        if (response?.user?.userType === "student") {
          navigate("/student-dashboard");
        } else if (response?.user?.userType === "instructor") {
          navigate("/instructor-dashboard");
        } else {
          navigate("/");
        }
      } else {
        showToast({
          message: "Account created successfully",
          icon: CheckCircle,
          iconColor: "text-green-500",
          duration: 2500,
        });

        if (response?.user?.userType === "student") {
          navigate("/student-dashboard");
        } else if (response?.user?.userType === "instructor") {
          navigate("/instructor-dashboard");
        } else {
          navigate("/");
        }
      }

      // Reset form
      setFormData({
        name: "",
        email: "",
        password: "",
        cpassword: "",
        userType: "",
      });
    } catch (err) {
      showToast({
        message: err.message || "Authentication Failed",
        icon: XCircle,
        iconColor: "text-red-500",
        duration: 3500,
      });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center mt-6">
      <div className="w-full max-w-md p-6 rounded-xl border bg-white border-neutral-300 shadow-sm">
        <h2 className="font-bold text-blue-600 text-2xl mb-6 text-center">
          {isLoginPage ? "Welcome Back" : "Join SkillShare"}
        </h2>

        {/* {error && (
          <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
        )} */}

        <form onSubmit={handleSubmit} className="space-y-4 bg-white">
          {!isLoginPage && (
            <>
              <div className="flex items-center gap-2 rounded-lg px-3 w-full max-w-md sm:max-w-lg">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Full Name"
                  className="flex-1 bg-transparent outline-none text-sm sm:text-base"
                />
                <User size={20} className="text-gray-500" />
              </div>
              {formError.name && (
                <p className="text-red-500 text-sm">{formError.name}</p>
              )}
            </>
          )}
          <>
            <div className="flex items-center gap-2 rounded-lg px-3 w-full max-w-md sm:max-w-lg">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                className="flex-1 bg-transparent outline-none text-sm sm:text-base"
              />
              <Mail size={20} />
            </div>
            {formError.email && (
              <p className="text-red-500 text-sm">{formError.email}</p>
            )}
          </>

          {!isLoginPage && (
            <div className="w-full">
              <p className="mb-2 font-medium text-gray-700">
                I want to join as
              </p>
              <div className="flex flex-col gap-3">
                <label className="flex items-center rounded-lg p-3 cursor-pointer ">
                  <input
                    type="radio"
                    name="userType"
                    value="student"
                    checked={formData.userType === "student"}
                    onChange={handleInputChange}
                    className="mr-3"
                  />
                  <span className="text-gray-800">Student</span>
                </label>
                <label className="flex items-center rounded-lg p-3 cursor-pointer ">
                  <input
                    type="radio"
                    name="userType"
                    value="instructor"
                    checked={formData.userType === "instructor"}
                    onChange={handleInputChange}
                    className="mr-3"
                  />
                  <span className="text-gray-800">Instructor</span>
                </label>
              </div>
              {formError.userType && (
                <p className="text-red-500 text-sm">{formError.userType}</p>
              )}
            </div>
          )}

          <>
            <div className="flex items-center gap-2 rounded-lg px-3 w-full max-w-md sm:max-w-lg ">
              <input
                type={show ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Password"
                className="flex-1 bg-transparent outline-none text-sm sm:text-base"
              />
              {!show ? (
                <EyeOff size={20} onClick={handlePassword} />
              ) : (
                <Eye size={20} onClick={handlePassword} />
              )}
            </div>
            {formError.password && (
              <p className="text-red-500 text-sm">{formError.password}</p>
            )}
          </>

          {!isLoginPage && (
            <>
              <div className="flex items-center gap-2 rounded-lg px-3 py-2 w-full max-w-md sm:max-w-lg">
                <input
                  type={showCPassword ? "text" : "password"}
                  name="cpassword"
                  value={formData.cpassword}
                  onChange={handleInputChange}
                  placeholder="Confirm Password"
                  className="flex-1 bg-transparent outline-none text-sm sm:text-base"
                />
                {!showCPassword ? (
                  <EyeOff size={20} onClick={handleCpassword} />
                ) : (
                  <Eye size={20} onClick={handleCpassword} />
                )}
              </div>
              {formError.cpassword && (
                <p className="text-red-500 text-sm">{formError.cpassword}</p>
              )}
            </>
          )}

          {/* {formData.successMsg && (
            <p className="text-green-600 text-center">{formData.successMsg}</p>
          )} */}

          <button
            type="submit"
            disabled={loading || Object.keys(formError).length > 0}
            className="w-full bg-blue-600 text-white py-2 rounded-2xl hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
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
              Don&apos;t have an account?{" "}
              <Link
                to="/signup"
                className="text-green-500 hover:underline font-medium"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-green-500 hover:underline font-medium"
              >
                Login
              </Link>
            </>
          )}
        </p>
      </div>
      <Toast
        isOpen={toast.isOpen}
        onClose={closeToast}
        message={toast.message}
        icon={toast.icon}
        iconColor={toast.iconColor}
        duration={toast.duration}
      />
    </section>
  );
};

export default AuthForm;
