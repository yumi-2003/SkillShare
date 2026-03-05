const { Schema, model } = require("mongoose");

const courseSchema = new Schema(
  {
    title: {
      required: true,
      type: String,
    },
    description: {
      required: true,
      type: String,
    },
    totalLessons: {
      type: Number,
    },
    duration: {
      type: String,
    },
    image: {
      type: String,
    },
    instructor: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    totalReviews: {
      type: Number,
      default: 0,
    },
    lessons: [
      {
        title: { type: String, required: true },
        content: { type: String, required: true }, // Video URL or Blog content
        type: { type: String, enum: ["video", "blog"], default: "video" },
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const courseModel = model("Course", courseSchema);

module.exports = courseModel;
