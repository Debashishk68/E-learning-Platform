import React, { useEffect } from "react";
import AdminSidebar from "../../components/Admin/AdminSidebar";
import AdminHeader from "../../components/Admin/AdminHeader";
import Courses from "../../components/Admin/Courses";
import useAdminCourses from "../../hooks/useAdminCourses";
import { useNavigate } from "react-router-dom";

const ShowCourses = () => {
  const { data, isError, isSuccess, isLoading } = useAdminCourses();
  const navigate = useNavigate();

  useEffect(() => {
    // if (isSuccess) {
    //   console.log("Courses fetched:", data);
    // }
    if (isError) {
      console.error("Error fetching courses");
    }
  }, [isSuccess, isError, data]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />

      <div className="flex flex-col flex-1 md:pl-60 overflow-hidden">
        <AdminHeader />

        <main className="flex-1 overflow-y-auto p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">📚 All Courses</h2>
          <p className="text-gray-500 mb-6">Manage and view your listed courses below.</p>

          {isLoading ? (
            <p>Loading...</p>
          ) : isError ? (
            <p className="text-red-500">Failed to load courses.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.courses?.map((course) => (
                <Courses 
                onClick={()=>{
                  navigate(`/admin/editcourse/${course._id}`)
                }}
                key={course._id} course={course} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ShowCourses;
