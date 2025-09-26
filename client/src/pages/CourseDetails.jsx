import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Edit, Trash } from "lucide-react";
import { deleteCourse, getAllCourses } from "../stores/slices/courseSlice";
import { getAllCategories } from "../stores/slices/categorySlice";
import { enrollInCourse, getMyEnrollments } from "../stores/slices/enrollment";
import axiosInstance from "../apiCalls/axiosInstance";
import { toast, ToastContainer } from "react-toastify";
import ReviewCourse from "../pages/coursesPage/ReviewCourse";

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { categories } = useSelector((state) => state.category);
  const { list: coursesList } = useSelector((state) => state.course);
  const user = useSelector((state) => state.user.user);
  const { myEnrollments } = useSelector((state) => state.enrollment);

  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    totalLessons: "",
    duration: "",
    category: "",
    image: null,
  });

  // Fetch categories and courses
  useEffect(() => {
    dispatch(getAllCategories());
    dispatch(getAllCourses());
  }, [dispatch]);

  // Fetch course details
  useEffect(() => {
    const fetchCourseById = async () => {
      try {
        const res = await axiosInstance.get(`/courses/${id}`);
        if (res.data.isSuccess) {
          const { courseDoc } = res.data;
          setCourseData({
            _id: courseDoc._id,
            title: courseDoc.title || "",
            description: courseDoc.description || "",
            totalLessons: courseDoc.totalLessons || "",
            duration: courseDoc.duration || "",
            category: courseDoc.category?._id || "",
            instructor: courseDoc.instructor || null,
            image: courseDoc.image,
          });
        }
      } catch (err) {
        console.error("Failed to fetch course", err.message);
        toast.error("Failed to fetch course");
      }
    };
    fetchCourseById();
  }, [id]);

  // Fetch user enrollments
  useEffect(() => {
    if (user?._id) {
      dispatch(getMyEnrollments({ userId: user._id }));
    }
  }, [dispatch, user?._id]);

  const category = categories.find((c) => c._id === courseData.category);

  // Check enrollment
  const isEnrolled = myEnrollments.some(
    (enrollment) => enrollment.course._id === courseData._id
  );

  const relatedCourses = Array.isArray(coursesList)
    ? coursesList.filter((c) => c && c._id && c._id !== courseData._id)
    : [];

  const getCategoryName = (categoryId) => {
    const cat = categories.find((cat) => cat._id === categoryId);
    return cat ? cat.name : "Unknown";
  };

  // Enrollment handler
  const handleEnroll = () => {
    if (
      user?.userType === "instructor" &&
      user?._id === courseData.instructor?._id
    ) {
      toast.error("You cannot enroll in courses.");
      return;
    }
    if (user?._id) {
      dispatch(enrollInCourse({ courseId: courseData._id, userId: user?._id }))
        .then((res) => {
          if (res.payload?.isSuccess) {
            toast.success("Enrolled successfully!");
            setTimeout(() => navigate("/student-dashboard"), 5000);
          } else {
            toast.error(res.payload?.message || "You are already enrolled.");
          }
        })
        .catch((err) => {
          toast.error(err.message || "Enrollment failed.");
        });
    }
  };

  // Delete course
  const handleDelete = (id) => {
    if (user?._id) {
      dispatch(deleteCourse({ id, userId: user._id }));
      toast.success("Course deleted successfully");
      setTimeout(() => navigate("/allcourses"), 500);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 mt-24">
      <ToastContainer />
      {/* Course Card */}
      <div className="bg-white shadow-xl rounded-2xl overflow-hidden flex flex-col md:flex-row gap-8">
        {/* Left: Course Image */}
        <div className="relative md:w-1/2">
          <img
            src={courseData.image}
            alt={courseData.title}
            className="w-full h-80 md:h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        </div>

        {/* Right: Course Info */}
        <div className="md:w-1/2 flex flex-col justify-center p-6">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            {courseData.title}
          </h1>
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
              Category: {category?.name || "N/A"}
            </span>
            <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">
              Lessons: {courseData.totalLessons || "0"}
            </span>
          </div>
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
              Duration: {courseData.duration || "0"} hours
            </span>
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
              Instructor: {courseData.instructor?.name || "unknown"}
            </span>
          </div>
          <p className="text-gray-700 leading-relaxed mb-6">
            {courseData.description || "No description available."}
          </p>

          {/* Action Buttons */}
          {user?.userType === "instructor" &&
          user?._id === courseData.instructor?._id ? (
            <div className="flex gap-2 mt-2">
              <Link
                to={`/courses/edit/${courseData._id}`}
                className="flex items-center gap-2 px-5 py-2 bg-green-600 nav-link-white rounded-lg shadow hover:bg-green-700 transition"
              >
                <Edit size={18} /> Edit
              </Link>
              <button
                onClick={() => handleDelete(courseData._id)}
                className="flex items-center gap-2 px-5 py-2 bg-red-600 nav-link-white rounded-lg shadow hover:bg-red-700 transition"
              >
                <Trash size={18} /> Delete
              </button>
            </div>
          ) : (
            <div className="mt-2">
              {isEnrolled ? (
                <button className="bg-green-800 text-white px-4 py-2 rounded">
                  Already Enrolled
                </button>
              ) : (
                <button
                  onClick={handleEnroll}
                  className="bg-green-600 text-white px-4 py-2 rounded"
                >
                  Enroll Now
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-12">
        {courseData._id && (
          <ReviewCourse
            courseId={courseData._id}
            enrolled={isEnrolled}
            currentUser={user}
          />
        )}
      </div>

      {/* Related Courses */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Related Courses</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {relatedCourses.slice(0, 4).map((course) => (
            <div
              key={course._id}
              className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition duration-300"
            >
              <img
                src={course.image || "/placeholder.png"}
                alt={course.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">
                  {course.title.length > 20
                    ? `${course.title.substring(0, 18)}...`
                    : course.title}
                </h3>
                <p className="text-gray-500 text-sm mb-3">
                  {getCategoryName(course.category)}
                </p>
                <Link
                  to={`/courseDetails/${course._id}`}
                  className="inline-block px-4 py-2 bg-green-600 text-sm rounded-lg hover:bg-green-700 transition"
                >
                  <span className="text-white">View Details</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
