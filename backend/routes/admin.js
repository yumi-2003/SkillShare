const { Router } = require("express");
const { body } = require("express-validator");

const authMiddleware = require("../middlewares/Auth");
const isAdmin = require("../middlewares/isAdmin");
const categoryController = require("../controllers/category");
const quickController = require("../controllers/quick");
const badgeController = require("../controllers/badge");

const router = Router();

// need to write instructor product routes
router.post("/users", authMiddleware, isAdmin, []);

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

// Quicks management (admin)
router.post(
  "/quicks",
  authMiddleware,
  isAdmin,
  [
    body("title").trim().notEmpty().withMessage("Title is required."),
    body("description").trim().notEmpty().withMessage("Description is required."),
    body("category").notEmpty().withMessage("Category is required."),
  ],
  quickController.addQuick
);
router.get("/quicks", authMiddleware, isAdmin, quickController.getAllQuicks);
router.put("/quicks/:id", authMiddleware, isAdmin, quickController.updateQuick);
router.delete("/quicks/:id", authMiddleware, isAdmin, quickController.deleteQuick);

// Badges management (admin)
router.post(
  "/badges",
  authMiddleware,
  isAdmin,
  [
    body("name").trim().notEmpty().withMessage("Name is required."),
    body("category").notEmpty().withMessage("Category is required."),
    body("criteria").isNumeric().withMessage("Criteria must be a number."),
  ],
  badgeController.addBadge
);
router.get("/badges", authMiddleware, isAdmin, badgeController.getAllBadges);
router.put("/badges/:id", authMiddleware, isAdmin, badgeController.updateBadge);
router.delete("/badges/:id", authMiddleware, isAdmin, badgeController.deleteBadge);

module.exports = router;
