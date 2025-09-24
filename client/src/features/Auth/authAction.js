import {
  loginStart,
  loginSuccess,
  loginFail,
} from "../../stores/slices/authSlice";
import { login, signUp } from "../../apiCalls/auth.js";

export const loginUser = (payload, mode) => async (dispatch) => {
  dispatch(loginStart()); // loading status
  try {
    // login or signup API call
    const response =
      mode === "login" ? await login(payload) : await signUp(payload);

    // check if response is valid
    if (!response?.token || !response?.user) {
      throw new Error("Authentication Failed");
    }

    //if success, store in redux
    dispatch(loginSuccess(response));
    return response; // success response
  } catch (error) {
    //handle error
    dispatch(loginFail(error.message || "Something went wrong"));
    throw error;
  }
};
