import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import CourseFilter from "../../pages/coursesPage/CourseFilter";
import {
  getCoursesByFilters,
  clearFilters,
} from "../../stores/slices/courseSlice";
import { getAllCategories } from "../../stores/slices/categorySlice";

const AllCourses = () => {
  const dispatch = useDispatch();

  // Redux state
  const {
    filteredList: courses,
    status,
    error,
  } = useSelector((state) => state.course);
  const { categories } = useSelector((state) => state.category);

  // Local state for filters
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState("");
  const [showCourses, setShowCourses] = useState(4);
  const loadMore = 4;

  // Fetch categories on mount
  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  // Apply filters function
  const handleApplyFilters = () => {
    const filterParams = {
      searchKey: search || undefined,
      category: selectedCat || undefined,
    };
    dispatch(getCoursesByFilters(filterParams));
  };

  // Clear filters function
  const handleClear = () => {
    dispatch(clearFilters());
    setSearch("");
    setSelectedCat("");
  };

  // Auto-apply filters when search or category changes
  useEffect(() => {
    handleApplyFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, selectedCat]);

  // Helper to get category name from ID
  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat._id === categoryId);
    return category ? category.name : "Unknown";
  };

  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-12 py-24 sm:py-8">
      {/* Page Title */}
      <h1 className="text-lg sm:text-xl md:text-2xl font-semibold mb-6 text-center sm:text-left text-gray-800 mt-10">
        All Courses
      </h1>

      {/* Course Filter */}
      <CourseFilter
        search={search}
        setSearch={setSearch}
        selectedCat={selectedCat}
        setSelectedCat={setSelectedCat}
        categories={categories}
        onClear={handleClear}
      />

      {/* Results Info */}
      {courses && courses.length > 0 && (
        <div className="mb-4 text-xs sm:text-sm text-gray-600">
          Found <span className="font-semibold">{courses.length}</span> course
          {courses.length !== 1 ? "s." : "."}
        </div>
      )}

      {/* Loading / Error */}
      {status === "loading" && (
        <div className="text-center mt-8">
          <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-xs sm:text-sm text-gray-500">
            Loading courses...
          </p>
        </div>
      )}

      {status === "failed" && (
        <div className="text-center mt-8 text-red-500">
          <p className="text-sm">Error: {error}</p>
          <button
            onClick={handleApplyFilters}
            className="mt-2 px-3 py-1.5 bg-blue-600 text-white text-xs sm:text-sm rounded-md hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Courses Grid */}
      {status === "succeeded" && (
        <>
          {Array.isArray(courses) && courses.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 mt-6">
              {courses.slice(0, showCourses).map((course) => (
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
                      {getCategoryName(course.category._id)}
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
                      <span>⏱ {course.duration} hours</span>
                      <span>📚 {course.totalLessons} lessons</span>
                    </div>

                    {/* Instructor Info */}
                    {course.instructor && (
                      <div className="text-xs sm:text-sm text-gray-500 mb-2">
                        👨‍🏫 {course.instructor.name}
                      </div>
                    )}

                    {/* Details Button */}
                    <Link
                      to={`/courseDetails/${course._id}`}
                      className="block w-full bg-blue-600 text-white text-xs sm:text-sm font-medium rounded-md px-3 py-1.5 hover:bg-blue-700 transition text-center"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              ))}
              {showCourses < courses.length && (
                <div className="col-span-full flex justify-center mt-6">
                  <button
                    className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition flex items-center space-x-2"
                    onClick={() => setShowCourses(showCourses + loadMore)}
                  >
                    <span>Show 4 more Courses</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center mt-8 text-gray-600 h-[80vh]">
              <p className="text-sm font-medium">🚫 No courses found</p>
              <p className="text-xs text-gray-400 mt-1">
                Try adjusting your search criteria or clear the filters.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AllCourses;
