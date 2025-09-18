import Card from "../../components/Dashboard/Card";
import { BookOpen, Clock, Award } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const DashboardStudent = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth); // Get user from Redux

  useEffect(() => {
    if (!user) {
      navigate("/login"); // redirect if not logged in
    }
  }, [user, navigate]);
  return (
    <div className="h-screen p-6 mt-10">
      <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold">
        Student Dashboard
      </h2>
      <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-500 mb-6 break-words">
        Track your learning progress and enrolled courses
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-6">
        <Card
          title="Enrolled Courses"
          value="0"
          subtitle="Courses you're taking"
          icon={<BookOpen size={20} />}
        />
        <Card
          title="In Progress"
          value="0"
          subtitle="Total learning time"
          icon={<Clock size={20} />}
        />
        <Card
          title="Completed"
          value="0"
          subtitle="Completed courses"
          icon={<Award size={20} />}
        />
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">My Courses</h3>
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p className="text-gray-500">
            You haven't enrolled in any courses yet.
          </p>
          <a
            href="/allcourses"
            className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Browse Courses
          </a>
        </div>
      </div>
    </div>
  );
};

export default DashboardStudent;
