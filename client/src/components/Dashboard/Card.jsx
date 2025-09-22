import React from "react";

const Card = ({ title, value, subtitle, icon, color = "blue" }) => {
  const colorClasses = {
    blue: "text-blue-600 border-blue-200",
    green: "text-green-600 border-green-200",
    purple: "text-purple-600 border-purple-200",
    orange: "text-orange-600 border-orange-200",
    pink: "text-pink-600 border-pink-200",
  };

  return (
    <div
      className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-4 sm:p-5 flex flex-col h-full border ${colorClasses[color]} border-opacity-30`}
    >
      {/* Header with icon */}
      <div className="flex justify-between items-center">
        <h3 className="text-gray-700 font-medium text-sm sm:text-base">
          {title}
        </h3>
        {icon && (
          <div
            className={`p-2 rounded-full bg-${color}-50 ${colorClasses[color]}`}
          >
            {icon}
          </div>
        )}
      </div>

      {/* Value */}
      <p className="text-xl sm:text-2xl font-bold mt-3 text-gray-900">
        {value}
      </p>

      {/* Subtitle */}
      {subtitle && (
        <p className="text-xs sm:text-sm text-gray-500 mt-1">{subtitle}</p>
      )}
    </div>
  );
};

export default Card;
