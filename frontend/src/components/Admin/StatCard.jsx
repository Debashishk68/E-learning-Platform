import React from "react";

const StatCard = ({ title, value }) => (
  <div className="bg-white p-5 rounded-lg shadow hover:shadow-md transition">
    <p className="text-gray-600 text-sm">{title}</p>
    <h3 className="text-2xl font-bold text-gray-900 mt-2">{value}</h3>
  </div>
);

export default StatCard;
