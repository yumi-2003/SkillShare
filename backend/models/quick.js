const { Schema, model } = require("mongoose");

const quickSchema = new Schema(
  {
    title: {
      required: true,
      type: String,
    },
    description: {
      required: true,
      type: String,
    },
    videoUrl: {
      type: String, // Optional: for short video content
    },
    content: {
      type: String, // For text-based quick learning
    },
    points: {
      type: Number,
      default: 10,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const quickModel = model("Quick", quickSchema);

module.exports = quickModel;
