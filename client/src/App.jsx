import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./layout/Home";
import AllCourses from "./components/AllCourses/AllCourses";
import Navbar from "./components/HomeComponents/Navbar";
import Footer from "./components/Footer/Footer";
import AuthForm from "./components/Auth/AuthForm";
import DashboardAdmin from "./pages/admin/DashboardAdmin";
import DashboardStudent from "./pages/students/DashboardStudent";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadUserFromStorage } from "./util/loadUserFromStorage";
import CreateCoursePage from "./pages/admin/CourseManage/CreateCoursePage";
import EditCourse from "./pages/admin/CourseManage/EditCourse";
import CourseDetails from "./pages/CourseDetails";
// import { checkCurrentUser } from "./apiCalls/auth";

function App() {
  const dispatch = useDispatch();

  // Load user from localStorage on app initialization
  useEffect(() => {
    loadUserFromStorage(dispatch);
    // dispatch(checkCurrentUser());
  }, [dispatch]);

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<AuthForm />} />
          <Route path="/signup" element={<AuthForm />} />
          <Route path="/instructor-dashboard" element={<DashboardAdmin />} />
          <Route path="/student-dashboard" element={<DashboardStudent />} />
          <Route path="/allcourses" element={<AllCourses />} />
          <Route path="/createCoursePage" element={<CreateCoursePage />} />
          <Route path="/courses/edit/:id" element={<EditCourse />} />
          <Route path="/courseDetails/:id" element={<CourseDetails />} />
        </Routes>

        <Footer />
      </Router>
    </>
  );
}

export default App;
