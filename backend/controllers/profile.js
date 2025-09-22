const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const User = require("../models/user");

exports.getProfile = async (req, res) => {
  try {
    if (!req.user) throw new Error("Unauthorized");

    const userDoc = await User.findById(req.user.userId).select("-password");
    if (!userDoc) throw new Error("User not found");

    res.status(200).json({
      message: "Profile retrieved successfully",
      user: userDoc,
    });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

exports.updateProfile = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ message: errors.array()[0].msg });

  const { name, email, currentPassword, newPassword } = req.body;
  const userId = req.user.userId;

  try {
    const userDoc = await User.findById(userId);
    if (!userDoc) throw new Error("User not found");

    // Check if email is being changed and if it already exists
    if (email && email !== userDoc.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) throw new Error("Email already exists");
    }

    // Update basic profile information
    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;

    // Handle password change if provided
    if (newPassword) {
      if (!currentPassword) {
        throw new Error("Current password is required to change password");
      }

      const isCurrentPasswordValid = await bcrypt.compare(
        currentPassword,
        userDoc.password
      );
      if (!isCurrentPasswordValid) {
        throw new Error("Current password is incorrect");
      }

      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      updateData.password = hashedNewPassword;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
    }).select("-password");

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteProfile = async (req, res) => {
  const { password } = req.body;
  const userId = req.user.userId;

  try {
    if (!password) throw new Error("Password is required to delete account");

    const userDoc = await User.findById(userId);
    if (!userDoc) throw new Error("User not found");

    const isPasswordValid = await bcrypt.compare(password, userDoc.password);
    if (!isPasswordValid) {
      throw new Error("Password is incorrect");
    }

    await User.findByIdAndDelete(userId);

    res.status(200).json({
      message: "Account deleted successfully",
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
