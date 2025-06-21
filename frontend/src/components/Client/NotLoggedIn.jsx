// components/Client/NotLoggedIn.jsx
import React from "react";
import { Link } from "react-router-dom";

const NotLoggedIn = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white px-4">
      <h1 className="text-2xl font-semibold text-gray-800">Access Denied</h1>
      <p className="text-gray-600 mt-2 mb-6 text-center">
        You must be logged in to view this page.
      </p>
      <Link
        to="/login"
        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Go to Login
      </Link>
    </div>
  );
};

export default NotLoggedIn;
