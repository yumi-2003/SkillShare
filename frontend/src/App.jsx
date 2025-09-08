import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./layout/Home";
import AllCourses from "./components/AllCourses/AllCourses";
import Navbar from "./components/HomeComponents/Navbar";
import Footer from "./components/Footer/Footer";
import AuthForm from "./components/Auth/AuthForm";
import DashboardAdmin from "./pages/admin/DashboardAdmin";
import DashboardStudent from "./pages/students/DashboardStudent";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<AuthForm />} />
          <Route path="/signup" element={<AuthForm />} />
          <Route path="/instructor-dashboard" element={<DashboardAdmin />} />
          <Route path="/student-dashbaord" element={<DashboardStudent />} />
          <Route path="/allcourses" element={<AllCourses />} />
        </Routes>

        <Footer />
      </Router>
    </>
  );
}

export default App;
