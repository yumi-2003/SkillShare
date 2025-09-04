import React from "react";
import HeroImg from "../../assets/hero-img.png";

const Hero = () => {
  return (
    <div className="bg-gradient-to-r from-blue-400 to-blue-500 text-white mt-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10 flex flex-col lg:flex-row items-stretch justify-between">
        {/* Text Content */}
        <div className="lg:w-1/2 flex flex-col justify-center text-center lg:text-left">
          <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-4">
            Learn Anytime, <span className="text-yellow-300">Anywhere</span>,
            For Free
          </h1>
          <p className="text-base lg:text-lg mb-6">
            Access affordable courses created by experts. Join now and start
            your journey today.
          </p>
          <div className="flex justify-center lg:justify-start gap-3">
            <button className="bg-yellow-400 text-black px-5 py-2 rounded-lg font-semibold shadow hover:bg-yellow-300">
              Get Started
            </button>
            <button className="bg-white text-blue-700 px-5 py-2 rounded-lg font-semibold hover:bg-gray-100">
              Explore Courses
            </button>
          </div>
        </div>

        {/* Image Content */}
        <div className="md:w-1/2 flex justify-center items-center mt-8 lg:mt-0">
          <img
            src={HeroImg}
            alt="Picture"
            className="w-52 md:w-64 drop-shadow-2xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
