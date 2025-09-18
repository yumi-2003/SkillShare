const { Schema, model } = require("mongoose");

const category = new Schema({
  name: {
    required: true,
    type: String,
  },
  description: {
    required: true,
    type: String,
  },
});

const categoryModel = model("Category", category);

module.exports = categoryModel;
