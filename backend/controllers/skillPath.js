const SkillPath = require("../models/skillPath");
const UserSkillProgress = require("../models/userSkillProgress");
const Badge = require("../models/badge");
const User = require("../models/user");
const { validationResult } = require("express-validator");

// Instructor: Create a new Skill Path
exports.createSkillPath = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ isSuccess: false, message: errors.array()[0].msg });
  }

  try {
    const skillPath = await SkillPath.create({
      ...req.body,
      instructor: req.userId,
    });
    res.status(201).json({ isSuccess: true, message: "Skill Roadmap created successfully", skillPath });
  } catch (err) {
    res.status(500).json({ isSuccess: false, message: err.message });
  }
};

// Get all Skill Paths
exports.getSkillPaths = async (req, res) => {
  try {
    const skillPaths = await SkillPath.find().populate("instructor", "name image");
    res.status(200).json({ isSuccess: true, skillPaths });
  } catch (err) {
    res.status(500).json({ isSuccess: false, message: err.message });
  }
};

// Get single Skill Path with progress
exports.getSkillPathById = async (req, res) => {
  try {
    const skillPath = await SkillPath.findById(req.params.id)
      .populate("courses")
      .populate("quicks")
      .populate("instructor", "name image");

    if (!skillPath) {
      return res.status(404).json({ isSuccess: false, message: "Skill Roadmap not found" });
    }

    let progress = null;
    if (req.userId) {
      progress = await UserSkillProgress.findOne({
        user: req.userId,
        skillPath: skillPath._id,
      });
    }

    res.status(200).json({ isSuccess: true, skillPath, progress });
  } catch (err) {
    res.status(500).json({ isSuccess: false, message: err.message });
  }
};

// Instructor: Update Skill Path
exports.updateSkillPath = async (req, res) => {
  try {
    const skillPath = await SkillPath.findOneAndUpdate(
      { _id: req.params.id, instructor: req.userId },
      req.body,
      { new: true }
    );
    if (!skillPath) {
      return res.status(404).json({ isSuccess: false, message: "Skill Roadmap not found or unauthorized" });
    }
    res.status(200).json({ isSuccess: true, message: "Skill Roadmap updated", skillPath });
  } catch (err) {
    res.status(500).json({ isSuccess: false, message: err.message });
  }
};

// Instructor: Delete Skill Path
exports.deleteSkillPath = async (req, res) => {
  try {
    const skillPath = await SkillPath.findOneAndDelete({ _id: req.params.id, instructor: req.userId });
    if (!skillPath) {
      return res.status(404).json({ isSuccess: false, message: "Skill Roadmap not found or unauthorized" });
    }
    res.status(200).json({ isSuccess: true, message: "Skill Roadmap deleted" });
  } catch (err) {
    res.status(500).json({ isSuccess: false, message: err.message });
  }
};

// Update User Progress
exports.updateUserProgress = async (req, res) => {
  const { skillPathId, courseId, quickId } = req.body;
  try {
    let progress = await UserSkillProgress.findOne({
      user: req.userId,
      skillPath: skillPathId,
    });

    if (!progress) {
      progress = new UserSkillProgress({
        user: req.userId,
        skillPath: skillPathId,
        completedCourses: [],
        completedQuicks: [],
      });
    }

    if (courseId && !progress.completedCourses.includes(courseId)) {
      progress.completedCourses.push(courseId);
    }
    if (quickId && !progress.completedQuicks.includes(quickId)) {
      progress.completedQuicks.push(quickId);
    }

    // Recalculate percentage
    const skillPath = await SkillPath.findById(skillPathId);
    const totalItems = skillPath.courses.length + skillPath.quicks.length;
    const completedItems = progress.completedCourses.length + progress.completedQuicks.length;
    progress.percentage = Math.round((completedItems / totalItems) * 100);

    if (progress.percentage === 100 && !progress.isCompleted) {
      progress.isCompleted = true;
      
      // Award Milestone Badge
      // Find a milestone badge for this skillPath or general category
      // For simplicity, let's assume there's a badge with the same title as the skillPath or a generic one
      const badge = await Badge.findOne({ name: `Master of ${skillPath.title}` }) || await Badge.findOne({ name: "Skill Pioneer" });
      if (badge) {
        const user = await User.findById(req.userId);
        if (!user.earnedBadges.includes(badge._id)) {
          user.earnedBadges.push(badge._id);
          await user.save();
        }
      }
    }

    await progress.save();
    res.status(200).json({ isSuccess: true, progress, message: progress.isCompleted ? "Congratulations! Roadmap completed!" : "Progress updated" });
  } catch (err) {
    res.status(500).json({ isSuccess: false, message: err.message });
  }
};
