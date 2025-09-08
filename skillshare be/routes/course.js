const { Router } = require("express");
const { body } = require("express-validator");
const router = Router();

const courseController = require("../controllers/course");
const enrollmentController = require("../controllers/enrollment");
const categoryController = require("../controllers/category");
const authMiddleware = require("../middlewares/Auth");

// add course
// POST /create-course
router.post(
  "/create-course",
  authMiddleware,
  [
    body("title").trim().notEmpty().withMessage("Course title is required."),
    body("description")
      .trim()
      .notEmpty()
      .withMessage("Course description is required."),
    body("totalLessons")
      .optional()
      .isNumeric()
      .withMessage("Total lessons must be a number."),
    body("duration")
      .optional()
      .isString()
      .withMessage("Duration must be a string."),
    body("category").notEmpty().withMessage("Category is required."),
  ],
  courseController.addNewCourse
);

// get all courses
// GET /courses
router.get("/courses", authMiddleware, courseController.getAllCourses);

// get single course
// GET /courses/:id
router.get("/courses/:id", authMiddleware, courseController.getCourseById);

// update course
// PUT /update-course/:id
router.put(
  "/update-course/:id",
  authMiddleware,
  [
    body("title").trim().notEmpty().withMessage("Course title is required."),
    body("description")
      .trim()
      .notEmpty()
      .withMessage("Course description is required."),
    body("totalLessons")
      .optional()
      .isNumeric()
      .withMessage("Total lessons must be a number."),
    body("duration")
      .optional()
      .isString()
      .withMessage("Duration must be a string."),
    body("category").notEmpty().withMessage("Category is required."),
  ],
  courseController.updateCourse
);

// delete course
// DELETE /courses/:id
router.delete("/courses/:id", authMiddleware, courseController.deleteCourse);

// upload course image
// POST /upload-course-image/:id
router.post(
  "/upload-course-image/:id",
  authMiddleware,
  courseController.uploadCourseImage
);

// get course images
// GET /course-images/:id
router.get(
  "/course-images/:id",
  authMiddleware,
  courseController.getCourseImages
);

// delete course image
// DELETE /courses/images/:courseId/:imgToDelete
router.delete(
  "/courses/images/:courseId/:imgToDelete",
  authMiddleware,
  courseController.deleteCourseImage
);

// categories
// POST /categories
router.post(
  "/categories",
  authMiddleware,
  [
    body("name").trim().notEmpty().withMessage("Category name is required."),
    body("description")
      .trim()
      .notEmpty()
      .withMessage("Category description is required."),
  ],
  categoryController.addCategory
);

// GET /categories
router.get("/categories", authMiddleware, categoryController.getCategories);

// GET /categories/:id
router.get("/categories/:id", authMiddleware, categoryController.getCategoryById);

// PUT /categories/:id
router.put(
  "/categories/:id",
  authMiddleware,
  [
    body("name").trim().notEmpty().withMessage("Category name is required."),
    body("description")
      .trim()
      .notEmpty()
      .withMessage("Category description is required."),
  ],
  categoryController.updateCategory
);

// DELETE /categories/:id
router.delete("/categories/:id", authMiddleware, categoryController.deleteCategory);

// enrollments
// POST /courses/:courseId/enroll
router.post(
  "/courses/:courseId/enroll",
  authMiddleware,
  enrollmentController.enrollInCourse
);

// GET /my-enrollments
router.get(
  "/my-enrollments",
  authMiddleware,
  enrollmentController.getMyEnrollments
);

// GET /courses/:courseId/enrollment-status
router.get(
  "/courses/:courseId/enrollment-status",
  authMiddleware,
  enrollmentController.getEnrollmentStatus
);

// GET /courses/:courseId/enrollees (instructor only)
router.get(
  "/courses/:courseId/enrollees",
  authMiddleware,
  enrollmentController.getCourseEnrollees
);

module.exports = router;
