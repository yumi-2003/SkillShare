const Quick = require("../models/quick");
const User = require("../models/user");
const Badge = require("../models/badge");
const { validationResult } = require("express-validator");

// Admin: Add a new Quick
exports.addQuick = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ isSuccess: false, message: errors.array()[0].msg });
  }

  try {
    const quick = await Quick.create(req.body);
    res.status(201).json({ isSuccess: true, message: "Quick added successfully", quick });
  } catch (err) {
    res.status(500).json({ isSuccess: false, message: err.message });
  }
};

// Admin: Get all Quicks (for management)
exports.getAllQuicks = async (req, res) => {
  try {
    const quicks = await Quick.find().populate("category");
    res.status(200).json({ isSuccess: true, quicks });
  } catch (err) {
    res.status(500).json({ isSuccess: false, message: err.message });
  }
};

// Admin: Update Quick
exports.updateQuick = async (req, res) => {
  try {
    const quick = await Quick.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!quick) return res.status(404).json({ isSuccess: false, message: "Quick not found" });
    res.status(200).json({ isSuccess: true, message: "Quick updated", quick });
  } catch (err) {
    res.status(500).json({ isSuccess: false, message: err.message });
  }
};

// Admin: Delete Quick
exports.deleteQuick = async (req, res) => {
  try {
    const quick = await Quick.findByIdAndDelete(req.params.id);
    if (!quick) return res.status(404).json({ isSuccess: false, message: "Quick not found" });
    res.status(200).json({ isSuccess: true, message: "Quick deleted" });
  } catch (err) {
    res.status(500).json({ isSuccess: false, message: err.message });
  }
};

// User: Get Quicks by Category
exports.getQuicksByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const quicks = await Quick.find({ category: categoryId });
    res.status(200).json({ isSuccess: true, quicks });
  } catch (err) {
    res.status(500).json({ isSuccess: false, message: err.message });
  }
};

// User: Complete a Quick
exports.completeQuick = async (req, res) => {
  const userId = req.user.userId;
  const { quickId } = req.params;

  try {
    const user = await User.findById(userId);
    if (user.completedQuicks.includes(quickId)) {
      return res.status(400).json({ isSuccess: false, message: "Quick already completed" });
    }

    const quick = await Quick.findById(quickId);
    if (!quick) return res.status(404).json({ isSuccess: false, message: "Quick not found" });

    // Award points and mark as completed
    user.completedQuicks.push(quickId);
    user.points += quick.points || 10;
    await user.save();

    // Check for new badges
    const categoryQuicksCount = await Quick.countDocuments({
      _id: { $in: user.completedQuicks },
      category: quick.category,
    });

    const eligibleBadges = await Badge.find({
      category: quick.category,
      criteria: { $lte: categoryQuicksCount },
      _id: { $nin: user.earnedBadges },
    });

    if (eligibleBadges.length > 0) {
      user.earnedBadges.push(...eligibleBadges.map(b => b._id));
      await user.save();
    }

    res.status(200).json({
      isSuccess: true,
      message: "Quick completed!",
      pointsAwarded: quick.points,
      newBadges: eligibleBadges,
    });
  } catch (err) {
    res.status(500).json({ isSuccess: false, message: err.message });
  }
};
