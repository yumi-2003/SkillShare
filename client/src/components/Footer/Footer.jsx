import React from "react";
import SkillShareLogo from "../../assets/skillshare.png";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white mt-auto shadow-inner text-[#064e3b]">
      {/* top section  */}
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-center gap-4">
        <div className="flex items-center gap-2">
          <img src={SkillShareLogo} className="w-10 h-10" alt="Logo" />
          <span className="font-bold text-2xl">IngyinLearn</span>
        </div>

        <div className="flex gap-6 font-medium text-sm">
          <a href="/" className="hover:text-[#10b981] transition">
            Home
          </a>
          <a href="/allcourses" className="hover:text-[#10b981] transition">
            Courses
          </a>
          <a href="/aboutUs" className="hover:text-[#10b981] transition">
            About
          </a>
          <a href="/contactUs" className="hover:text-[#10b981] transition">
            Contact
          </a>
        </div>

        <div className="flex gap-6">
          <a href="#" className="hover:text-[#10b981] transition">
            <Facebook size={20} />
          </a>
          <a href="#" className="hover:text-[#10b981] transition">
            <Twitter size={20} />
          </a>
          <a href="#" className="hover:text-[#10b981] transition">
            <Instagram size={20} />
          </a>
          <a href="#" className="hover:text-[#10b981] transition">
            <Linkedin size={20} />
          </a>
        </div>
      </div>

      {/* bottom section  */}
      <div className="px-4 py-4 text-center text-sm border-t border-[#d1fae5]">
        &copy; 2025 IngyinLearn. Empowering Learners Worldwide
      </div>
    </footer>
  );
};

export default Footer;
