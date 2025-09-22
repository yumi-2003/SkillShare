import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../apiCalls/axiosInstance";

//get all review for a course
export const getReviewsByCourse = createAsyncThunk(
  "reviews/getByCourse",
  async (courseId) => {
    const res = await axiosInstance.get(`/api/reviews/course/${courseId}`);
    return res.data; // return { reviews: [...] }
  }
);

// add review
export const addReview = createAsyncThunk(
  "reviews/add",
  async ({ courseId, reviewData = {} }) => {
    const res = await axiosInstance.post("/api/reviews", {
      ...reviewData,
      courseId,
    });
    return res.data; // return created review
  }
);

//update review
export const updateReview = createAsyncThunk(
  "reviews/update",
  async ({ reviewId, reviewData }) => {
    const res = await axiosInstance.put(`/api/reviews/${reviewId}`, reviewData);
    return res.data; // updated review
  }
);

//delete review
export const deleteReview = createAsyncThunk(
  "reviews/delete",
  async (reviewId) => {
    await axiosInstance.delete(`/api/reviews/${reviewId}`);
    return reviewId; // return deleted review id
  }
);

//slice
const reviewSlice = createSlice({
  name: "reviews",
  initialState: {
    list: [],
    status: "idle",
    error: null,
  },
  reducers: {
    clearReviews: (state) => {
      state.list = [];
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get reviews
      .addCase(getReviewsByCourse.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getReviewsByCourse.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = Array.isArray(action.payload.reviews)
          ? action.payload.reviews
          : [];
      })
      .addCase(getReviewsByCourse.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // Add review
      .addCase(addReview.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list.push(action.payload);
      })
      .addCase(addReview.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // --- Update Review ---
      .addCase(updateReview.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateReview.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = state.list.map((review) =>
          review._id === action.payload._id ? action.payload : review
        );
      })
      .addCase(updateReview.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // --- Delete Review ---
      .addCase(deleteReview.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = state.list.filter((r) => r._id !== action.payload);
      })
      .addCase(deleteReview.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { clearReviews } = reviewSlice.actions;
export default reviewSlice.reducer;
