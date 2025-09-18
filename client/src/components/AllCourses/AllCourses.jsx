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
    console.log(category);
    return category ? category.name : "Unknown";
  };

  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-12 py-24 sm:py-8 mt-18">
      {/* Page Title */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-center sm:text-left">
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
        <div className="mb-4 text-sm text-gray-600">
          Found <span className="font-bold text-lg">{courses.length}</span>{" "}
          course{courses.length !== 1 ? "s." : "."}
        </div>
      )}

      {/* Loading / Error */}
      {status === "loading" && (
        <div className="text-center mt-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-500">Loading courses...</p>
        </div>
      )}

      {status === "failed" && (
        <div className="text-center mt-8 text-red-500">
          <p>Error: {error}</p>
          <button
            onClick={handleApplyFilters}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
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
              {courses.map((course) => (
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
                      {getCategoryName(course.category._id)}
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

                    {/* Instructor Info */}
                    {course.instructor && (
                      <div className="text-sm text-gray-500 mb-2">
                        👨‍🏫 {course.instructor.name}
                      </div>
                    )}

                    {/* Details Button */}
                    <Link
                      to={`/courseDetails/${course._id}`}
                      className="block w-full bg-blue-600 text-white text-base sm:text-lg rounded-lg px-4 py-2 hover:bg-blue-700 transition text-center"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center mt-8 text-gray-600">
              <p className="text-lg font-semibold">🚫 No courses found</p>
              <p className="text-sm text-gray-400 mt-2">
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
