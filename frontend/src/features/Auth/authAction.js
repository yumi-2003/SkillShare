import {
  loginStart,
  loginSuccess,
  loginFail,
} from "../../stores/slices/authSlice.js";
import { signUp, login } from "../../apiCalls/auth.js";

// mode = "login" or "singUp"
export const loginUser = (Users, mode) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const response = await (mode === "login" ? login(Users) : signUp(Users));
    dispatch(loginSuccess(response));
    return response;
  } catch (error) {
    dispatch(loginFail(error.message) || "Something went Wrong");
    return error.message;
  }
};
