const { Router } = require("express");
const { body } = require("express-validator");
const router = Router();

const reviewController = require("../controllers/review");
const authMiddleware = require("../middlewares/Auth");

// create review = /api/reviews
router.post(
  "/reviews",
  authMiddleware,
  [
    body("courseId")
      .notEmpty()
      .withMessage("Course ID is required")
      .isMongoId()
      .withMessage("Invalid course ID"),
    body("rating")
      .isInt({ min: 1, max: 5 })
      .withMessage("Rating must be between 1 and 5"),
    body("comment")
      .trim()
      .notEmpty()
      .withMessage("Comment is required")
      .isLength({ min: 10, max: 1000 })
      .withMessage("Comment must be between 10 and 1000 characters"),
  ],
  reviewController.createReview
);

// get all review for course =  /api/reviews/course/:courseId
router.get("/reviews/course/:courseId", reviewController.getCourseReviews);

// get user's reviews in a course = /api/reviews/course/:courseId/user
router.get(
  "/reviews/course/:courseId/user",
  authMiddleware,
  reviewController.getUserReviewsForCourse
);

// get all review of the user =  /api/reviews/user
router.get("/reviews/user", authMiddleware, reviewController.getUserReviews);

// get review by ID = /api/reviews/:reviewId
router.get("/reviews/:reviewId", reviewController.getReviewById);

// update (put) = /api/reviews/:reviewId
router.put(
  "/reviews/:reviewId",
  authMiddleware,
  [
    body("rating")
      .optional()
      .isInt({ min: 1, max: 5 })
      .withMessage("Rating must be between 1 and 5"),
    body("comment")
      .optional()
      .trim()
      .isLength({ min: 10, max: 1000 })
      .withMessage("Comment must be between 10 and 1000 characters"),
  ],
  reviewController.updateReview
);

// delete review = /api/reviews/:reviewId
router.delete(
  "/reviews/:reviewId",
  authMiddleware,
  reviewController.deleteReview
);

module.exports = router;
