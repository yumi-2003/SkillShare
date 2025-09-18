const { validationResult } = require("express-validator");
const Category = require("../models/category");

// Create category
exports.addCategory = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ isSuccess: false, message: errors.array()[0].msg });
  }

  try {
    const { name, description } = req.body;

    const existing = await Category.findOne({ name: name.trim() });
    if (existing) {
      return res.status(409).json({ isSuccess: false, message: "Category already exists." });
    }

    const categoryDoc = await Category.create({ name, description });

    return res.status(201).json({
      isSuccess: true,
      message: "Category created successfully.",
      category: categoryDoc,
    });
  } catch (err) {
    return res.status(422).json({ isSuccess: false, message: err.message });
  }
};

// Get all categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find({}).sort({ name: 1 });
    return res.status(200).json({ isSuccess: true, categories });
  } catch (err) {
    return res.status(422).json({ isSuccess: false, message: err.message });
  }
};

// Get category by id
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ isSuccess: false, message: "Category not found." });
    }
    return res.status(200).json({ isSuccess: true, category });
  } catch (err) {
    return res.status(422).json({ isSuccess: false, message: err.message });
  }
};

// Update category
exports.updateCategory = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ isSuccess: false, message: errors.array()[0].msg });
  }

  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const categoryDoc = await Category.findById(id);
    if (!categoryDoc) {
      return res.status(404).json({ isSuccess: false, message: "Category not found." });
    }

    // prevent name duplication
    if (name && name.trim() !== categoryDoc.name) {
      const duplicate = await Category.findOne({ name: name.trim() });
      if (duplicate) {
        return res.status(409).json({ isSuccess: false, message: "Category already exists." });
      }
    }

    categoryDoc.name = name;
    categoryDoc.description = description;
    await categoryDoc.save();

    return res.status(200).json({
      isSuccess: true,
      message: "Category updated successfully.",
      category: categoryDoc,
    });
  } catch (err) {
    return res.status(422).json({ isSuccess: false, message: err.message });
  }
};

// Delete category
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const categoryDoc = await Category.findById(id);
    if (!categoryDoc) {
      return res.status(404).json({ isSuccess: false, message: "Category not found." });
    }

    await Category.findByIdAndDelete(id);

    return res.status(202).json({
      isSuccess: true,
      message: "Category deleted successfully.",
      category: categoryDoc,
    });
  } catch (err) {
    return res.status(422).json({ isSuccess: false, message: err.message });
  }
};


