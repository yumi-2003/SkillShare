// src/stores/slices/profileSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../apiCalls/axiosInstance";

// --- GET PROFILE ---
export const getProfile = createAsyncThunk("profile/getProfile", async () => {
  const res = await axiosInstance.get("/api/profile");
  return res.data.user; // return only user object
});

// --- UPDATE PROFILE ---
export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async (formData) => {
    const res = await axiosInstance.put("/api/profile", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data.user; // return updated user
  }
);

// --- DELETE PROFILE ---
export const deleteProfile = createAsyncThunk(
  "profile/deleteProfile",
  async ({ password }) => {
    const res = await axiosInstance.delete("/api/profile", {
      data: { password },
    });
    return res.data.message; // success message
  }
);

// --- SLICE ---
const profileSlice = createSlice({
  name: "profile",
  initialState: {
    user: null,
    status: "idle", // idle | loading | succeeded | failed
    error: null,
    success: false,
  },
  reducers: {
    resetProfileState: (state) => {
      state.status = "idle";
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // GET PROFILE
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
        state.error = action.error.message;
      })

      // UPDATE PROFILE
      .addCase(updateProfile.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.success = false;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        if (state.user.image) {
          // update preview if backend returned image URL
          state.preview = state.user.image;
        }
        state.success = true;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.success = false;
      })

      // DELETE PROFILE
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
        state.error = action.error.message;
        state.success = false;
      });
  },
});

export const { resetProfileState } = profileSlice.actions;
export default profileSlice.reducer;
