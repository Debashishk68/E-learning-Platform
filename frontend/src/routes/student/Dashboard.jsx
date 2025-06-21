import Header from "../../components/Client/Header";
import Sidebar from "../../components/Client/Sidebar";
import CourseCard from "../../components/Client/CourseCard";
import NotLoggedIn from "../../components/Client/NotLoggedIn";

import { useEffect, useState } from "react";
import useDashboard from "../../hooks/useDashboard";
import { useDispatch } from "react-redux";
import { setName } from "../../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import useGetMyPurchaseCourse from "../../hooks/usemyPurchaseCourses";

const Dashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const { data, isLoading, isError } = useGetMyPurchaseCourse();
  const { mutate: fetchDashboard } = useDashboard();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboard(undefined, {
      onError: (error) => {setIsAuthenticated(false);
        console.log(error)

      },
      onSuccess: (data) => {
        setIsAuthenticated(true);
        if (data?.name) {
          dispatch(setName(data.name));
          localStorage.setItem("name", data.name);
        }
        if (data?.profilePic) {
          localStorage.setItem("profilepic", data.profilePic);
        }
      },
    });
  }, [dispatch, fetchDashboard]);

  if (!isAuthenticated) return <NotLoggedIn />;

  const courses = data?.courses || [];

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto mt-12 p-4">
          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-4">
              My Courses ({courses.length})
            </h2>

            {isLoading ? (
              <div className="text-gray-500">Loading courses...</div>
            ) : courses.length === 0 ? (
              <div className="text-gray-500 text-center mt-8">
                <p className="text-lg font-medium">No courses purchased yet.</p>
                <p className="text-sm mt-1">
                  Please browse our catalog and purchase a course to get started.
                </p>
                <button
                  onClick={() => navigate("/our-courses")}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  Browse Courses
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {courses.map((course) => (
                  <CourseCard
                    key={course._id}
                    course={course}
                    onClick={() => navigate(`/my-course/${course._id}`)}
                  />
                ))}
              </div>
            )}

          
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
