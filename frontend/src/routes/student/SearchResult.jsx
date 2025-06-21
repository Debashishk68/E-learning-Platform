import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Header from "../../components/Client/Header";
import Sidebar from "../../components/Client/Sidebar";
import CourseCard from "../../components/Client/CourseCard";
import useSearchCourses from "../../hooks/useSearchCourses";
import SearchIcon from "../../assets/Search.svg";

const SearchResultsPage = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const queryParam = new URLSearchParams(search).get("query") || "";

  const [searchQuery, setSearchQuery] = useState(queryParam);

  const { data, isLoading, isError, error } = useSearchCourses(queryParam);
  const courses = data?.courses || [];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <main className="flex-1 overflow-y-auto mt-12 p-4">
          {/* 🔍 Search Bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center max-w-md mx-auto mb-6 border border-gray-300 rounded-md px-3 py-2 bg-white shadow-sm"
          >
            <img src={SearchIcon} alt="Search" className="w-4 h-4 mr-2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search courses..."
              className="w-full outline-none text-sm text-gray-800 bg-transparent"
            />
            <button
              type="submit"
              className="ml-2 text-sm text-white bg-blue-600 px-3 py-1.5 rounded hover:bg-blue-700 transition"
            >
              Search
            </button>
          </form>

          <h2 className="text-xl font-semibold mb-4 text-center">
            Search Results for <span className="text-blue-600">"{queryParam}"</span>
          </h2>

          {isLoading ? (
            <p className="text-gray-500 text-center">🔄 Loading courses...</p>
          ) : isError ? (
            <p className="text-red-500 text-center">❌ {error?.message || "Something went wrong."}</p>
          ) : courses.length === 0 ? (
            <div className="text-center text-gray-500 mt-10">
              <p className="text-lg font-medium">No matching courses found.</p>
              <p className="text-sm mt-1">Try searching a different keyword.</p>
              <button
                onClick={() => navigate("/our-courses")}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Browse All Courses
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {courses.map((course) => (
                <CourseCard
                  key={course._id}
                  course={course}
                  onClick={() => navigate(`/course-detail/${course._id}`)}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default SearchResultsPage;
