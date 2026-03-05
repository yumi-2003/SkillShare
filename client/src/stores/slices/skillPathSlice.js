import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../apiCalls/axiosInstance";

export const fetchSkillPaths = createAsyncThunk(
  "skillPath/fetchSkillPaths",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/api/skill-paths");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchSkillPathById = createAsyncThunk(
  "skillPath/fetchSkillPathById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/api/skill-paths/${id}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateSkillProgress = createAsyncThunk(
  "skillPath/updateSkillProgress",
  async (progressData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/update-skill-progress", progressData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const skillPathSlice = createSlice({
  name: "skillPath",
  initialState: {
    skillPaths: [],
    currentSkillPath: null,
    progress: null,
    loading: false,
    error: null,
    message: null,
  },
  reducers: {
    clearSkillPathError: (state) => {
      state.error = null;
    },
    clearSkillPathMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchSkillPaths
      .addCase(fetchSkillPaths.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSkillPaths.fulfilled, (state, action) => {
        state.loading = false;
        state.skillPaths = action.payload.skillPaths;
      })
      .addCase(fetchSkillPaths.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Something went wrong";
      })
      // fetchSkillPathById
      .addCase(fetchSkillPathById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSkillPathById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentSkillPath = action.payload.skillPath;
        state.progress = action.payload.progress;
      })
      .addCase(fetchSkillPathById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Something went wrong";
      })
      // updateSkillProgress
      .addCase(updateSkillProgress.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateSkillProgress.fulfilled, (state, action) => {
        state.loading = false;
        state.progress = action.payload.progress;
        state.message = action.payload.message;
      })
      .addCase(updateSkillProgress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Something went wrong";
      });
  },
});

export const { clearSkillPathError, clearSkillPathMessage } = skillPathSlice.actions;

export default skillPathSlice.reducer;
