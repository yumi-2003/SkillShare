import React from "react";
import CategoryForm from "./CategoryForm";
import { Link } from "react-router-dom";
import CourseCard from "../../../components/HomeComponents/CourseCard";

const CourseForm = () => {
  return (
    <section className="bg-gray-100 px-4 sm:px-6 lg:px-12 py-6 sm:py-8">
      {/* Category Filter Form */}
      <div className="mb-6">
        <CategoryForm />
      </div>

      {/* Create New Course Button */}
      <div className="flex justify-end mb-6">
        <Link
          to="/createcoursepage"
          className="bg-blue-500 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-md text-sm sm:text-base hover:bg-blue-600 transition"
        >
          + Create Course
        </Link>
      </div>

      {/* Courses List */}

      <CourseCard title={false} showViewButton={false} />
    </section>
  );
};

export default CourseForm;
