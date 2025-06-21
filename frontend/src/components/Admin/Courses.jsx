import React from "react";

const Courses = ({ course, onClick }) => {
  return (
    <div
      className="p-6 max-w-sm bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      onClick={onClick}
    >
      <img
        src={course.thumbnail.startsWith("http") ? course.thumbnail : `${import.meta.env.VITE_API_URL}${course.thumbnail}`}
        alt={course.title}
        className="w-full h-48 object-cover rounded-md mb-4"
      />

      <div className="mb-2">
        <h3 className="text-lg font-semibold text-gray-800">{course.title}</h3>
        <p className="text-sm text-gray-500">{course.category}</p>
      </div>

      <div className="mb-2">
        <p className="text-gray-700 line-clamp-3">{course.description}</p>
        <p className="text-sm text-gray-500 mt-1">Instructor: {course.instructor}</p>
      </div>

      <div className="flex justify-between items-center mt-4">
        <span className="text-lg font-bold text-green-600">₹{course.price}</span>
        <span className="text-sm text-gray-500">{course.duration}</span>
      </div>
    </div>
  );
};

export default Courses;
