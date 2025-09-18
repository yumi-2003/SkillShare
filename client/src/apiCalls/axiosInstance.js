import axios from "axios";
import { logout } from "./auth";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000", // api base url
  // timeout: 10000, // request timeout in millseconds
  headers: {
    "Content-Type": "application/json",
  },
});

//add request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    //get token from localStorage
    const token = localStorage.getItem("SkillShareToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // for token request to server
    }
    // If payload is FormData, let the browser set proper multipart boundaries
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"]; // axios will set it to multipart/form-data with boundary
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//add response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response; // return response if success
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      //handle unauthorized error
      console.log("Unauthorized error");
      //logout user
      logout();
    }
    return Promise.reject(error);
  }
);
export default axiosInstance;
