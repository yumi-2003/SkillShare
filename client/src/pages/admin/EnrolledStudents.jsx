import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getCourseEnrollees } from "../../stores/slices/enrollment";

const EnrolledStudents = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user); // Get user from Redux
  const { courseEnrollees } = useSelector((state) => state.enrollment);
  const { list: courses } = useSelector((state) => state.course);

  // get enrolledStudents from Enrollment slice
  useEffect(() => {
    if (user?._id && user?.role === "instructor") {
      dispatch(
        getCourseEnrollees({ courseId: courses?._id, userId: user?._id })
      );
    }
  }, [dispatch, user?._id, user?.role, courses?._id]);
  console.log("courseEnrollees:", courseEnrollees);
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Recent Enrollments</h2>

      {courseEnrollees?.length > 0 ? (
        courseEnrollees.map((enrollment) => (
          <div
            key={enrollment._id}
            className="bg-white p-4 rounded shadow-md mb-3"
          >
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              {/* Student Info */}
              <div className="w-full sm:w-1/2">
                <p className="text-lg font-bold">{enrollment.student?.name}</p>
                <p className="text-sm text-gray-500">
                  {enrollment.student?.email}
                </p>
              </div>

              {/* Enrollment Info */}
              <div className="w-full sm:w-1/2">
                <p className="text-lg font-bold">
                  Enrolled In: {enrollment.course?.title || "This Course"}
                </p>
                <p className="text-sm text-gray-500">
                  Enrolled on:{" "}
                  {new Date(enrollment.createdAt).toLocaleDateString()}
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
