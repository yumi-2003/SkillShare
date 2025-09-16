import {
  loginStart,
  loginSuccess,
  loginFail,
} from "../../stores/slices/authSlice";
import { login, signUp } from "../../apiCalls/auth.js";

export const loginUser = (payload, mode) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const response =
      mode === "login" ? await login(payload) : await signUp(payload);

    if (!response?.token || !response?.user) {
      throw new Error("Authentication Failed"); // <-- throw if invalid
    }

    dispatch(loginSuccess(response));
    return response; // success response
  } catch (error) {
    dispatch(loginFail(error.message || "Something went wrong"));
    throw error; // <-- important so component can catch it
  }
};
