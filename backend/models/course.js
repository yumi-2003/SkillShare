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
