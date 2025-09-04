import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./layout/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import DashboardAdmin from "./pages/DashboardAdmin";
import DashboardStudent from "./pages/DashboardStudent";
import CourseDetail from "./pages/CourseDetail";
import Navbar from "./components/HomePage/Navbar";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <>
      <Router>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin/dashboard" element={<DashboardAdmin />} />
          <Route path="/student/dashboard" element={<DashboardStudent />} />
          <Route path="/coursedetail" element={<CourseDetail />} />
        </Routes>

        <Footer />
      </Router>
    </>
  );
}

export default App;
