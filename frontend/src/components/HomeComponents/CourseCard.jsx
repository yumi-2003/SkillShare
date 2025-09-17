import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Edit, Trash } from "lucide-react";
import { getAllCourses, deleteCourse } from "../../stores/slices/courseSlice";
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
  const user = useSelector((state) => state.user.user);

  // Fetch courses and categories on mount
  useEffect(() => {
    dispatch(getAllCourses());
    dispatch(getAllCategories());
  }, [dispatch]);
  console.log(courses);

  // Helper to get category name from ID
  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat._id === categoryId);
    return category ? category.name : "Unknown";
  };

  //delete course
  const handleDelete = (id) => {
    dispatch(deleteCourse(id));
  };

  return (
    <div className="bg-gray-100 px-6 py-24">
      {/* Title */}
      {title && (
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h2 className="text-center mb-7 text-3xl font-semibold">
            Featured Courses
          </h2>
          <p className="text-center mt-2 text-gray-500">
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
        Array.isArray(courses) &&
        courses.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-3 mt-3">
            {courses.map((course) => (
              <div
                key={course._id}
                className="bg-white rounded-lg shadow-lg hover:shadow-2xl overflow-hidden transition duration-300"
              >
                {/* Course Image */}
                <div className="relative">
                  {course.image && (
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <span className="absolute top-3 left-3 bg-green-200 text-green-800 rounded px-2 py-1 text-xs font-semibold">
                    {getCategoryName(course.category)}
                  </span>
                </div>

                {/* Course Info */}
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {course.title}
                  </h3>
                  <p className="text-gray-500 mb-2 text-sm">
                    {course.description.length > 50
                      ? `${course.description.substring(0, 45)}...`
                      : course.description}
                  </p>

                  <div className="flex justify-between mb-4 text-sm text-gray-400">
                    <span>⏱ {course.duration} weeks</span>
                    {/* <span>👥 {course.students}</span> */}
                    <span>📚 {course.totalLessons} lessons</span>
                  </div>

                  {/* Actions */}
                  {user?.userType === "instructor" ? (
                    <div className="flex gap-2 mt-2">
                      <Link
                        to="#"
                        className="flex items-center justify-center gap-2 w-full bg-yellow-400 text-black px-3 py-2 rounded hover:bg-yellow-500 transition-colors"
                      >
                        <Edit size={20} /> Edit
                      </Link>
                      {user._id === course.instructor && (
                        <button
                          className="flex items-center justify-center gap-2 w-1/4 bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 transition-colors"
                          onClick={() => handleDelete(course._id)}
                        >
                          <Trash size={18} />
                        </button>
                      )}
                    </div>
                  ) : (
                    <button className="w-full bg-blue-600 text-white text-lg rounded-lg px-4 py-2 hover:bg-blue-700 transition">
                      Enroll Now
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

      {/* View All Courses */}
      {showViewButton && courses.length > 0 && (
        <div className="mt-8 text-center">
          <Link
            to="/allcourses"
            className="text-lg rounded-lg px-6 py-3 hover:text-white hover:bg-blue-700 border border-neutral-300 shadow-lg transition"
          >
            View All Courses
          </Link>
        </div>
      )}
    </div>
  );
};

export default CourseCard;
