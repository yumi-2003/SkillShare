import React from "react";
import CourseCard from "../HomeComponents/CourseCard";
import CourseFilter from "../../pages/coursesPage/CourseFilter";

const AllCourses = () => {
  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-12 py-24 sm:py-8 mt-18">
      {/* Page Title */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-center sm:text-left">
        All Courses
      </h1>

      {/* Course Filter */}
      <div className="mb-6">
        <CourseFilter />
      </div>
      <CourseCard showViewButton={false} />
    </div>
  );
};

export default AllCourses;
