const { Router } = require("express");
const { body } = require("express-validator");

const authMiddleware = require("../middlewares/Auth");
const isAdmin = require("../middlewares/isAdmin");
const categoryController = require("../controllers/category");

const router = Router();

// need to write instructor product routes

// category management (admin)
// POST /admin/categories
router.post(
  "/categories",
  authMiddleware,
  isAdmin,
  [
    body("name").trim().notEmpty().withMessage("Category name is required."),
    body("description")
      .trim()
      .notEmpty()
      .withMessage("Category description is required."),
  ],
  categoryController.addCategory
);

// GET /admin/categories
router.get(
  "/categories",
  authMiddleware,
  isAdmin,
  categoryController.getCategories
);

// GET /admin/categories/:id
router.get(
  "/categories/:id",
  authMiddleware,
  isAdmin,
  categoryController.getCategoryById
);

// PUT /admin/categories/:id
router.put(
  "/categories/:id",
  authMiddleware,
  isAdmin,
  [
    body("name").trim().notEmpty().withMessage("Category name is required."),
    body("description")
      .trim()
      .notEmpty()
      .withMessage("Category description is required."),
  ],
  categoryController.updateCategory
);

// DELETE /admin/categories/:id
router.delete(
  "/categories/:id",
  authMiddleware,
  isAdmin,
  categoryController.deleteCategory
);

module.exports = router;
