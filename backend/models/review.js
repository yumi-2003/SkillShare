const { Schema, model } = require("mongoose");

const reviewSchema = new Schema(
  {
    course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },
    isEnrolled: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Index for efficient queries (allows multiple reviews per student per course)
reviewSchema.index({ course: 1, student: 1 });

const reviewModel = model("Review", reviewSchema);

module.exports = reviewModel;
