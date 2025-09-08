import { createSlice } from "@reduxjs/toolkit";

// Safe parsing function for localStorage
const getUserFromLocalStorage = () => {
  const data = localStorage.getItem("SkillShareUser");
  if (!data || data === "undefined") return null; // handle undefined or empty string
  try {
    return JSON.parse(data);
  } catch (err) {
    console.warn("Failed to parse SkillShareUser from localStorage:", err);
    return null;
  }
};

const token = localStorage.getItem("SkillShareToken");
const user = getUserFromLocalStorage();

const initialState = {
  token: token || null,
  user: user || null,
  isAuthenticated: !!token,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      localStorage.setItem("SkillShareToken", action.payload.token);
      localStorage.setItem(
        "SkillShareUser",
        JSON.stringify(action.payload.user)
      );
    },
    loginFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logOut: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      localStorage.removeItem("SkillShareToken");
      localStorage.removeItem("SkillShareUser");
    },
  },
});

export const { loginStart, loginSuccess, loginFail, logOut } =
  authSlice.actions;
export default authSlice.reducer;
