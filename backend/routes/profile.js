const { Router } = require("express");
const { body } = require("express-validator");
const router = Router();

const profileController = require("../controllers/profile");
const authMiddleware = require("../middlewares/Auth");

// get route = api/profile
router.get("/profile", authMiddleware, profileController.getProfile);

// put route = api/profile
router.put(
  "/profile",
  authMiddleware,
  [
    body("name")
      .optional()
      .trim()
      .isLength({ min: 3 })
      .withMessage("Name should have at least 3 characters."),
    body("email")
      .optional()
      .trim()
      .isEmail()
      .withMessage("Please enter a valid Email"),
    body("currentPassword")
      .optional()
      .notEmpty()
      .withMessage("Current password cannot be empty."),
    body("newPassword")
      .optional()
      .isLength({ min: 5 })
      .withMessage("New password should have at least 5 characters."),
  ],
  profileController.updateProfile
);

// delete route = api/profile
router.delete(
  "/profile",
  authMiddleware,
  [
    body("password")
      .notEmpty()
      .withMessage("Password is required to delete account."),
  ],
  profileController.deleteProfile
);

module.exports = router;
