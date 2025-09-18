const Enrollment = require("../models/enrollment");
const Course = require("../models/course");

// Enroll current user in a course
exports.enrollInCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { userId } = req.body;

    // Populate instructor to ensure _id
    const courseDoc = await Course.findById(courseId).populate(
      "instructor",
      "_id"
    );
    if (!courseDoc) {
      return res
        .status(404)
        .json({ isSuccess: false, message: "Course not found." });
    }

    // Check if the user is the instructor
    if (courseDoc.instructor?._id?.toString() === userId) {
      return res.status(409).json({
        isSuccess: false,
        message: "Instructors cannot enroll in their own course.",
      });
    }

    // Check if the user is already enrolled
    const existing = await Enrollment.findOne({
      course: courseId,
      student: userId,
    });
    if (existing) {
      return res.status(409).json({
        isSuccess: false,
        message: "Already enrolled in this course.",
      });
    }

    // Create new enrollment
    const enrollmentDoc = await Enrollment.create({
      course: courseId,
      student: userId,
    });

    return res.status(201).json({
      isSuccess: true,
      message: "Enrolled successfully.",
      enrollment: enrollmentDoc,
    });
  } catch (err) {
    return res.status(422).json({ isSuccess: false, message: err.message });
  }
};

// Get all enrollments of current user
exports.getMyEnrollments = async (req, res) => {
  const { userId } = req.body;

  try {
    const enrollments = await Enrollment.find({ student: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "course",
        select: "title description images instructor category createdAt",
        populate: [
          { path: "instructor", select: "name email" },
          { path: "category", select: "category_name" },
        ],
      });

    return res.status(200).json({ isSuccess: true, enrollments });
  } catch (err) {
    return res.status(422).json({ isSuccess: false, message: err.message });
  }
};

// Check if current user is enrolled in a course
exports.getEnrollmentStatus = async (req, res) => {
  const { userId } = req.body;
  try {
    const { courseId } = req.params;
    const existing = await Enrollment.findOne({
      course: courseId,
      student: userId,
    }).select("_id");
    return res.status(200).json({ isSuccess: true, enrolled: !!existing });
  } catch (err) {
    return res.status(422).json({ isSuccess: false, message: err.message });
  }
};

// For instructors: list students enrolled in a course they own
exports.getCourseEnrollees = async (req, res) => {
  const { userId } = req.body;
  try {
    const { courseId } = req.params;

    const courseDoc = await Course.findById(courseId).select("instructor");
    if (!courseDoc) {
      return res
        .status(404)
        .json({ isSuccess: false, message: "Course not found." });
    }

    console.log(userId, courseDoc.instructor?._id?.toString());

    if (userId !== courseDoc.instructor?._id?.toString()) {
      return res
        .status(403)
        .json({ isSuccess: false, message: "Authorization Failed." });
    }

    const enrollees = await Enrollment.find({ course: courseId })
      .sort({ createdAt: -1 })
      .populate({ path: "student", select: "name email" });

    return res.status(200).json({ isSuccess: true, enrollees });
  } catch (err) {
    return res.status(422).json({ isSuccess: false, message: err.message });
  }
};
