import React from "react";
import CategoryForm from "./CategoryForm";
import { Link } from "react-router-dom";
import CourseCard from "../../../components/HomeComponents/CourseCard";
import { ToastContainer } from "react-toastify";

const CourseForm = () => {
  return (
    <section className="bg-white rounded shadow sm:px-6 py-6 sm:py-8">
      {/* Category Filter Form */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <CategoryForm />
        <ToastContainer position="top-right" />
        {/* Create New Course Button */}
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
