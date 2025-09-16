import axiosInstance from "./axiosInstance";
import userAvator from "../images/userAvator.webp";
import { handleError } from "../util/handleError";

//create new account and track status
export const signUp = async (payload) => {
  try {
    const res = await axiosInstance.post("/register", payload);
    if (res.data.token && res.data.user) {
      localStorage.setItem("SkillShareToken", res.data.token);
      localStorage.setItem("SkillShareUser", JSON.stringify(res.data.user));
    }
    return res.data;
  } catch (error) {
    handleError(error, "Sign Up Failed");
    throw error;
  }
};

//login
export const login = async (payload) => {
  try {
    const res = await axiosInstance.post("/login", payload);
    if (res.data.token) {
      localStorage.setItem("SkillShareToken", res.data.token);
      localStorage.setItem("SkillShareUser", JSON.stringify(res.data.user));
    }
    return res.data;
  } catch (error) {
    handleError(error, "Login Failed");
    throw error;
  }
};

//logout user
export const logout = async (payload) => {
  localStorage.removeItem("SkillShareToken");
  window.location.href = "/login";
};

//check current user

export const checkCurrentUser = async (payload) => {
  try {
    const res = await axiosInstance.get("/get-current-user");
    return res.data;
  } catch (error) {
    // Optionally handle the error here
    handleError(error, "Check Current User Failed");
  }
};
