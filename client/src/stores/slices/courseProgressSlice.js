import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../apiCalls/axiosInstance";

export const fetchCourseProgress = createAsyncThunk(
  "courseProgress/fetchCourseProgress",
  async (courseId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/course-progress/${courseId}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const toggleLessonCompletion = createAsyncThunk(
  "courseProgress/toggleLessonCompletion",
  async ({ courseId, lessonId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/course-progress/toggle", {
        courseId,
        lessonId,
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const courseProgressSlice = createSlice({
  name: "courseProgress",
  initialState: {
    progress: {
      completedLessons: [],
      percentage: 0,
      isCompleted: false,
    },
    loading: false,
    error: null,
  },
  reducers: {
    clearProgress: (state) => {
      state.progress = { completedLessons: [], percentage: 0, isCompleted: false };
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch progress
      .addCase(fetchCourseProgress.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCourseProgress.fulfilled, (state, action) => {
        state.loading = false;
        state.progress = action.payload.progress;
      })
      .addCase(fetchCourseProgress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Toggle completion
      .addCase(toggleLessonCompletion.fulfilled, (state, action) => {
        state.progress = action.payload.progress;
      });
  },
});

export const { clearProgress } = courseProgressSlice.actions;
export default courseProgressSlice.reducer;
