import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllCourses } from "../../stores/slices/courseSlice";
// import { useEffect } from "react";
// import { getCourseEnrollees } from "../../stores/slices/enrollment";

const EnrolledStudents = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { list: coursesData } = useSelector((state) => state.course);
  const courses = coursesData || [];

  // get all courses api
  useEffect(() => {
    dispatch(getAllCourses());
  }, [dispatch]);
  console.log("all courses:", courses);
  const courseInt = courses.filter((course) => course.instructor === user?._id);
  console.log("courseInt:", courseInt);
  courses.map((course) => console.log("course", course.title));
  courses.map((course) => console.log("course", course.instructor));

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Recent Enrollments</h2>

      {courses?.length > 0 ? (
        courses
          .filter((course) => course.instructor === user._id)
          .map((course) => (
            <div
              key={course._id}
              className="bg-white p-4 rounded shadow-md mb-3"
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                {/* Student Info */}
                <div className="w-full sm:w-1/2">
                  <p className="text-lg font-bold">{course.student?.name}</p>
                  <p className="text-sm text-gray-500">
                    {course.student?.email}
                  </p>
                </div>

                {/* Enrollment Info */}
                <div className="w-full sm:w-1/2">
                  <p className="text-lg font-bold">
                    Enrolled In: {course?.title || "This Course"}
                  </p>
                  <p className="text-sm text-gray-500">
                    Enrolled on:{" "}
                    {/* {new Date(enrollment.course.createdAt).toLocaleDateString()} */}
                  </p>
                </div>
              </div>
            </div>
          ))
      ) : (
        <p className="text-gray-500">No students enrolled yet.</p>
      )}
    </div>
  );
};

export default EnrolledStudents;
