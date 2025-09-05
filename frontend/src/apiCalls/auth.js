import axiosInstance from "./axiosInstance";
import userAvator from "../images/userAvator.webp";
//mock api call later use of real api call for login and register

//create new account and track status
export const signUp = async (Users) => {
  try {
    // const response = await axiosInstance.post("/auth/register", userData)
    // return response.data
    // now use mock data
    await new Promise((res) => setTimeout(res, 1000));

    return {
      user: {
        id: Date.now(),
        name: Users.name,
        email: Users.email,
        userType: Users.userType,
        profileImg: Users.profileImg || userAvator,
      },
      token: "mock-jwt-token-" + Math.random().toString(36).substr(2, 9),
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//login
export const login = async (Users) => {
  try {
    // const response = await axiosInstance.post("/auth/login", userData)
    // return response.data
    //mock data
    await new Promise((res) => setTimeout(res, 1000));
    return {
      user: {
        id: 1,
        name: "Ingyin",
        email: Users.email,
        userType: Users.userType,
        profileImg: userAvator,
      },
      token: "mock-jwt-token-" + Math.random().toString(36).substr(2, 9),
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
