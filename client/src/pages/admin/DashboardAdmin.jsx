import Overview from "../../components/Dashboard/Overview";
import ActiveTabs from "../../components/Dashboard/ActiveTabs";
import { LineChart, BookOpen, Users } from "lucide-react";
import CoursesForm from "../admin/CourseManage/CourseForm";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import DashboardStudent from "../students/DashboardStudent";
import EnrolledStudents from "./EnrolledStudents";

const DashboardAdmin = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth); // Get user from Redux

  useEffect(() => {
    if (!user) {
      navigate("/login"); // redirect if not logged in
    }
  }, [user, navigate]);
  const activeTabs = [
    {
      id: 0,
      label: "Overview",
      icon: LineChart,
      content: <Overview />,
    },
    {
      id: 1,
      label: "Courses",
      icon: BookOpen,
      content: <CoursesForm />,
    },
    {
      id: 2,
      label: "Student",
      icon: Users,
      content: <EnrolledStudents />,
    },
    {
      id: 3,
      label: "My Enrollments",
      content: <DashboardStudent />,
    },
  ];
  return (
    <div className="p-24 sm:p-6 md:p-8 mt-6 sm:mt-10 min-h-screen overflow-auto">
      <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold">
        Admin Dashboard
      </h2>
      <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-500 mb-6 break-words">
        Manage courses, students, and platform analytics
      </p>
      <ActiveTabs tabs={activeTabs} storageKey="activeTabs" />
    </div>
  );
};

export default DashboardAdmin;
