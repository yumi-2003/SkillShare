import React from "react";
import Hero from "../pages/HomePage/Hero";
import Stats from "../pages/HomePage/Stats";
import CourseCard from "../components/HomePage/CourseCard";

const Home = () => {
  return (
    <section>
      <Hero />
      <Stats />
      <CourseCard />
    </section>
  );
};

export default Home;
