import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000", // api base url
  timeout: 5000, // request timeout in millseconds
  headers: {
    "Content-Type": "application/json",
  },
});

//add request interceptor
axiosInstance.interceptors.request.use(
    (config)=>{
        //get token from localStorage
        const token = localStorage.getItem("SkillShareToken");
        if(token){
            config.headers.Authorization = `Bearer ${token}` // for token request to server
        }
        return config
    },
    (error)=>{
        return Promise.reject(error)
    }
)

//add response interceptor
axiosInstance.interceptors.response.use(
    (response)=>{
        return response // return response if success
    }, (error) => {
    if(error.response && error.response.status === 401){
        //handle unauthorized error
        console.log("Unauthorized error")
        //logout user
        logOut()
    }
    return Promise.reject(error)
}
)
export default axiosInstance
