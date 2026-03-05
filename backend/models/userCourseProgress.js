const { Schema, model } = require("mongoose");

const userCourseProgressSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    completedLessons: [
      {
        type: Schema.Types.ObjectId, // references the _id of the lesson subdocument in Course.lessons
      },
    ],
    percentage: {
      type: Number,
      default: 0,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Ensure unique progress entry per user/course
userCourseProgressSchema.index({ user: 1, course: 1 }, { unique: true });

const UserCourseProgress = model("UserCourseProgress", userCourseProgressSchema);

module.exports = UserCourseProgress;
