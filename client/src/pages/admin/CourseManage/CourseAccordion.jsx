import React, { useState } from "react";

const CourseAccordion = ({ course, enrollees }) => {
  const [isOpen, setIsOpen] = useState(false);

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
        <span className="text-gray-500">{isOpen ? "-" : "+"}</span>
      </button>

      {isOpen && (
        <div className="bg-gray-50 p-4 border rounded mt-2">
          {enrollees?.length > 0 ? (
            enrollees.map((enrollee) => (
              <div
                key={enrollee.user._id}
                className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 border p-2 rounded mb-2"
              >
                <div>
                  <p className="font-medium">{enrollee.user.name}</p>
                  <p className="text-sm text-gray-500">{enrollee.user.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">
                    Enrolled on:{" "}
                    {new Date(enrollee.createdAt).toLocaleDateString()}
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
