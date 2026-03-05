import React from "react";
import SkillShareLogo from "../../assets/skillshare.png";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[var(--bg-primary)] border-t border-[var(--border-color)] shadow-inner text-[var(--text-primary)] transition-colors duration-300">
      {/* top section  */}
      <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="p-2 bg-emerald-50 dark:bg-emerald-900/30 rounded-xl shadow-sm transition-transform group-hover:scale-110">
            <img src={SkillShareLogo} className="w-10 h-10 object-contain" alt="Logo" />
          </div>
          <span className="font-black text-2xl tracking-tighter">IngyinLearn</span>
        </div>

        <div className="flex flex-wrap justify-center gap-8 font-bold text-sm">
          <a href="/" className="hover:text-[var(--accent-primary)] transition-colors relative after:content-[''] after:absolute after:bottom--1 after:left-0 after:w-0 after:h-0.5 after:bg-[var(--accent-primary)] after:transition-all hover:after:w-full">
            Home
          </a>
          <a href="/allcourses" className="hover:text-[var(--accent-primary)] transition-colors relative after:content-[''] after:absolute after:bottom--1 after:left-0 after:w-0 after:h-0.5 after:bg-[var(--accent-primary)] after:transition-all hover:after:w-full">
            Courses
          </a>
          <a href="/aboutUs" className="hover:text-[var(--accent-primary)] transition-colors relative after:content-[''] after:absolute after:bottom--1 after:left-0 after:w-0 after:h-0.5 after:bg-[var(--accent-primary)] after:transition-all hover:after:w-full">
            About
          </a>
          <a href="/contactUs" className="hover:text-[var(--accent-primary)] transition-colors relative after:content-[''] after:absolute after:bottom--1 after:left-0 after:w-0 after:h-0.5 after:bg-[var(--accent-primary)] after:transition-all hover:after:w-full">
            Contact
          </a>
        </div>

        <div className="flex gap-4">
          {[
            { Icon: Facebook, color: "hover:bg-blue-600" },
            { Icon: Twitter, color: "hover:bg-sky-500" },
            { Icon: Instagram, color: "hover:bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600" },
            { Icon: Linkedin, color: "hover:bg-blue-700" }
          ].map(({ Icon, color }, idx) => (
            <a
              key={idx}
              href="#"
              className={`p-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] hover:text-white transition-all duration-300 shadow-sm ${color} hover:-translate-y-1`}
            >
              <Icon size={18} />
            </a>
          ))}
        </div>
      </div>

      {/* bottom section  */}
      <div className="px-4 py-8 text-center text-xs font-bold text-[var(--text-muted)] border-t border-[var(--border-color)] bg-black/[0.02] dark:bg-white/[0.02]">
        &copy; {new Date().getFullYear()} IngyinLearn. Empowering Learners Worldwide
      </div>
    </footer>
  );
};

export default Footer;
