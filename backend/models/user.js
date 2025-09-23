const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      required: true,
      type: String,
    },
    email: {
      required: true,
      unique: true,
      trim: true,
      type: String,
    },
    password: {
      required: true,
      type: String,
    },
    userType: {
      type: String,
      default: "student",
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const userModel = model("User", userSchema);

module.exports = userModel;
