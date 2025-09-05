import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./layout/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AllCourses from "./components/AllCourses/AllCourses";
import Navbar from "./components/HomeComponents/Navbar";
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
          {/* <Route path="/admin/dashboard" element={<DashboardAdmin />} /> */}
          {/* <Route path="/student/dashboard" element={<DashboardStudent />} /> */}
          <Route path="/allcourses" element={<AllCourses />} />
        </Routes>

        <Footer />
      </Router>
    </>
  );
}

export default App;
