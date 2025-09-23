import React, { useState } from "react";
import { useSelector } from "react-redux";

const CourseAccordion = ({ course }) => {
  const { courseEnrollees } = useSelector((state) => state.enrollment);

  const [isOpen, setIsOpen] = useState(false);

  console.log("Enrollees", courseEnrollees);
  console.log("course", course);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="mb-3">
      <button
        onClick={toggleAccordion}
        className="w-full text-left bg-white p-4 rounded shadow-md flex justify-between items-center"
      >
        <span className="text-lg font-bold">{course.title}</span>
        {/* get id of each course */}
        <span className="text-gray-500">{isOpen ? "-" : "+"}</span>
      </button>

      {isOpen && (
        <div className="bg-gray-50 p-4 border-none rounded mt-2">
          {courseEnrollees?.length > 0 ? (
            courseEnrollees.map((enrollee) => (
              <div
                key={enrollee._id}
                className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 border-none p-2 rounded mb-2"
              >
                <div>
                  <p className="font-medium">{enrollee.student.name}</p>
                  <p className="text-sm text-gray-500">
                    {enrollee.student.email}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">
                    Enrolled on:{" "}
                    {new Date(enrollee.enrolledAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">
              No students enrolled in this course yet.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default CourseAccordion;
