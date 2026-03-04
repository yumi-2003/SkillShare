import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as quickApi from "../../apiCalls/quickApi";

export const fetchQuicksByCategory = createAsyncThunk(
  "quicks/fetchByCategory",
  async (categoryId, { rejectWithValue }) => {
    try {
      return await quickApi.getQuicksByCategory(categoryId);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const submitCompleteQuick = createAsyncThunk(
  "quicks/complete",
  async (quickId, { rejectWithValue }) => {
    try {
      return await quickApi.completeQuick(quickId);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const quickSlice = createSlice({
  name: "quicks",
  initialState: {
    quicks: [],
    loading: false,
    error: null,
    lastCompletedResult: null,
  },
  reducers: {
    clearResult: (state) => {
      state.lastCompletedResult = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuicksByCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchQuicksByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.quicks = action.payload.quicks;
      })
      .addCase(fetchQuicksByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(submitCompleteQuick.fulfilled, (state, action) => {
        state.lastCompletedResult = action.payload;
      });
  },
});

export const { clearResult } = quickSlice.actions;
export default quickSlice.reducer;
