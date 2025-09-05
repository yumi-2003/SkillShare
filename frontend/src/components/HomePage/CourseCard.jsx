import { Club } from "lucide-react";
import reactCourseimg from "../../assets/react_course.jpg";
import pythonimg from "../../assets/python.png";
import uiuximg from "../../assets/uiux.jpg";
import datascience from "../../assets/data-science.jpg";
import { Link } from "react-router-dom";
// Mock Course Data
const courses = [
  {
    id: 1,
    category: "Frontend",
    image: reactCourseimg,
    title: "React Development Fundamentals",
    description:
      "Master the fundamentals of React including components, hooks, state, and props.",
    duration: "8 weeks",
    students: 2543,
    lessons: 24,
  },
  {
    id: 2,
    category: "Programming",
    image: pythonimg,
    title: "Python Programming Mastery",
    description:
      "Learn Python from scratch with hands-on projects covering web development and data analysis.",
    duration: "10 weeks",
    students: 389,
    lessons: 32,
  },
  {
    id: 3,
    category: "Design",
    image: uiuximg,
    title: "UI/UX Design Principles",
    description:
      "Create beautiful and user-friendly interfaces with modern design principles.",
    duration: "6 weeks",
    students: 1876,
    lessons: 18,
  },
  {
    id: 4,
    category: "Data Science",
    image: datascience,
    title: "Data Science & Analytics",
    description:
      "Dive into data science with Python, machine learning, and statistical modeling.",
    duration: "12 weeks",
    students: 2145,
    lessons: 36,
  },
];

const CourseCard = () => {
  return (
    <div className="bg-gray-100 py-16">
      {/* title */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <h2 className="text-center mb-7 text-3xl font-semibold">
          Featured Courses
        </h2>
        <p className="text-center mt-2 text-gray-500">
          Discover our most popular courses designed by industry experts to help
          you build in-demand skills.
        </p>
      </div>
      {/* course grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-3 mt-3">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-lg shadow-lg hover:shadow-2xl overflow-hidden transition duration-300"
          >
            <div className="relative">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-48 object-cover"
              />
              <span className="absolute top-3 left-3 bg-green-200 text-green-800 rounded px-2 py-1 text-xs font-semibold">
                {course.category}
              </span>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {course.title}
              </h3>
              <p className="text-gray-500 mb-2 text-sm">{course.description}</p>
              {/* stats */}
              <div className="flex justify-between mb-4 text-sm text-gray-400">
                <span>⏱ {course.duration}</span>
                <span>👥 {course.students}</span>
                <span>📚 {course.lessons}</span>
              </div>
              <button className="w-full bg-blue-600 text-white text-lg rounded-lg px-4 py-2 hover:bg-blue-700 transition">
                Enroll Now
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* view all course */}
      <div className="mt-8 text-center">
        <Link
          to="/allcourses"
          className="text-lg rounded-lg px-6 py-3 hover:text-white hover:bg-blue-700 border-2 shadow-lg"
        >
          View All Courses
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;
