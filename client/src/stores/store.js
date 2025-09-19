import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import themeReducer from "./slices/themeSlice";
import categoryReducer from "./slices/categorySlice";
import courseReducer from "./slices/courseSlice";
import enrollmentReducer from "./slices/enrollment";

export default configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    theme: themeReducer,
    category: categoryReducer,
    course: courseReducer,
    // Add enrollment slice reducer
    enrollment: enrollmentReducer,
  },
});
