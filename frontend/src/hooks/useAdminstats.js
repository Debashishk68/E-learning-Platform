// src/hooks/useAdminDashboard.js
import { useQuery } from "@tanstack/react-query";
import { adminStats } from "../apis/adminDashboard";


export default function useAdminStats() {
  return useQuery({
    queryKey: ["adminDashboard"],
    queryFn: adminStats,
  });
}
