import React, { useState, useEffect } from "react";
import Card from "./Card";
import { Users, BookOpen, Layers, UserStar } from "lucide-react";
import axiosInstance from "../../apiCalls/axiosInstance";
import EnrolledStudents from "../../pages/admin/EnrolledStudents";
// import { useSelector } from "react-redux";
// import { getCourseEnrollees } from "../../stores/slices/enrollment";

const Overview = () => {
  const [userList, setUserList] = useState([]);
  const [courseList, setCourseList] = useState([]);
  // const [enrollmentList, setEnrollmentList] = useState([]);
  // const user = useSelector((state) => state.auth.user); // Get user from Redux
  // const { myEnrollments } = useSelector((state) => state.enrollment);

  // get users api
  const getUsers = async () => {
    try {
      const res = await axiosInstance.get("/api/users");
      setUserList(res.data.users || []);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   getUsers();
  // }, []);

  //get courses api
  const getCourses = async () => {
    try {
      const res = await axiosInstance.get("api/courses");
      setCourseList(res.data.courses || []);
    } catch (error) {
      console.log(error);
    }
  };

  //get enrolled students from redux slice

  useEffect(() => {
    getUsers();
    getCourses();
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 my-6">
        {/* check this card are populated by loggin user data id */}
        <Card
          title="Total Users"
          value={
            userList.filter((user) => user.userType !== "instructor").length
          }
          subtitle=""
          icon={<Users size={20} />}
        />
        <Card
          title="Total Courses"
          value={courseList.length}
          subtitle=""
          icon={<BookOpen size={20} />}
        />
        <Card
          title="Total Enrollment"
          // value={user?._id && enrollmentList.length}
          subtitle=""
          icon={<Layers size={20} />}
        />
      </div>

      <EnrolledStudents />
    </>
  );
};

export default Overview;
