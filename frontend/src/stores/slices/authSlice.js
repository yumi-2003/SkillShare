import { createSlice } from "@reduxjs/toolkit";

const token = localStorage.getItem("SkillShareToken");
const user = JSON.parse(localStorage.getItem("SkillShareUser"));

// initial state
const initialState = {
  token: token || null,
  user: user || null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

//create log in, sign up, log out slice
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
