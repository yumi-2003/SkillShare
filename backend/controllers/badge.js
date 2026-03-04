const Badge = require("../models/badge");
const { validationResult } = require("express-validator");

// Admin: Add a new Badge
exports.addBadge = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ isSuccess: false, message: errors.array()[0].msg });
  }

  try {
    const badge = await Badge.create(req.body);
    res.status(201).json({ isSuccess: true, message: "Badge created successfully", badge });
  } catch (err) {
    res.status(500).json({ isSuccess: false, message: err.message });
  }
};

// Admin: Get all Badges
exports.getAllBadges = async (req, res) => {
  try {
    const badges = await Badge.find().populate("category");
    res.status(200).json({ isSuccess: true, badges });
  } catch (err) {
    res.status(500).json({ isSuccess: false, message: err.message });
  }
};

// Admin: Update Badge
exports.updateBadge = async (req, res) => {
  try {
    const badge = await Badge.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!badge) return res.status(404).json({ isSuccess: false, message: "Badge not found" });
    res.status(200).json({ isSuccess: true, message: "Badge updated", badge });
  } catch (err) {
    res.status(500).json({ isSuccess: false, message: err.message });
  }
};

// Admin: Delete Badge
exports.deleteBadge = async (req, res) => {
  try {
    const badge = await Badge.findByIdAndDelete(req.params.id);
    if (!badge) return res.status(404).json({ isSuccess: false, message: "Badge not found" });
    res.status(200).json({ isSuccess: true, message: "Badge deleted" });
  } catch (err) {
    res.status(500).json({ isSuccess: false, message: err.message });
  }
};
