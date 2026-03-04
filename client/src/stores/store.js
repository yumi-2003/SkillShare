import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import categoryReducer from "./slices/categorySlice";
import courseReducer from "./slices/courseSlice";
import enrollmentReducer from "./slices/enrollment";
import profileReducer from "./slices/profileSlice";
import reviewReducer from "./slices/reviewSlice";
import quickReducer from "./slices/quickSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    category: categoryReducer,
    course: courseReducer,
    enrollment: enrollmentReducer,
    profile: profileReducer,
    review: reviewReducer,
    quicks: quickReducer,
  },
});
