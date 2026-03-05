const { Schema, model } = require("mongoose");

const userSkillProgressSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    skillPath: {
      type: Schema.Types.ObjectId,
      ref: "SkillPath",
      required: true,
    },
    completedCourses: [
      {
        type: Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
    completedQuicks: [
      {
        type: Schema.Types.ObjectId,
        ref: "Quick",
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

const userSkillProgressModel = model("UserSkillProgress", userSkillProgressSchema);

module.exports = userSkillProgressModel;
