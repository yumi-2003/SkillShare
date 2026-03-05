const express = require("express");
const router = express.Router();
const progressController = require("../controllers/courseProgress");
const isAuth = require("../middlewares/Auth");

router.get("/:courseId", isAuth, progressController.getCourseProgress);
router.post("/toggle", isAuth, progressController.toggleLessonCompletion);

module.exports = router;
