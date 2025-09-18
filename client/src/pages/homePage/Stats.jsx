import React, { useEffect, useState } from "react";
import { Book, Users, Award, TrendingUp } from "lucide-react";
import Counter from "./Counter";

const Stats = () => {
  //mock data
  const stats = [
    {
      id: 1,
      icon: <Book className="h-8 w-8 text-blue-500" />,
      value: "500",
      suffix: "+",
      label: "Courses Available",
    },
    {
      id: 2,
      icon: <Users className="h-8 w-8 text-blue-500" />,
      value: "500",
      suffix: "+",
      label: "Active Students",
    },
    {
      id: 3,
      icon: <Award className="h-8 w-8 text-blue-500" />,
      value: "25000",
      suffix: "+",
      label: "Certificates Issued",
    },
    {
      id: 4,
      icon: <TrendingUp className="h-8 w-8 text-blue-500" />,
      value: "94",
      suffix: "%",
      label: "Success Rate",
    },
  ];

  return (
    <section className="bg-gray-50 py-12 shadow">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
        {stats.map((item) => (
          <div key={item.id} className="flex flex-col items-center">
            <div className="p-4 bg-purple-100 rounded-full">{item.icon}</div>
            <h3 className="text-2xl font-bold  mt-4">
              <Counter end={item.value} duration={2000} suffix={item.suffix} />
            </h3>
            <p className="text-gray-600">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;
