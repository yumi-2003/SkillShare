import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../apiCalls/axiosInstance";

// fetch all courses
export const getAllCourses = createAsyncThunk("courses/fetchAll", async () => {
  const res = await axiosInstance.get("courses");
  return res.data;
});

//create new courses
export const createCourse = createAsyncThunk(
  "courses/create",
  async (courseData) => {
    const res = await axiosInstance.post("/create-course", courseData);
    return res.data;
  }
);

//update courses
export const updateCourse = createAsyncThunk(
  "courses/update",
  async ({ id, data }) => {
    const res = await axiosInstance.put(`/courses/${id}`, data);
    return res.data;
  }
);

//deleCourses
export const deleteCourse = createAsyncThunk("/courses/delete", async (id) => {
  await axiosInstance.delete(`/courses/${id}`);
  return id;
});

//create course slice
const courseSlice = createSlice({
  name: "course",
  initialState: { list: [], state: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      //fetch all course
      .addCase(getAllCourses.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getAllCourses.fulfilled, (state, action) => {
        state.state = "succeeded";
        state.list = action.payload;
      })
      .addCase(getAllCourses.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //add new course
      .addCase(createCourse.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createCourse.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list.push(action.payload);
      })
      .addCase(createCourse.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //delete course
      .addCase(deleteCourse.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = state.list.filter((item) => item.id !== action.payload);
      })
      .addCase(deleteCourse.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //update course
      .addCase(updateCourse.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateCourse.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = state.list.map((item) =>
          item.id === action.payload ? action.payload : item
        );
      })
      .addCase(updateCourse.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export default courseSlice.reducer;
