const Course = require("../models/course");
const User = require("../models/user");

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    return res.status(200).json({
      isSuccess: true,
      users,
    });
  } catch (err) {
    return res.status(500).json({
      isSuccess: false,
      message: err.message || "Failed to fetch users",
    });
  }
};

exports.getCourses = async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const perPage = 6;

  try {
    const courses = await Course.find({})
      .sort({ createdAt: -1 })
      .skip((page - 1) * perPage)
      .limit(perPage);

    // Count total courses
    const totalCourses = await Course.countDocuments({});

    return res.status(200).json({
      isSuccess: true,
      courses,
      totalCourses,
      totalPages: Math.ceil(totalCourses / perPage),
      currentPage: page,
    });
  } catch (err) {
    return res.status(500).json({
      isSuccess: false,
      message: err.message || "Failed to fetch courses",
    });
  }
};

exports.getCoursesByFilters = async (req, res) => {
  try {
    const { searchKey, category } = req.query;

    // Build query object
    const query = {};

    // Text search in title and description
    if (searchKey) {
      const matchingInstructors = await User.find(
        { name: { $regex: searchKey, $options: "i" } },
        { _id: 1 }
      );

      query.$or = [
        { title: { $regex: searchKey, $options: "i" } },
        { description: { $regex: searchKey, $options: "i" } },
        { instructor: { $in: matchingInstructors.map((i) => i._id) } },
      ];
    }

    // Category filter
    if (category) {
      query.category = category;
    }

    // Execute query with pagination
    const courses = await Course.find(query)
      .populate("instructor", "name email")
      .populate("category", "category_name");

    return res.status(200).json({
      isSuccess: true,
      courses,
      filters: {
        searchKey: searchKey || null,
        category: category || null,
      },
    });
  } catch (err) {
    console.error("Error in getCoursesByFilters:", err);
    return res.status(500).json({
      isSuccess: false,
      message: err.message || "Failed to fetch courses",
    });
  }
};

exports.getCoursesById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate("instructor", "name email")
      .populate("category", "category_name");

    if (!course) {
      return res.status(404).json({
        isSuccess: false,
        message: "Course not found.",
      });
    }

    return res.status(200).json({
      isSuccess: true,
      course,
    });
  } catch (err) {
    return res.status(500).json({
      isSuccess: false,
      message: err.message || "Failed to fetch course",
    });
  }
};
