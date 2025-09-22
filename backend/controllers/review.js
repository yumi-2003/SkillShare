const { validationResult } = require("express-validator");
const Review = require("../models/review");
const Course = require("../models/course");
const Enrollment = require("../models/enrollment");
const { updateCourseRating } = require("./course");

exports.createReview = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      isSuccess: false,
      message: errors.array()[0].msg,
    });
  }

  const { courseId, rating, comment } = req.body;
  const studentId = req.user.userId;

  try {
    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        isSuccess: false,
        message: "Course not found",
      });
    }

    // Check if student is enrolled in the course
    const enrollment = await Enrollment.findOne({
      course: courseId,
      student: studentId,
    });

    if (!enrollment) {
      return res.status(403).json({
        isSuccess: false,
        message: "You must be enrolled in this course to leave a review",
      });
    }

    // Create new review
    const review = await Review.create({
      course: courseId,
      student: studentId,
      rating,
      comment,
      isEnrolled: true, // Auto-set since mingyin let both instructor and students is enrolled
    });

    // Update course rating
    await updateCourseRating(courseId);

    // Populate the review with user details
    const populatedReview = await Review.findById(review._id)
      .populate("student", "name email")
      .populate("course", "title");

    res.status(201).json({
      isSuccess: true,
      message: "Review created successfully",
      review: populatedReview,
    });
  } catch (err) {
    res.status(500).json({
      isSuccess: false,
      message: err.message,
    });
  }
};

// get all reviews
exports.getCourseReviews = async (req, res) => {
  try {
    const { courseId } = req.params;

    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        isSuccess: false,
        message: "Course not found",
      });
    }

    const reviews = await Review.find({ course: courseId })
      .populate("student", "name email")
      .sort({ createdAt: -1 });

    // Calculate average rating
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = reviews.length > 0 ? totalRating / reviews.length : 0;

    res.status(200).json({
      isSuccess: true,
      reviews,
      averageRating: Math.round(averageRating * 10) / 10,
      totalReviews: reviews.length,
    });
  } catch (err) {
    res.status(500).json({
      isSuccess: false,
      message: err.message,
    });
  }
};

// get user review for specific course
exports.getUserReviewsForCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const studentId = req.user.userId;

    const reviews = await Review.find({
      course: courseId,
      student: studentId,
    })
      .populate("student", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      isSuccess: true,
      reviews,
      totalReviews: reviews.length,
    });
  } catch (err) {
    res.status(500).json({
      isSuccess: false,
      message: err.message,
    });
  }
};

exports.updateReview = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      isSuccess: false,
      message: errors.array()[0].msg,
    });
  }

  const { reviewId } = req.params;
  const { rating, comment } = req.body;
  const studentId = req.user.userId;

  try {
    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({
        isSuccess: false,
        message: "Review not found",
      });
    }

    // Check if the review belongs to the current user
    if (review.student.toString() !== studentId) {
      return res.status(403).json({
        isSuccess: false,
        message: "You can only update your own reviews",
      });
    }

    // Update review
    review.rating = rating;
    review.comment = comment;
    await review.save();

    // Update course rating
    await updateCourseRating(review.course);

    const updatedReview = await Review.findById(reviewId)
      .populate("student", "name email")
      .populate("course", "title");

    res.status(200).json({
      isSuccess: true,
      message: "Review updated successfully",
      review: updatedReview,
    });
  } catch (err) {
    res.status(500).json({
      isSuccess: false,
      message: err.message,
    });
  }
};

// get all reviews of user
exports.getUserReviews = async (req, res) => {
  try {
    const studentId = req.user.userId;

    const reviews = await Review.find({ student: studentId })
      .populate("course", "title description image instructor")
      .populate("course.instructor", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      isSuccess: true,
      reviews,
    });
  } catch (err) {
    res.status(500).json({
      isSuccess: false,
      message: err.message,
    });
  }
};

exports.getReviewById = async (req, res) => {
  try {
    const { reviewId } = req.params;

    const review = await Review.findById(reviewId)
      .populate("student", "name email")
      .populate("course", "title description image instructor")
      .populate("course.instructor", "name email");

    if (!review) {
      return res.status(404).json({
        isSuccess: false,
        message: "Review not found",
      });
    }

    res.status(200).json({
      isSuccess: true,
      review,
    });
  } catch (err) {
    res.status(500).json({
      isSuccess: false,
      message: err.message,
    });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const studentId = req.user.userId;

    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({
        isSuccess: false,
        message: "Review not found",
      });
    }

    // Check if the review belongs to the current user
    if (review.student.toString() !== studentId) {
      return res.status(403).json({
        isSuccess: false,
        message: "You can only delete your own reviews",
      });
    }

    const courseId = review.course;
    await Review.findByIdAndDelete(reviewId);

    // Update course rating
    await updateCourseRating(courseId);

    res.status(200).json({
      isSuccess: true,
      message: "Review deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      isSuccess: false,
      message: err.message,
    });
  }
};
