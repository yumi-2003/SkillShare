import {
  loginStart,
  loginSuccess,
  loginFail,
} from "../../stores/slices/authSlice.js";
import { signUp, login } from "../../apiCalls/auth.js";

// mode = "login" or "signUp"
export const loginUser = (payload, mode) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const response = await (mode === "login"
      ? login(payload)
      : signUp(payload));

    // store token & user in localStorage
    if (response?.token && response?.user) {
      localStorage.setItem("SkillShareToken", response.token);
      localStorage.setItem("SkillShareUser", JSON.stringify(response.user));
    }

    // dispatch full response (token + user)
    dispatch(loginSuccess(response));

    return response; // for navigation
  } catch (error) {
    dispatch(loginFail(error.message || "Something went wrong"));
    return null;
  }
};
