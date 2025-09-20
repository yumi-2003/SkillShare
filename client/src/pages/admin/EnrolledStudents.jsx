import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllCourses } from "../../stores/slices/courseSlice";
import { getCourseEnrollees } from "../../stores/slices/enrollment";
import CourseAccordion from "../../pages/admin/CourseManage/CourseAccordion";

const EnrolledStudents = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { list: coursesData } = useSelector((state) => state.course);
  const courses = coursesData || [];
  const { courseEnrollees } = useSelector((state) => state.enrollment);

  // Filter courses created by this instructor
  const instructorCourses = courses.filter(
    (course) => course.instructor === user?._id
  );

  // Get all courses
  useEffect(() => {
    dispatch(getAllCourses());
  }, [dispatch]);

  // Fetch enrolled students for each course
  useEffect(() => {
    if (instructorCourses.length > 0) {
      instructorCourses.map((course) => {
        dispatch(
          getCourseEnrollees({ courseId: course._id, userId: user._id })
        );
      });
    }
  }, [dispatch, instructorCourses, user?._id]);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Recent Enrollments</h2>

      {instructorCourses.length === 0 && (
        <p className="text-gray-500">Your courses are not been applied yet</p>
      )}

      {instructorCourses.map((course) => (
        <CourseAccordion
          key={course._id}
          course={course}
          enrollees={courseEnrollees[course._id]}
        />
      ))}
    </div>
  );
};

export default EnrolledStudents;
