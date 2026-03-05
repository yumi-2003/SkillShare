const { Router } = require("express");
const { body } = require("express-validator");
const router = Router();

const skillPathController = require("../controllers/skillPath");
const authMiddleware = require("../middlewares/Auth");
const jwt = require("jsonwebtoken");

// instructor only
const instructorMiddleware = (req, res, next) => {
  if (req.userType !== "instructor" && req.userType !== "admin") {
    return res.status(403).json({ isSuccess: false, message: "Only instructors can perform this action." });
  }
  next();
};

// POST /auth/skill-paths
router.post(
  "/auth/skill-paths",
  authMiddleware,
  instructorMiddleware,
  [
    body("title").trim().notEmpty().withMessage("Title is required."),
    body("description").trim().notEmpty().withMessage("Description is required."),
  ],
  skillPathController.createSkillPath
);

// GET /api/skill-paths
router.get("/api/skill-paths", skillPathController.getSkillPaths);

// GET /api/skill-paths/:id
router.get("/api/skill-paths/:id", (req, res, next) => {
    // Optional auth: if token provided, use it to get progress
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        if (token) {
            try {
                const decoded = jwt.verify(token, process.env.JWT_KEY);
                req.userId = decoded.userId;
                req.userType = decoded.userType;
            } catch (err) {
                // Ignore invalid token for public route
            }
        }
    }
    next();
}, skillPathController.getSkillPathById);

// router.get("/auth/skill-paths/:id", authMiddleware, skillPathController.getSkillPathById);

// PUT /auth/skill-paths/:id
router.put(
  "/auth/skill-paths/:id",
  authMiddleware,
  instructorMiddleware,
  skillPathController.updateSkillPath
);

// DELETE /auth/skill-paths/:id
router.delete(
  "/auth/skill-paths/:id",
  authMiddleware,
  instructorMiddleware,
  skillPathController.deleteSkillPath
);

// POST /auth/update-skill-progress
router.post(
  "/auth/update-skill-progress",
  authMiddleware,
  skillPathController.updateUserProgress
);

module.exports = router;
