import React from "react";
import { useState } from "react";
import CourseCard from "../HomeComponents/CourseCard";
import CourseFilter from "../../pages/CoursesPage/CourseFilter";

const AllCourses = () => {
  return (
    <div className="w-full mx-auto px-6 py-24">
      {/* header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
          📖 All Courses
        </h1>
        <p className="text-gray-600 mt-2">
          Explore our comprehensive collection of courses designed to help you
          master new skills and advance your career.
        </p>
      </div>
      <CourseFilter />
      <CourseCard />
    </div>
  );
};

export default AllCourses;
