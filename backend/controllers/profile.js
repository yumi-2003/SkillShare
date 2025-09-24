const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const { v2: cloudinary } = require("cloudinary");
const { uploadBase64Image } = require("../utils/upload");
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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

  const { name, email, currentPassword, newPassword, image } = req.body;
  const userId = req.user.userId;

  try {
    const userDoc = await User.findById(userId);
    if (!userDoc) throw new Error("User not found");

    // --- IMAGE HANDLING ---
    let imageUrl = userDoc.image; // keep old by default
    let newImageUploaded = false;

    const fileFromMultipart =
      Array.isArray(req.files) && req.files.length > 0 ? req.files[0] : null;

    if (fileFromMultipart) {
      const uploadResult = await cloudinary.uploader.upload(
        fileFromMultipart.path,
        {
          folder: "skillshare",
          resource_type: "image",
        }
      );
      imageUrl = uploadResult?.secure_url;
      newImageUploaded = true;
    } else if (image) {
      const imageUploadRes = await uploadBase64Image(image);
      if (imageUploadRes.error) {
        return res
          .status(422)
          .json({ isSuccess: false, message: "Image upload failed." });
      }
      imageUrl = imageUploadRes.imageUrl;
      newImageUploaded = true;
    }

    // Check if email is being changed and if it already exists
    if (email && email !== userDoc.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) throw new Error("Email already exists");
    }

    // Update basic profile information
    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (newImageUploaded) updateData.image = imageUrl;

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
    if (userDoc.image && Array.isArray(userDoc.image)) {
      const deletePromises = userDoc.image.map((img) => {
        const publicId = img.substring(
          img.lastIndexOf("/") + 1,
          img.lastIndexOf(".")
        );

        return new Promise((resolve, reject) => {
          cloudinary.uploader.destroy(publicId, (err, result) => {
            if (err) reject(new Error("Destroy failed."));
            else resolve(result);
          });
        });
      });

      await Promise.all(deletePromises);
    }

    await User.findByIdAndDelete(userId);

    res.status(200).json({
      message: "Account deleted successfully",
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
