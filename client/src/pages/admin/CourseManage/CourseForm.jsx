import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "../../../stores/slices/categorySlice";
import { getAllCourses } from "../../../stores/slices/courseSlice";
import CategoryForm from "../CourseManage/CategoryForm";

const CourseForm = () => {
  const dispatch = useDispatch();

  // Redux state
  const { list: coursesData } = useSelector((state) => state.course);
  const courses = coursesData || [];
  const { categories } = useSelector((state) => state.category);
  const user = useSelector((state) => state.user.user);

  // Fetch courses and categories on mount
  useEffect(() => {
    dispatch(getAllCourses());
    dispatch(getAllCategories());
  }, [dispatch]);

  // Helper to get category name from ID
  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat._id === categoryId);
    return category ? category.name : "Unknown";
  };

  // Filter courses by logged-in instructor
  const displayedCourses = user
    ? courses.filter((course) => course.instructor === user._id)
    : [];

  console.log("Displayed courses:", displayedCourses);

  return (
    <section className="bg-white rounded shadow sm:px-6 py-6 sm:py-8">
      {/* Category Filter Form and Create Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <CategoryForm />
        <ToastContainer position="top-right" />
        <Link
          to="/createcoursepage"
          className="bg-blue-500 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-md text-sm sm:text-base hover:bg-blue-600 transition"
        >
          + Create Course
        </Link>
      </div>

      {/* Courses List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 mt-6">
        {Array.isArray(displayedCourses) && displayedCourses.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">
            No courses found.
          </p>
        ) : (
          displayedCourses.map((course) => (
            <div
              key={course._id}
              className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col transition duration-300 hover:shadow-2xl"
            >
              {/* Course Image */}
              <div className="relative">
                {course.image && (
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-48 sm:h-56 md:h-48 lg:h-52 object-cover"
                  />
                )}
                <span className="absolute top-3 left-3 bg-green-200 text-green-800 rounded px-2 py-1 text-xs font-semibold">
                  {getCategoryName(course.category)}
                </span>
              </div>

              {/* Course Info */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
                  {course.title}
                </h3>
                <p className="text-gray-500 mb-4 text-sm sm:text-base flex-1">
                  {course.description.length > 40
                    ? `${course.description.substring(0, 35)}...`
                    : course.description}
                </p>

                <div className="flex justify-between mb-4 text-sm sm:text-base text-gray-400">
                  <span>⏱ {course.duration} hours</span>
                  <span>📚 {course.totalLessons} lessons</span>
                </div>

                {/* Details Button */}
                <Link
                  to={`/courseDetails/${course._id}`}
                  className="block w-full bg-blue-600 text-white text-base sm:text-lg rounded-lg px-4 py-2 hover:bg-blue-700 transition text-center"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default CourseForm;
