const { v2: cloudinary } = require("cloudinary");

// Accepts a base64 string or data URL and uploads to Cloudinary
const uploadBase64Image = async (imageInput) => {
  try {
    if (!imageInput || typeof imageInput !== "string") {
      return { error: true, message: "No image provided" };
    }

    // If a raw base64 string is provided, wrap as data URL
    const uploadString = imageInput.startsWith("data:")
      ? imageInput
      : `data:image/*;base64,${imageInput}`;

    const result = await cloudinary.uploader.upload(uploadString, {
      folder: "skillshare",
      resource_type: "image",
    });

    if (!result || !result.secure_url) {
      return { error: true, message: "Upload failed" };
    }

    return { error: false, imageUrl: result.secure_url };
  } catch (err) {
    return { error: true, message: err?.message || "Upload error" };
  }
};

module.exports = { uploadBase64Image };
