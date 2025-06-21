// src/hooks/useGetCourse.js
import { useQuery } from "@tanstack/react-query";
import { getCourseDetail } from "../apis/courseApi";

const useGetCourse = (id) => {
  return useQuery({
    queryKey: ["coursedetails", id], 
    queryFn: () => getCourseDetail(id), 
    enabled: !!id, 
    onSuccess: (data) => {
      console.log("course:", data);
    },
    onError: (error) => {
      console.error("course error:", error.message);
    },
  });
};

export default useGetCourse;
