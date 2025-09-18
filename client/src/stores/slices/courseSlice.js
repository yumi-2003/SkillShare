import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../apiCalls/axiosInstance";

// Fetch all courses
export const getAllCourses = createAsyncThunk(
  "courses/getAllCourses",
  async () => {
    const res = await axiosInstance.get("/api/courses");
    return res.data;
  }
);

// Create new course
export const createCourse = createAsyncThunk(
  "courses/create",
  async (courseData) => {
    const res = await axiosInstance.post("/auth/create-course", courseData);
    return res.data;
  }
);

// Update course
export const updateCourse = createAsyncThunk(
  "courses/update",
  async ({ id, data }) => {
    const res = await axiosInstance.put(`/auth/update-course/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data", // ensure file + text fields are sent
      },
    });
    return res.data;
  }
);

// Delete course
export const deleteCourse = createAsyncThunk(
  "courses/delete",
  async ({ id, userId }) => {
    await axiosInstance.delete(`/auth/courses/${id}`, {
      data: { userId },
    });
    return id;
  }
);

// Course slice
const courseSlice = createSlice({
  name: "course",
  initialState: { list: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all courses
      .addCase(getAllCourses.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getAllCourses.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = Array.isArray(action.payload.courses)
          ? action.payload.courses
          : [];
      })
      .addCase(getAllCourses.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // Create course
      .addCase(createCourse.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createCourse.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(createCourse.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // Delete course
      .addCase(deleteCourse.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = state.list.filter(
          (course) => course._id !== action.payload
        );
      })
      .addCase(deleteCourse.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // Update course
      .addCase(updateCourse.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateCourse.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = state.list.map((item) =>
          item._id === action.payload._id ? action.payload : item
        );
      })
      .addCase(updateCourse.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default courseSlice.reducer;
