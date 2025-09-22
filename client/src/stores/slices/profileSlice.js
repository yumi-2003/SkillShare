import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../apiCalls/axiosInstance";

//get profile
export const getProfile = createAsyncThunk(
  ("/user/getProfile",
  async () => {
    try {
      const res = await axiosInstance.get("/api/profile");
      return res.data;
    } catch (error) {
      throw error.response.data ? error.response.data : error.message;
    }
  })
);

//update profile
export const updateProfile = createAsyncThunk(
  "/user/update",
  async (formData) => {
    try {
      const res = await axiosInstance.put("/api/profile", formData);
      return res.data;
    } catch (error) {
      throw error.response.data ? error.response.data : error.message;
    }
  }
);

//deleteProfile
export const deleteProfile = createAsyncThunk(
  "/user/delete",
  async ({ password }) => {
    try {
      const res = await axiosInstance.delete("/api/profile", {
        data: { password },
      });
      return res.data;
    } catch (error) {
      throw error.response.data ? error.response.data : error.message;
    }
  }
);

//create slice to update profile
const profileSlice = createSlice({
  name: "profile",
  initialState: {
    user: null,
    status: "idle", // idle | loading | succeeded | failed
    error: null,
    success: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // getProfile
      .addCase(getProfile.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })

      // updateProfile
      .addCase(updateProfile.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.success = false;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.success = true;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })

      // deleteProfile
      .addCase(deleteProfile.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.success = false;
      })
      .addCase(deleteProfile.fulfilled, (state) => {
        state.status = "succeeded";
        state.user = null;
        state.success = true;
      })
      .addCase(deleteProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});

export default profileSlice.reducer;
