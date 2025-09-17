import React from "react";
import CategoryForm from "./CategoryForm";
import { Link } from "react-router-dom";
import CourseCard from "../../../components/HomeComponents/CourseCard";

const CourseForm = () => {
  return (
    <section className="bg-gray-100 p-4">
      <CategoryForm />
      {/* create new course */}
      <div className="text-right mb-4">
        <Link
          to="/createcoursepage"
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          + Create Course
        </Link>
      </div>
      <CourseCard title={false} showViewButton={false} />
    </section>
  );
};

export default CourseForm;
