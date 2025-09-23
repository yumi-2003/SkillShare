import React from "react";
import { Code, Network, Award, Laptop, Users, Briefcase } from "lucide-react";

const features = [
  {
    icon: <Code size={24} className="text-[#059669]" />,
    title: "Hands-on Coding",
    description:
      "Master programming with practical projects in Python, Java, C++, and more.",
  },
  {
    icon: <Network size={24} className="text-[#059669]" />,
    title: "Networking Labs",
    description:
      "Gain real-world networking skills with labs on Cisco, cloud computing, and cybersecurity.",
  },
  {
    icon: <Award size={24} className="text-[#059669]" />,
    title: "Industry Certificates",
    description:
      "Earn recognized certifications to validate your expertise and boost your career.",
  },
  {
    icon: <Laptop size={24} className="text-[#059669]" />,
    title: "Flexible Learning",
    description:
      "Study anytime, anywhere with structured online courses and resources.",
  },
  {
    icon: <Users size={24} className="text-[#059669]" />,
    title: "Community Support",
    description:
      "Collaborate with peers, share knowledge, and work on real-life projects together.",
  },
  {
    icon: <Briefcase size={24} className="text-[#059669]" />,
    title: "Career Preparation",
    description:
      "Get guidance on internships, job placements, and career advancement in IT fields.",
  },
];
console.log("feature", features);

const AboutUs = () => {
  return (
    <div className="bg-white py-16 px-6 lg:px-12 ">
      {/* header  */}
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-3xl lg:text-4xl font-bold text-[#064e3b]">
          Why Choose <span className="text-[#059669]">SkillShare</span>?
        </h2>
        <p className="text-[#065f46] mt-2">
          We provide everything you need to excel in Computer Science and
          Networking.
        </p>
      </div>
      {/* featured cards  */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition cursor-pointer border border-[#DBEAFE]"
          >
            <div className="w-12 h-12 flex items-center justify-center bg-[#DBEAFE] rounded-md mb-4">
              {/* Make icon blue instead of green */}
              <div className="text-[#2563EB]">{feature.icon}</div>
            </div>
            <h3 className="font-semibold text-lg text-[#064e3b] mb-2">
              {feature.title}
            </h3>
            <p className="text-[#065f46] text-sm">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;
