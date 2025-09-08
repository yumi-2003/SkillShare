import React from "react";

const Card = ({ title, value, subtitle, icon }) => {
  return (
    <div className="bg-white rounded-2xl shadow p-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-gray-600 font-medium">{title}</h3>
        </div>
        {icon && <div className="opacity-60">{icon}</div>}
      </div>
      <p className="text-2xl font-bold mt-4">{value}</p>
      {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
    </div>
  );
};

export default Card;
