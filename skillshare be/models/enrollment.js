const { Schema, model } = require("mongoose");

const enrollment = new Schema(
  {
    course: {
      type: Schema.Types.ObjectId, // reference to COURSES
      ref: "Course",
      required: true,
    },
    student: {
      type: Schema.Types.ObjectId, // reference to USERS
      ref: "User",
      required: true,
    },
    enrolledAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const enrollmentModel = model("Enrollment", enrollment);

module.exports = enrollmentModel;
