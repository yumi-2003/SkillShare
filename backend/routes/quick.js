const { Router } = require("express");
const authMiddleware = require("../middlewares/Auth");
const quickController = require("../controllers/quick");

const router = Router();

// GET /api/quicks/categories/:categoryId
router.get("/quicks/categories/:categoryId", authMiddleware, quickController.getQuicksByCategory);

// POST /api/quicks/:quickId/complete
router.post("/quicks/:quickId/complete", authMiddleware, quickController.completeQuick);

module.exports = router;
