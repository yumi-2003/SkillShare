const { Router } = require("express");
const publicController = require("../controllers/public");
const categoryController = require("../controllers/category");

const router = Router();

// get all users
// GET /api/users
router.get("/users", publicController.getUsers);

// get all courses
// GET /api/courses
router.get("/courses", publicController.getCourses);

//get products by filters
// GET /api/products/filters
router.get("/courses/filters", publicController.getCoursesByFilters);

// get product by id
// GET /api/products/:id
router.get("/courses/:id", publicController.getCoursesById);

// GET /api/categories
router.get("/categories", categoryController.getCategories);

module.exports = router;
