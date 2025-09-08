import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../apiCalls/axiosInstance";

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
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      // Add
      .addCase(addNewCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload);
      })
      // Delete
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter((item) => item.id !== action.payload);
      })
      // Update
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.categories = state.categories.map((item) =>
          item.id === action.payload.id ? action.payload : item
        );
      });
  },
});

export default categorySlice.reducer;
