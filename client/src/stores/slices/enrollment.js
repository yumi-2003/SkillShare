import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../apiCalls/axiosInstance";

//enroll in a course
export const enrollInCourse = createAsyncThunk(
  "enrollment/enrollInCourse",
  async ({ courseId, userId }) => {
    try {
      const res = await axiosInstance.post(`/auth/courses/${courseId}/enroll`, {
        userId,
      });
      return res.data;
    } catch (err) {
      throw err.response.data ? err.response.data : err.message;
    }
  }
);

//get all enrollments of current user
export const getMyEnrollments = createAsyncThunk(
  "enrollment/getMyEnrollments",
  async ({ userId }) => {
    try {
      const res = await axiosInstance.get(`/auth/my-enrollments`, {
        // data: { userId },
        params: { userId },
      });
      return res.data;
    } catch (err) {
      throw err.response.data ? err.response.data : err.message;
    }
  }
);

//check if current user is enrolled in a course
export const getEnrollmentStatus = createAsyncThunk(
  "enrollment/getEnrollmentStatus",
  async ({ courseId, userId }) => {
    try {
      const res = await axiosInstance.get(`/enroll-status/${courseId}`, {
        data: { userId },
      });
      return res.data;
    } catch (err) {
      throw err.response.data ? err.response.data : err.message;
    }
  }
);

//get students enrolled in a course (for instructors)
export const getCourseEnrollees = createAsyncThunk(
  "enrollment/getCourseEnrollees",
  async ({ courseId, userId }) => {
    try {
      const res = await axiosInstance.get(
        `/auth/courses/${courseId}/enrollees`,
        {
          data: { userId },
          // params: { userId },
        }
      );
      return res.data;
    } catch (err) {
      throw err.response.data ? err.response.data : err.message;
    }
  }
);

const enrollmentSlice = createSlice({
  name: "enrollment",
  initialState: {
    myEnrollments: [],
    enrollmentStatus: false,
    courseEnrollees: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(enrollInCourse.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(enrollInCourse.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.myEnrollments.push(action.payload.enrollment);
      })
      .addCase(enrollInCourse.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getMyEnrollments.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getMyEnrollments.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.myEnrollments = Array.isArray(action.payload.enrollments)
          ? action.payload.enrollments
          : [];
      })
      .addCase(getMyEnrollments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getEnrollmentStatus.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getEnrollmentStatus.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.enrollmentStatus = action.payload.enrolled;
      })
      .addCase(getEnrollmentStatus.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getCourseEnrollees.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getCourseEnrollees.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.courseEnrollees = Array.isArray(action.payload.enrollments)
          ? action.payload.enrollments
          : [];
      })
      .addCase(getCourseEnrollees.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export default enrollmentSlice.reducer;
