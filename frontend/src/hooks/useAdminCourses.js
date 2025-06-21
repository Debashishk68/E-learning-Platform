// src/hooks/useDashboard.js
import { useQuery } from "@tanstack/react-query";
import { showAdminCourses } from "../apis/courseApi";

const useShowAdminCourses = () => {
  return useQuery({
    queryKey: ["courses"],
    queryFn: showAdminCourses,
    onSuccess: (data) => {
      console.log("courses:", data);
    },
    onError: (error) => {
      console.error("courses Error:", error.message);
    },
  });
};

export default useShowAdminCourses;
