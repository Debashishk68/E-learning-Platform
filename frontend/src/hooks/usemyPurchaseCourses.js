// src/hooks/useGetCourse.js
import { useQuery } from "@tanstack/react-query";
import { myPurchaseCourses } from "../apis/courseApi";

const useGetMyPurchaseCourse = () => {
  return useQuery({
    queryKey: ["mycoursedetails"], 
    queryFn: myPurchaseCourses, 
    onSuccess: (data) => {
      console.log("course:", data);
    },
    onError: (error) => {
      console.error("course error:", error.message);
    },
  });
};

export default useGetMyPurchaseCourse;
