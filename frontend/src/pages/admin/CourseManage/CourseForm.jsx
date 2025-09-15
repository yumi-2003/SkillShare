import React, { useState } from "react";
import CategoryForm from "./CategoryForm";
import { setUser } from "../../../stores/slices/userSlice";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CourseCard from "../../../components/HomeComponents/CourseCard";

const CourseForm = () => {
  const user = useSelector((state) => state.user.user);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    totalLessons: "",
    duration: "",
    image: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className="bg-gray-100 p-4">
      <CategoryForm />
      {/* create new course */}
      <div className="text-right mb-4">
        <Link to="" className="bg-blue-500 text-white px-4 py-2 rounded-md">
          + Create Course
        </Link>
      </div>
      <CourseCard title={false} showViewButton={false} />
    </section>
  );
};

export default CourseForm;
