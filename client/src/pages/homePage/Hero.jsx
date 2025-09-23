import React from "react";
import HeroImg from "../../assets/hero2.jpg";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="bg-white text-black mt-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10 flex flex-col lg:flex-row items-stretch justify-between">
        {/* Text Content */}
        <div className="lg:w-2/3 flex flex-col justify-center text-center lg:text-left">
          <h1 className="text-4xl lg:text-5xl leading-tight mb-4">
            Learn Anytime, <span className="text-yellow-300">Anywhere</span>,
            For Free
          </h1>
          <p className="text-base lg:text-lg mb-6">
            Access affordable courses created by experts. Join now and start
            your journey today.
          </p>
          <div className="flex justify-center lg:justify-start gap-4">
            <Link
              to={"/signup"}
              className="bg-[#10b981] nav-link-white px-6 py-3 rounded-lg font-semibold shadow-lg"
            >
              Get Started
            </Link>
            <Link
              to="/allcourses"
              className="bg-white text-[#059669] px-6 py-3 rounded-lg font-semibold shadow"
            >
              Explore Courses
            </Link>
          </div>
        </div>

        {/* Image Content */}
        <div className="md:w-1/3 flex justify-center items-center mt-8 lg:mt-0">
          <img
            src={HeroImg}
            alt="Learning"
            className="w-80 md:w-96 rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
