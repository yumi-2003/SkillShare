const { validationResult } = require("express-validator");
const Course = require("../models/course");
const { v2: cloudinary } = require("cloudinary");
const { uploadBase64Image } = require("../utils/upload");
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// add new course
exports.addNewCourse = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res
      .status(402)
      .json({ isSuccess: false, message: errors.array()[0].msg });
  }

  const {
    title,
    description,
    totalLessons,
    duration,
    category,
    userId,
    image,
  } = req.body;

  try {
    let imageUrl = undefined;
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
    } else if (image) {
      const imageUploadRes = await uploadBase64Image(image);
      if (imageUploadRes.error) {
        return res
          .status(422)
          .json({ isSuccess: false, message: "Image upload failed." });
      }
      imageUrl = imageUploadRes.imageUrl;
    }
    const courseDoc = await Course.create({
      title,
      description,
      totalLessons,
      duration,
      category,
      image: imageUrl,
      instructor: userId,
    });

    return res.status(201).json({
      isSuccess: true,
      message: "Course successfully created.",
      courseDoc,
    });
  } catch (err) {
    return res.status(422).json({
      isSuccess: false,
      message: err.message,
    });
  }
};

// get all courses of instructor
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({ instructor: req.userId }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      isSuccess: true,
      courses,
    });
  } catch (err) {
    return res.status(422).json({
      isSuccess: false,
      message: err.message,
    });
  }
};

// get single course
exports.getCourseById = async (req, res) => {
  try {
    const courseDoc = await Course.findById(req.params.id).populate(
      "category instructor",
      "name email"
    );

    if (!courseDoc) {
      return res.status(404).json({
        isSuccess: false,
        message: "Course not found.",
      });
    }

    return res.status(200).json({
      isSuccess: true,
      courseDoc,
    });
  } catch (err) {
    return res.status(422).json({
      isSuccess: false,
      message: err.message,
    });
  }
};

// update course
exports.updateCourse = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res
      .status(402)
      .json({ isSuccess: false, message: errors.array()[0].msg });
  }

  try {
    const { title, description, totalLessons, duration, category } = req.body;
    const { id } = req.params;

    const courseDoc = await Course.findById(id);

    if (!courseDoc) {
      return res.status(404).json({
        isSuccess: false,
        message: "Course not found.",
      });
    }

    if (req.userId.toString() !== courseDoc.instructor.toString()) {
      throw new Error("Authorization Failed.");
    }

    courseDoc.title = title;
    courseDoc.description = description;
    courseDoc.totalLessons = totalLessons;
    courseDoc.duration = duration;
    courseDoc.category = category;

    await courseDoc.save();

    return res.status(200).json({
      isSuccess: true,
      message: "Course updated successfully.",
      courseDoc,
    });
  } catch (err) {
    return res.status(422).json({
      isSuccess: false,
      message: err.message,
    });
  }
};

// delete course
exports.deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const courseDoc = await Course.findById(id);
    console.log("COURSE INSTRUCTOR:", courseDoc?.instructor);

    if (!courseDoc) {
      return res.status(404).json({
        isSuccess: false,
        message: "Course does not exist.",
      });
    }

    if (req.userId.toString() !== courseDoc.instructor.toString()) {
      throw new Error("Authorization Failed.");
    }

    if (courseDoc.image && Array.isArray(courseDoc.image)) {
      const deletePromises = courseDoc.image.map((img) => {
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

    await Course.findByIdAndDelete(id);

    return res.status(202).json({
      isSuccess: true,
      message: "Course deleted successfully.",
      courseDoc,
    });
  } catch (err) {
    return res.status(422).json({
      isSuccess: false,
      message: err.message,
    });
  }
};

// upload course images
exports.uploadCourseImage = async (req, res) => {
  const courseImages = req.files;
  const { id } = req.params;

  try {
    const courseDoc = await Course.findById(id);

    if (!courseDoc) {
      throw new Error("Course not found.");
    }

    if (req.userId.toString() !== courseDoc.instructor.toString()) {
      throw new Error("Authorization Failed.");
    }

    let secureUrlArray = [];

    courseImages.forEach((img) => {
      cloudinary.uploader.upload(img.path, async (err, result) => {
        if (!err) {
          secureUrlArray.push(result.secure_url);

          if (secureUrlArray.length === courseImages.length) {
            await Course.findByIdAndUpdate(id, {
              $push: { images: { $each: secureUrlArray } },
            });

            return res.status(200).json({
              isSuccess: true,
              message: "Course images saved.",
              images: secureUrlArray,
            });
          }
        } else {
          throw new Error("Cloud upload failed.");
        }
      });
    });
  } catch (err) {
    return res.status(404).json({
      isSuccess: false,
      message: err.message,
    });
  }
};

// get course images
exports.getCourseImages = async (req, res) => {
  try {
    const { id } = req.params;
    const courseDoc = await Course.findById(id).select("images instructor");

    if (!courseDoc) {
      throw new Error("Course not found.");
    }

    if (req.userId.toString() !== courseDoc.instructor.toString()) {
      throw new Error("Authorization Failed.");
    }

    return res.status(200).json({
      isSuccess: true,
      message: "Course images fetched.",
      images: courseDoc.images,
    });
  } catch (err) {
    return res.status(404).json({
      isSuccess: false,
      message: err.message,
    });
  }
};

// delete single course image
exports.deleteCourseImage = async (req, res) => {
  try {
    const { courseId, imgToDelete } = req.params;
    const decodedImg = decodeURIComponent(imgToDelete);

    const courseDoc = await Course.findById(courseId);

    if (!courseDoc) {
      throw new Error("Course not found.");
    }

    if (req.userId.toString() !== courseDoc.instructor.toString()) {
      throw new Error("Authorization Failed.");
    }

    await Course.findByIdAndUpdate(courseId, {
      $pull: { images: decodedImg },
    });

    const publicId = decodedImg.substring(
      decodedImg.lastIndexOf("/") + 1,
      decodedImg.lastIndexOf(".")
    );

    await cloudinary.uploader.destroy(publicId);

    return res.status(200).json({
      isSuccess: true,
      message: "Image deleted successfully.",
    });
  } catch (err) {
    return res.status(404).json({
      isSuccess: false,
      message: err.message,
    });
  }
};
