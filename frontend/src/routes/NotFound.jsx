import React from "react";
import { Link } from "react-router-dom";
import error404 from "../assets/Error404.jpg";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-10">
      <div className="max-w-xl text-center">
        <img
          src={error404}
          alt="404 Illustration"
          className="w-full max-h-80 object-contain mx-auto mb-6"
        />
        <h1 className="text-6xl font-extrabold text-blue-600">404</h1>
        <h2 className="mt-4 text-2xl md:text-3xl font-semibold text-gray-800">
          Page Not Found
        </h2>
        <p className="mt-3 text-gray-500 text-base md:text-lg">
          Sorry, we couldn't find the page you're looking for.
        </p>

        <Link
          to="/"
          className="inline-block mt-6 px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-md transition"
        >
           Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
