import React from "react";
import Hero from "../pages/homePage/Hero";
import Stats from "../pages/homePage/Stats";
import CourseCard from "../components/HomeComponents/CourseCard";
import AboutUs from "../pages/homePage/AboutUs";
import ContactUs from "../pages/homePage/ContactUs";

const Home = () => {
  return (
    <section>
      <Hero />
      <Stats />
      <AboutUs />
      <CourseCard />
      <ContactUs />
    </section>
  );
};

export default Home;
