import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllCourses } from "../../stores/slices/courseSlice";
import { getAllCategories } from "../../stores/slices/categorySlice";

const CourseCard = ({ title = true, showViewButton = true }) => {
  const dispatch = useDispatch();

  // Redux state
  const {
    list: coursesData,
    status,
    error,
  } = useSelector((state) => state.course);
  const courses = coursesData || [];
  const { categories } = useSelector((state) => state.category);

  // Limit courses to 4 only on homepage
  const displayedCourses = showViewButton ? courses.slice(0, 4) : courses;

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

  // Helper to format reviews like 94K
  const formatReviews = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
    }
    return num;
  };

  return (
    <div className="w-full sm:px-3 py-6">
      <div className="max-w-8xl mx-auto">
        {/* Title */}
        {title && (
          <div className="mb-8">
            <h2 className="text-center mb-2 text-lg sm:text-xl font-semibold text-gray-800">
              Featured Courses
            </h2>
            <p className="text-center text-xs sm:text-sm text-gray-500 font-normal">
              Discover our most popular courses designed by industry experts to
              help you build in-demand skills.
            </p>
          </div>
        )}

        {/* Loading / Error */}
        {status === "loading" && (
          <p className="text-center mt-6 text-gray-500 text-sm">
            Loading courses...
          </p>
        )}
        {status === "failed" && (
          <p className="text-center mt-6 text-red-500 text-sm">{error}</p>
        )}

        {/* Courses Grid */}
        {status === "succeeded" &&
          (Array.isArray(courses) && courses.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 mt-6">
              {displayedCourses.map((course) => (
                <div
                  key={course._id}
                  className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col transition duration-300 hover:shadow-lg"
                >
                  {/* Course Image */}
                  <div className="relative">
                    {course.image && (
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-40 sm:h-44 object-cover"
                      />
                    )}
                    <span className="absolute top-2 left-2 bg-green-200 text-green-800 rounded px-2 py-0.5 text-[10px] font-medium">
                      {getCategoryName(course.category)}
                    </span>
                  </div>

                  {/* Course Info */}
                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1">
                      {course.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 mb-3 flex-1">
                      {course.description.length > 40
                        ? `${course.description.substring(0, 35)}...`
                        : course.description}
                    </p>

                    <div className="flex justify-between mb-3 text-[11px] sm:text-xs text-gray-500 font-medium">
                      <span>⏱ {course.duration} hrs</span>
                      <span>📚 {course.totalLessons} lessons</span>
                    </div>

                    {/* Rating Section*/}
                    <div className="flex items-center gap-1 mb-3 text-[12px] sm:text-sm">
                      <span className="text-yellow-500">⭐</span>
                      <span className="font-semibold">
                        {course.averageRating?.toFixed(1) || "0.0"}
                      </span>
                      <span className="text-gray-500">
                        · {formatReviews(course.totalReviews || 0)} reviews
                      </span>
                    </div>

                    {/* Details Button */}
                    <Link
                      to={`/courseDetails/${course._id}`}
                      className="block w-full bg-green-600 nav-link-white text-xs sm:text-sm font-medium rounded-md px-3 py-1.5 hover:bg-green-700 transition text-center"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center mt-8 text-gray-600">
              <p className="text-sm font-medium">🚫 No courses found</p>
              <p className="text-xs text-gray-400 mt-1">
                Please check back later or create a new course.
              </p>
            </div>
          ))}

        {/* View All Courses */}
        {showViewButton && courses.length > 0 && (
          <div className="mt-6 text-center">
            <Link
              to="/allcourses"
              className="text-xs sm:text-sm font-medium rounded-md px-4 py-2 hover:nav-link-white hover:bg-green-700 border border-neutral-300 shadow-md transition"
            >
              View All Courses
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseCard;
