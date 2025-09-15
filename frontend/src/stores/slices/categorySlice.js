import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../apiCalls/axiosInstance";
import { act } from "react";

// Fetch all categories
export const getAllCategories = createAsyncThunk(
  "category/getAllCategories",
  async () => {
    const response = await axiosInstance.get("/categories");
    return response.data.categories || [];
  }
);

// Add new category
export const addNewCategory = createAsyncThunk(
  "category/addNewCategory",
  async (data) => {
    const response = await axiosInstance.post("/categories", data);
    return response.data;
  }
);

// Delete category
export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async (id) => {
    await axiosInstance.delete(`/categories/${id}`);
    return id; // return the id to filter it out from state
  }
);

// Update category
export const updateCategory = createAsyncThunk(
  "category/updateCategory",
  async ({ id, updates }) => {
    const response = await axiosInstance.put(`/categories/${id}`, updates);
    return response.data;
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(getAllCategories.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categories = action.payload;
      })
      .addCase(getAllCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Add
      .addCase(addNewCategory.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(addNewCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categories.push(action.payload);
      })
      .addCase(addNewCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Delete
      .addCase(deleteCategory.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categories = state.categories.filter(
          (item) => item.id !== action.payload
        );
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Update
      .addCase(updateCategory.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categories = state.categories.map((item) =>
          item.id === action.payload.id ? action.payload : item
        );
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default categorySlice.reducer;
