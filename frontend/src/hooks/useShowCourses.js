// src/hooks/useDashboard.js
import { useQuery } from "@tanstack/react-query";
import { showCourses } from "../apis/courseApi";

const useShowCourse = () => {
  return useQuery({
    queryKey: ["showcourses"],
    queryFn: showCourses,
    onSuccess: (data) => {
      console.log("courses:", data);
    },
    onError: (error) => {
      console.error("courses Error:", error.message);
    },
  });
};

export default useShowCourse;
