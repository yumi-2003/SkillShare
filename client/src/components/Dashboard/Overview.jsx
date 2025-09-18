import React, { useState, useEffect } from "react";
import Card from "./Card";
import { Users, BookOpen, Layers, UserStar } from "lucide-react";
import axiosInstance from "../../apiCalls/axiosInstance";
import EnrolledStudents from "../../pages/admin/EnrolledStudents";

const Overview = () => {
  const [userList, setUserList] = useState([]);
  const [courseList, setCourseList] = useState([]);
  const [enrollmentList, setEnrollmentList] = useState([]);

  // get users api
  const getUsers = async () => {
    try {
      const res = await axiosInstance.get("/api/users");
      setUserList(res.data.users || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  //get courses api
  const getCourses = async () => {
    try {
      const res = await axiosInstance.get("api/courses");
      setCourseList(res.data.courses || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  //get enrollement api
  const getEnrollement = async () => {
    try {
      const res = await axiosInstance.get("api/enrollments");
      setEnrollmentList(res.data.enrollments || []);
      console.log(enrollmentList);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEnrollement();
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 my-6">
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
          value={enrollmentList.length}
          subtitle=""
          icon={<Layers size={20} />}
        />
      </div>

      <EnrolledStudents />
    </>
  );
};

export default Overview;
