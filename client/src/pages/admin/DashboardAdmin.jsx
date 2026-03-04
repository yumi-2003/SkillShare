import Overview from "../../components/Dashboard/Overview";
import ActiveTabs from "../../components/Dashboard/ActiveTabs";
import { LineChart, BookOpen, Users } from "lucide-react";
import CoursesForm from "../admin/CourseManage/CourseForm";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import EnrolledStudents from "./EnrolledStudents";
import EnrolledCourses from "./EnrolledCourses";
import AdminQuicks from "./AdminQuicks";
import AdminBadges from "./AdminBadges";
import { Zap, Award as BadgeIcon } from "lucide-react";

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
      content: <EnrolledCourses />,
    },
    {
      id: 4,
      label: "Quicks",
      icon: Zap,
      content: <AdminQuicks />,
    },
    {
      id: 5,
      label: "Badges",
      icon: BadgeIcon,
      content: <AdminBadges />,
    },
  ];
  return (
    <div className="p-4 sm:p-8 pt-20 sm:pt-28 max-w-6xl mx-auto min-h-screen overflow-auto">
      <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold">
        Admin Dashboard
      </h2>
      <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-500 mb-6 break-words">
        Manage courses, students, and platform analytics
      </p>
      <ActiveTabs tabs={activeTabs} storageKey="activeTabs" marginTop="mt-2" />
    </div>
  );
};

export default DashboardAdmin;
