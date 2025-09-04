import React from "react";
import SkillShareLogo from "../../assets/skillshare.png";

const Footer = () => {
  return (
    <div className="w-full mt-auto bg-white shadow-inner ">
      <div className="px-4 py-3 flex items-center justify-center gap-2 w-full">
        <img src={SkillShareLogo} className="w-8 h-8" />
        <span className="font-bold text-xl text-blue-800">SkillShare</span>
      </div>

      <p className="px-4 py-3 flex items-center justify-center w-full bg-white text-lg text-gray-60">
        &copy;2025 SkillShare. Empowering Learners Worldwide
      </p>
    </div>
  );
};

export default Footer;
