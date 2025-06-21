import React, { useState, useEffect } from "react";
import AdminSidebar from "../../components/Admin/AdminSidebar";
import AdminHeader from "../../components/Admin/AdminHeader";
import StatCard from "../../components/Admin/StatCard";
import FilterDropdown from "../../components/Admin/FilterDrop";
import StudentTable from "../../components/Admin/StudentTable";
import useAdminDashboard from "../../hooks/useAdminDashboard";
import useAdminStats from "../../hooks/useAdminstats";
import NotLoggedIn from "../../components/Client/NotLoggedIn";

const AdminLayout = () => {
  const [filter, setFilter] = useState("All");

  // 🔐 Auth check: only validates if admin is logged in
  const {
    mutate: fetchDashboard,
    isLoading: authLoading,
    isError: authError,
    error: authErrorMsg,
  } = useAdminDashboard();

  // 📊 Actual dashboard statistics (students + stats)
  const {
    data: stats,
    isLoading: statsLoading,
    isError: statsError,
    error: statsErrorMsg,
  } = useAdminStats();

  // Fetch login info only once
  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  // 🌀 Loading state
  if (authLoading || statsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading admin dashboard...
      </div>
    );
  }

  // ❌ Not authenticated or error while fetching stats
  if (authError || statsError) {
    console.error("Error:", authErrorMsg?.message || statsErrorMsg?.message);
    return <NotLoggedIn />;
  }

  return (
    <div className="flex min-h-screen bg-gray-100 md:pl-60">
      <AdminSidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <AdminHeader />
        <main className="flex-1 overflow-y-auto p-6">
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">Dashboard Overview</h2>
              <FilterDropdown
                options={["All", "2025 Batch", "2024 Batch"]}
                value={filter}
                onChange={setFilter}
              />
            </div>

            {/* 📊 Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard title="Total Students" value={stats?.totalStudents || 0} />
              <StatCard title="New Admissions" value={stats?.newAdmissions || 0} />
              <StatCard title="Active Courses" value={stats?.activeCourses || 0} />
              <StatCard title="Revenue (₹)" value={stats?.revenue || 0} />
            </div>

            {/* 👨‍🎓 Students Table */}
            <StudentTable students={stats?.students || []} filter={filter} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
