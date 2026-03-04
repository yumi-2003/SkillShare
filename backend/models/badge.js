const { Schema, model } = require("mongoose");

const badgeSchema = new Schema(
  {
    name: {
      required: true,
      type: String,
    },
    description: {
      trim: true,
      type: String,
    },
    image: {
      type: String, // URL to the badge icon
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    criteria: {
      type: Number, // Number of quicks in this category required to earn the badge
      required: true,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

const badgeModel = model("Badge", badgeSchema);

module.exports = badgeModel;
