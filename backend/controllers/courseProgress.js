const UserCourseProgress = require("../models/userCourseProgress");
const Course = require("../models/course");

// Toggle lesson completion
exports.toggleLessonCompletion = async (req, res) => {
  try {
    const { courseId, lessonId } = req.body;
    const userId = req.userId;

    // Find course to get total lessons count
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ isSuccess: false, message: "Course not found" });
    }

    // Find or create progress record
    let progress = await UserCourseProgress.findOne({ user: userId, course: courseId });
    if (!progress) {
      progress = new UserCourseProgress({
        user: userId,
        course: courseId,
        completedLessons: [],
      });
    }

    // Toggle completion
    const lessonIdStr = lessonId.toString();
    const isCompleted = progress.completedLessons.some(id => id.toString() === lessonIdStr);
    
    if (isCompleted) {
      // Remove lesson
      progress.completedLessons = progress.completedLessons.filter(id => id.toString() !== lessonIdStr);
    } else {
      // Add lesson
      progress.completedLessons.push(lessonId);
    }

    // Calculate percentage
    const totalLessons = course.lessons.length || 1;
    progress.percentage = Math.round((progress.completedLessons.length / totalLessons) * 100);
    progress.isCompleted = progress.percentage === 100;

    await progress.save();

    return res.status(200).json({
      isSuccess: true,
      progress,
    });
  } catch (err) {
    return res.status(422).json({
      isSuccess: false,
      message: err.message,
    });
  }
};

// Get course progress for a user
exports.getCourseProgress = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.userId;

    const progress = await UserCourseProgress.findOne({ user: userId, course: courseId });

    return res.status(200).json({
      isSuccess: true,
      progress: progress || { completedLessons: [], percentage: 0, isCompleted: false },
    });
  } catch (err) {
    return res.status(422).json({
      isSuccess: false,
      message: err.message,
    });
  }
};
