const { Schema, model } = require("mongoose");

const skillPathSchema = new Schema(
  {
    title: {
      required: true,
      type: String,
    },
    description: {
      required: true,
      type: String,
    },
    courses: [
      {
        type: Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
    quicks: [
      {
        type: Schema.Types.ObjectId,
        ref: "Quick",
      },
    ],
    difficulty: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
    },
    instructor: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const skillPathModel = model("SkillPath", skillPathSchema);

module.exports = skillPathModel;
