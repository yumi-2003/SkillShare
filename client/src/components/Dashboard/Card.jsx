import React from "react";

const Card = ({ title, value, subtitle, icon }) => {
  return (
    <div className="bg-white rounded-2xl shadow p-4 sm:p-6 md:p-8 flex flex-col justify-between h-full">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-gray-600 font-medium text-sm sm:text-base md:text-lg">
            {title}
          </h3>
        </div>
        {icon && <div className="opacity-60">{icon}</div>}
      </div>
      <p className="text-xl sm:text-2xl md:text-3xl font-bold mt-4">{value}</p>
      {subtitle && (
        <p className="text-xs sm:text-sm md:text-base text-gray-500 mt-1">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default Card;
