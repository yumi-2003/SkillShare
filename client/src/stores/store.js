import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import categoryReducer from "./slices/categorySlice";
import courseReducer from "./slices/courseSlice";
import enrollmentReducer from "./slices/enrollment";
import profileReducer from "./slices/profileSlice";
import reviewReducer from "./slices/reviewSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    category: categoryReducer,
    course: courseReducer,
    // Add enrollment slice reducer
    enrollment: enrollmentReducer,
    profile: profileReducer,
    review: reviewReducer,
  },
});
