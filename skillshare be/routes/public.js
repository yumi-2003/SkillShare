const { Router } = require("express");
const publicController = require("../controllers/public");

const router = Router();

// get all courses
// GET /api/courses
router.get("/courses", publicController.getCourses);

//get products by filters
// GET /api/products/filters
router.get("/courses/filters", publicController.getCoursesByFilters);

// get product by id
// GET /api/products/:id
router.get("/courses/:id", publicController.getCoursesById);

module.exports = router;
