// src/hooks/useDashboard.js
import { useMutation } from "@tanstack/react-query";
import { adminDashboardApi } from "../apis/adminDashboard";

const useGetAdminDashboard = () => {
  return useMutation({
    mutationKey: ["dashboard"],
    mutationFn: adminDashboardApi,
    onSuccess: (data) => {
      localStorage.setItem("name",data.name)
    },
    onError: (error) => {
      console.error("Dashboard Error:", error.message);
    },
  });
};

export default useGetAdminDashboard;
