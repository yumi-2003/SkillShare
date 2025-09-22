import Card from "../../components/Dashboard/Card";
import { BookOpen, Clock, Award } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import { getMyEnrollments } from "../../stores/slices/enrollment";

const DashboardStudent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user); // Get user from Redux
  const { myEnrollments } = useSelector((state) => state.enrollment);

  useEffect(() => {
    if (!user) {
      navigate("/login"); // redirect if not logged in
    }
  }, [user, navigate]);

  useEffect(() => {
    if (user?._id) {
      dispatch(getMyEnrollments({ userId: user?._id }));
    }
  }, [dispatch, user?._id]);
  console.log("My Enrollments:", myEnrollments);

  const image =
    myEnrollments && myEnrollments.length > 0
      ? myEnrollments.map((enrollment) => enrollment.course.image)
      : null;

  console.log(image);

  return (
    <div className="h-screen p-6 mt-24 sm:mt-10 overflow-hidden">
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
        My Dashboard
      </h2>
      <p className="text-sm text-gray-500 mb-4 italic">
        Track your learning progress and enrolled courses
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-6">
        <Card
          title="Enrolled Courses"
          value={myEnrollments ? myEnrollments.length : 0}
          subtitle="Courses you're taking"
          icon={<BookOpen size={20} />}
        />
        <Card
          title="In Progress"
          value={"0"}
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

      <div className="">
        <h3 className="text-xl font-semibold mb-4">My Courses</h3>
        <div className="bg-white h-100 overflow-auto rounded-lg shadow p-6 text-center">
          {myEnrollments && myEnrollments.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {myEnrollments.map((enrollment) => (
                <div
                  key={enrollment._id}
                  className="border rounded-lg  shadow hover:shadow-lg transition-shadow"
                >
                  <img
                    src={enrollment.course?.image || "/placeholder.png"}
                    alt={enrollment.course?.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h4 className="text-lg font-semibold mb-2">
                      {enrollment.course.title}
                    </h4>
                    <p className="text-gray-600 text-sm mb-4">
                      {enrollment.course.description?.length > 40
                        ? enrollment.course.description.substring(0, 35) + "..."
                        : enrollment.course.description}
                    </p>
                    <p className="text-gray-700 text-sm mb-2">
                      <span className="font-semibold">Enrolled On:</span>{" "}
                      {new Date(enrollment.enrolledAt).toLocaleDateString()}
                    </p>

                    <Link
                      to={`/courseDetails/${enrollment.course._id}`}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      View Course Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <p className="text-gray-500">
                You haven't enrolled in any courses yet.
              </p>
              <Link
                to={"/allcourses"}
                className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Browse Courses
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardStudent;
