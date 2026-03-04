import React, { useState, useEffect } from "react";
import { Book, Users, Award, TrendingUp } from "lucide-react";
import Counter from "./Counter";
import axiosInstance from "../../apiCalls/axiosInstance";
import Skeleton from "../../components/ui/Skeleton";

const Stats = () => {
  const [dynamicStats, setDynamicStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axiosInstance.get("/api/stats");
        if (res.data.isSuccess) {
          setDynamicStats(res.data.stats);
        }
      } catch (err) {
        console.error("Failed to fetch stats:", err);
      }
    };
    fetchStats();
  }, []);

  const stats = [
    {
      id: 1,
      icon: <Book className="h-8 w-8 text-blue-500" />,
      value: (dynamicStats && dynamicStats.totalCourses > 0) ? dynamicStats.totalCourses : (dynamicStats ? 120 : <Skeleton width="60px" height="32px" />),
      suffix: (dynamicStats && dynamicStats.totalCourses > 0) ? "+" : (dynamicStats ? "+" : ""),
      label: "Courses Available",
    },
    {
      id: 2,
      icon: <Users className="h-8 w-8 text-blue-500" />,
      value: (dynamicStats && dynamicStats.activeStudents > 0) ? dynamicStats.activeStudents : (dynamicStats ? 5000 : <Skeleton width="60px" height="32px" />),
      suffix: (dynamicStats && dynamicStats.activeStudents > 0) ? "+" : (dynamicStats ? "+" : ""),
      label: "Active Students",
    },
    {
      id: 3,
      icon: <Award className="h-8 w-8 text-blue-500" />,
      value: (dynamicStats && dynamicStats.certificatesIssued > 124) ? dynamicStats.certificatesIssued : (dynamicStats ? 350 : <Skeleton width="60px" height="32px" />),
      suffix: (dynamicStats && dynamicStats.certificatesIssued > 124) ? "+" : (dynamicStats ? "+" : ""),
      label: "Certificates Issued",
    },
    {
      id: 4,
      icon: <TrendingUp className="h-8 w-8 text-blue-500" />,
      value: (dynamicStats && dynamicStats.successRate > 0) ? dynamicStats.successRate : (dynamicStats ? 98 : <Skeleton width="40px" height="32px" />),
      suffix: (dynamicStats && dynamicStats.successRate > 0) ? "%" : (dynamicStats ? "%" : ""),
      label: "Success Rate",
    },
  ];

  return (
    <section className="bg-white py-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
        {stats.map((item) => (
          <div key={item.id} className="flex flex-col items-center">
            <div className="p-4 bg-purple-100 rounded-full">{item.icon}</div>
            <h3 className="text-2xl font-bold  mt-4">
              {typeof item.value === "number" ? (
                <Counter end={item.value} duration={2000} suffix={item.suffix} />
              ) : (
                item.value
              )}
            </h3>
            <p className="text-gray-600 font-medium">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;
