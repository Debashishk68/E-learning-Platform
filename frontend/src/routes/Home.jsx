import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white via-blue-50 to-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 md:px-12 py-4 shadow-sm backdrop-blur bg-white/70 sticky top-0 z-10">
        <div className="text-2xl font-bold text-blue-600">Byway</div>
        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100 transition"
          >
            Log In
          </Link>
          <Link
            to="/signup"
            className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
          >
            Sign Up
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row justify-between items-center px-6 md:px-20 py-24 gap-12">
        {/* Left Content */}
        <div className="max-w-2xl text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight">
            Unlock Your Potential<br />
            with <span className="text-blue-600">Byway</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mt-6">
            Learn at your pace, on your terms. Whether starting out or scaling up, Byway is your trusted learning partner.
          </p>
          <Link
            to="/login"
            className="inline-block mt-8 px-7 py-3 bg-blue-600 text-white text-base rounded-md hover:scale-105 hover:bg-blue-700 transition transform shadow-lg"
          >
            Start Learning Now
          </Link>
        </div>

        {/* Right Feature Card */}
        <div className="max-w-md w-full bg-white/50 backdrop-blur-lg p-6 rounded-xl shadow-xl border border-gray-200 text-center md:text-left">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            🚀 Why Choose Byway?
          </h2>
          <ul className="space-y-4 text-gray-700 text-base leading-relaxed">
            <li>✓ Expert-curated courses with real-world value</li>
            <li>✓ Personalized dashboards to track progress</li>
            <li>✓ 24/7 access from any device, anywhere</li>
            <li>✓ A growing community of 1200+ learners</li>
          </ul>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 py-6 border-t border-gray-200">
        © {new Date().getFullYear()} Byway. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
