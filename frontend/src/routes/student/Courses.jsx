import React, { useEffect, useState } from "react";
import Header from "../../components/Client/Header";
import Sidebar from "../../components/Client/Sidebar";
import useShowCourses from "../../hooks/useShowCourses";
import { useNavigate } from "react-router-dom";
import NotLoggedIn from "../../components/Client/NotLoggedIn";

const Courses = () => {
  const { data, isLoading, isSuccess, error, isError } = useShowCourses();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      console.error("Course API Error:", error?.message || error);
    }
  }, [isError, error]);

  if (isError && !error?.isAuthicated) {
    return <NotLoggedIn />;
  }

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery(""); // Clear input after navigation
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 mt-10 overflow-y-auto px-6 py-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">
              Available Courses
            </h1>
            <input
              type="text"
              placeholder="Search by title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearchKeyDown}
              className="px-4 py-2 w-64 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>

          {isLoading && (
            <div className="text-center text-lg text-gray-600">
              Loading courses...
            </div>
          )}

          {isSuccess && data?.courses?.length === 0 && (
            <div className="text-center text-lg text-gray-500">
              No courses found.
            </div>
          )}

          {isSuccess && data?.courses?.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
              {data.courses.map((course) => (
                <div
                  key={course._id}
                  onClick={() => navigate(`/course-detail/${course._id}`)}
                  className="bg-white shadow-md hover:shadow-lg transition duration-300 overflow-hidden border border-gray-100 cursor-pointer"
                >
                  <div className="w-full h-44 overflow-hidden">
                    <img
                      src={
                        course?.thumbnail
                          ? `${import.meta.env.VITE_API_URL}${course.thumbnail}`
                          : "https://source.unsplash.com/400x300/?education,learning"
                      }
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h2 className="text-lg font-semibold text-gray-900">
                      {course.title}
                    </h2>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                      {course.description}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-green-600 font-bold text-sm">
                        ₹{course.price}
                      </span>
                      <button className="text-sm bg-gray-800 text-white px-4 py-1.5 rounded hover:bg-gray-900 transition">
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Courses;
