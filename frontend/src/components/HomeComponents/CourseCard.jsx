import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllCourses } from "../../stores/slices/courseSlice";
import { getAllCategories } from "../../stores/slices/categorySlice";

const CourseCard = ({ title = true, showViewButton = true }) => {
  const dispatch = useDispatch();
  // const location = useLocation();

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

  return (
    <div className="w-full bg-gray-100 sm:px-3 lg:px-6 py-24">
      <div className="max-w-8xl mx-auto">
        {/* Title */}
        {title && (
          <div className="mb-12">
            <h2 className="text-center mb-4 text-2xl sm:text-3xl md:text-4xl font-semibold">
              Featured Courses
            </h2>
            <p className="text-center mt-2 text-gray-500 text-sm sm:text-base md:text-lg">
              Discover our most popular courses designed by industry experts to
              help you build in-demand skills.
            </p>
          </div>
        )}

        {/* Loading / Error */}
        {status === "loading" && (
          <p className="text-center mt-8 text-gray-500">Loading courses...</p>
        )}
        {status === "failed" && (
          <p className="text-center mt-8 text-red-500">{error}</p>
        )}

        {/* Courses Grid */}
        {status === "succeeded" &&
          (Array.isArray(courses) && courses.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 mt-6">
              {displayedCourses.map((course) => (
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
                      <span>⏱ {course.duration} weeks</span>
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
              ))}
            </div>
          ) : (
            <div className="text-center mt-8 text-gray-600">
              <p className="text-lg font-semibold">🚫 No courses found</p>
              <p className="text-sm text-gray-400 mt-2">
                Please check back later or create a new course.
              </p>
            </div>
          ))}

        {/* View All Courses */}
        {showViewButton && courses.length > 0 && (
          <div className="mt-8 text-center">
            <Link
              to="/allcourses"
              className="text-base sm:text-lg md:text-xl rounded-lg px-4 sm:px-6 py-2 sm:py-3 hover:text-white hover:bg-blue-700 border border-neutral-300 shadow-lg transition"
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
