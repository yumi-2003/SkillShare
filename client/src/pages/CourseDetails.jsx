import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Edit, Trash, CheckCircle } from "lucide-react";
import { deleteCourse, getAllCourses } from "../stores/slices/courseSlice";
import { getAllCategories } from "../stores/slices/categorySlice";
import { enrollInCourse, getMyEnrollments } from "../stores/slices/enrollment";
import { fetchCourseProgress, toggleLessonCompletion, clearProgress } from "../stores/slices/courseProgressSlice";
import axiosInstance from "../apiCalls/axiosInstance";
import { toast, ToastContainer } from "react-toastify";
import ReviewCourse from "../pages/coursesPage/ReviewCourse";
import Skeleton from "../components/ui/Skeleton";

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { categories = [] } = useSelector((state) => state.category) || {};
  const { list: coursesList = [] } = useSelector((state) => state.course) || {};
  const user = useSelector((state) => state.user.user) || {};
  const { myEnrollments = [] } = useSelector((state) => state.enrollment) || {};

  const [courseData, setCourseData] = useState({
    _id: "",
    title: "",
    description: "",
    totalLessons: "",
    duration: "",
    category: "",
    instructor: null,
    image: null,
    lessons: [],
  });
  const [selectedLesson, setSelectedLesson] = useState(null);

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
        if (res?.data?.isSuccess) {
          const { courseDoc } = res.data;
          setCourseData({
            _id: courseDoc?._id || "",
            title: courseDoc?.title || "",
            description: courseDoc?.description || "",
            totalLessons: courseDoc?.totalLessons || "",
            duration: courseDoc?.duration || "",
            category: courseDoc?.category?._id || "",
            instructor: courseDoc?.instructor || null,
            image: courseDoc?.image || "/placeholder.png",
            averageRating: courseDoc?.averageRating || 0,
            totalReviews: courseDoc?.totalReviews || 0,
            createdAt: courseDoc?.createdAt || null,
            lessons: courseDoc?.lessons || [],
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

  // Find category object
  const category = categories.find((c) => c?._id === courseData?.category);

  // Check enrollment
  const isEnrolled = myEnrollments.some(
    (enrollment) => enrollment?.course?._id === courseData?._id
  );

  // Related courses (excluding current)
  const relatedCourses = Array.isArray(coursesList)
    ? coursesList.filter((c) => c?._id && c._id !== courseData._id)
    : [];

  const { progress, loading } = useSelector((state) => state.courseProgress);

  // Fetch progress on load if logged in and enrolled
  useEffect(() => {
    if (user?._id && isEnrolled) {
      dispatch(fetchCourseProgress(id));
    }
    return () => dispatch(clearProgress());
  }, [dispatch, id, user?._id, isEnrolled]);

  const handleToggleLesson = async (lessonId) => {
    if (!user?._id) {
      toast.warning("Please login to track your progress.");
      return;
    }
    if (!isEnrolled) {
      toast.warning("Please enroll in the course to track progress.");
      return;
    }
    dispatch(toggleLessonCompletion({ courseId: id, lessonId }));
  };

  const getCategoryName = (categoryId) => {
    const cat = categories.find((cat) => cat?._id === categoryId);
    return cat?.name || "Unknown";
  };

  // Enrollment handler
  const handleEnroll = () => {
    if (
      user?.userType === "instructor" &&
      user?._id === courseData?.instructor?._id
    ) {
      toast.error("You cannot enroll in courses.");
      return;
    }
    if (user?._id) {
      dispatch(enrollInCourse({ courseId: courseData?._id, userId: user?._id }))
        .then((res) => {
          if (res?.payload?.isSuccess) {
            toast.success("Enrolled successfully!");
            setTimeout(() => navigate("/student-dashboard"), 5000);
          } else {
            toast.error(res?.payload?.message || "You are already enrolled.");
          }
        })
        .catch((err) => {
          toast.error(err?.message || "Enrollment failed.");
        });
    }
  };

  // Delete course
  const handleDelete = (id) => {
    if (user?._id) {
      dispatch(deleteCourse({ id, userId: user?._id }));
      toast.success("Course deleted successfully");
      setTimeout(() => navigate("/allcourses"), 500);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 mt-24">
      <ToastContainer />
      {/* Loading State */}
      {!courseData?._id ? (
        <div className="flex justify-center items-center h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        </div>
      ) : (
        <div className="bg-[var(--bg-card)] shadow-xl rounded-2xl overflow-hidden flex flex-col md:flex-row gap-8 transition-colors duration-300">
          {/* Left: Course Image */}
          <div className="relative md:w-1/2">
            <img
              src={courseData?.image || "/placeholder.png"}
              alt={courseData?.title || "Course Image"}
              className="w-full h-80 md:h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          </div>

          {/* Right: Course Info */}
          <div className="md:w-1/2 flex flex-col justify-center p-6">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
              {courseData?.title || "Untitled Course"}
            </h1>
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                Category: {category?.name || "N/A"}
              </span>
              <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">
                Lessons: {courseData?.totalLessons || "0"}
              </span>
            </div>
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="bg-emerald-100 text-emerald-800 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {courseData?.duration || "0"} duration
              </span>
              <span className="bg-indigo-100 text-indigo-800 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                By {courseData?.instructor?.name || "Unknown"}
              </span>
            </div>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${i < Math.floor(courseData.averageRating)
                      ? "text-yellow-400"
                      : "text-gray-300"
                      }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-2 text-sm font-bold text-gray-700">
                  {courseData.averageRating} ({courseData.totalReviews} reviews)
                </span>
              </div>
              {courseData.createdAt && (
                <span className="text-xs text-gray-400 font-medium italic">
                  Published on {new Date(courseData.createdAt).toLocaleDateString()}
                </span>
              )}
            </div>

            <p className="text-gray-700 leading-relaxed mb-6 text-lg">
              {courseData?.description || "No description available."}
            </p>

            {/* Action Buttons */}
            {user?.userType === "instructor" &&
              user?._id === courseData?.instructor?._id ? (
              <div className="flex gap-2 mt-2">
                <Link
                  to={`/courses/edit/${courseData?._id}`}
                  className="flex items-center gap-2 px-5 py-2 bg-green-600 nav-link-white rounded-lg shadow hover:bg-green-700 transition"
                >
                  <Edit size={18} /> Edit
                </Link>
                <button
                  onClick={() => handleDelete(courseData?._id)}
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
      )}

      {/* Course Content / Lessons Section */}
      <div className="mt-12 bg-[var(--bg-card)] shadow-lg rounded-2xl overflow-hidden border border-[var(--border-color)] transition-colors duration-300">
        <div className="p-6 md:p-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Course Content
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Lesson List */}
            <div className="lg:col-span-1 space-y-4">
              {/* Progress Bar (Only for Enrolled Students) */}
              {user?._id && isEnrolled && !loading && (
                <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 p-5 rounded-2xl shadow-lg shadow-indigo-200 mb-6">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-bold text-indigo-100 uppercase tracking-widest">Course Progress</span>
                    <span className="text-sm font-black text-white">{progress.percentage}%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2.5 backdrop-blur-sm shadow-inner">
                    <div
                      className="bg-white h-2.5 rounded-full transition-all duration-1000 ease-[cubic-bezier(0.34,1.56,0.64,1)] relative overflow-hidden"
                      style={{ width: `${progress.percentage}%` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                    </div>
                  </div>
                </div>
              )}

              {courseData.lessons?.length > 0 ? (
                courseData.lessons.map((lesson, index) => {
                  const isCompleted = progress.completedLessons?.includes(lesson._id);
                  const isSelected = selectedLesson?._id === lesson._id || selectedLesson?.title === lesson.title;
                  return (
                    <button
                      key={index}
                      onClick={() => setSelectedLesson(lesson)}
                      className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-300 flex items-center justify-between group relative overflow-hidden ${isSelected
                        ? "bg-[var(--bg-muted)] border-[var(--accent-primary)] shadow-md transform scale-[1.02]"
                        : "bg-[var(--bg-card)] border-[var(--border-color)] hover:border-[var(--accent-primary)] hover:shadow-sm"
                        }`}
                    >
                      <div className="flex items-center gap-4 relative z-10">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold transition-colors duration-300 ${isCompleted ? "bg-green-100 text-green-600 shadow-sm" :
                          isSelected ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200" : "bg-gray-100 text-gray-400"
                          }`}>
                          {isCompleted ? <CheckCircle size={18} /> : index + 1}
                        </div>
                        <div>
                          <h4 className={`text-sm font-bold transition-colors duration-300 ${isSelected ? "text-indigo-900" : "text-gray-700"}`}>
                            {lesson.title}
                          </h4>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className={`text-[10px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded ${isSelected ? "bg-indigo-100 text-indigo-600" : "bg-gray-100 text-gray-400"
                              }`}>
                              {lesson.type}
                            </span>
                            {isCompleted && <span className="text-[10px] font-bold text-green-600 flex items-center gap-1">
                              <CheckCircle size={10} /> DONE
                            </span>}
                          </div>
                        </div>
                      </div>
                      <div className={`transition-colors duration-300 ${isSelected ? "text-indigo-500" : "text-gray-300"}`}>
                        {lesson.type === "video" ? (
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zm10 2a1 1 0 00-1.707-.707l-3 3a1 1 0 000 1.414l3 3A1 1 0 0012 14V8z" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        )}
                      </div>
                    </button>
                  );
                })
              ) : (
                <div className="text-center py-10 px-4 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                  <p className="text-gray-400 text-sm font-medium italic">No lessons available yet.</p>
                </div>
              )}
            </div>

            <div className="lg:col-span-2">
              {selectedLesson ? (
                <div className="bg-[var(--bg-card)] rounded-3xl p-6 md:p-8 min-h-[500px] border border-[var(--border-color)] shadow-xl shadow-[var(--card-shadow)] transition-colors duration-300">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <div>
                      <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-2 py-1 rounded uppercase tracking-[0.2em] mb-2 inline-block">
                        Currently Viewing
                      </span>
                      <h3 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight">
                        {selectedLesson.title}
                      </h3>
                    </div>
                    {user?._id && isEnrolled && (
                      <button
                        onClick={() => handleToggleLesson(selectedLesson._id)}
                        className={`group flex items-center gap-2.5 px-6 py-3 rounded-2xl text-sm font-black transition-all duration-500 shadow-lg ${progress.completedLessons?.includes(selectedLesson._id)
                          ? "bg-green-600 text-white shadow-green-200 hover:bg-green-700 hover:scale-105 active:scale-95"
                          : "bg-indigo-600 text-white shadow-indigo-200 hover:bg-indigo-700 hover:scale-105 active:scale-95"
                          }`}
                      >
                        <CheckCircle size={18} className={`transition-transform duration-500 ${progress.completedLessons?.includes(selectedLesson._id) ? "rotate-0" : "rotate-[-45deg] group-hover:rotate-0"}`} />
                        {progress.completedLessons?.includes(selectedLesson._id) ? "Lesson Finished" : "Mark as Done"}
                      </button>
                    )}
                  </div>
                  {selectedLesson.type === "video" ? (
                    <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-2xl">
                      {/* Simple Embed logic for YouTube/Vimeo or Video tag */}
                      {selectedLesson.content.includes("youtube.com") || selectedLesson.content.includes("youtu.be") ? (
                        <iframe
                          className="w-full h-full"
                          src={selectedLesson.content.replace("watch?v=", "embed/").split("&")[0]}
                          title={selectedLesson.title}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      ) : (
                        <video className="w-full h-full" controls src={selectedLesson.content}></video>
                      )}
                    </div>
                  ) : (
                    <div className="prose prose-indigo max-w-none bg-white p-8 rounded-xl border border-gray-100 shadow-sm leading-relaxed whitespace-pre-wrap">
                      {selectedLesson.content}
                    </div>
                  )}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-12 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                    <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800">Ready to start?</h3>
                  <p className="text-gray-500 text-sm max-w-xs mx-auto mt-1">Select a lesson from the list on the left to begin your learning journey.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-12">
        {courseData?._id && (
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
          {relatedCourses.slice(0, 4).map((course) =>
            course?._id ? (
              <div
                key={course._id}
                className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition duration-300"
              >
                <img
                  src={course?.image || "/placeholder.png"}
                  alt={course?.title || "Course"}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">
                    {course?.title
                      ? course.title.length > 20
                        ? `${course.title.substring(0, 18)}...`
                        : course.title
                      : "No Title"}
                  </h3>
                  <p className="text-gray-500 text-sm mb-3">
                    {getCategoryName(course?.category)}
                  </p>
                  <Link
                    to={`/courseDetails/${course._id}`}
                    className="inline-block px-4 py-2 bg-green-600 text-sm rounded-lg hover:bg-green-700 transition"
                  >
                    <span className="text-white">View Details</span>
                  </Link>
                </div>
              </div>
            ) : null
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
