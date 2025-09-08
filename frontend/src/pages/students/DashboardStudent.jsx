import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DashboardStudent = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("SkillShareUser"));
    if (!user || user.role !== "student") {
      navigate("/login"); // redirect to login page
    }
  }, [navigate]);

  return <div>DashboardStudent</div>;
};

export default DashboardStudent;
