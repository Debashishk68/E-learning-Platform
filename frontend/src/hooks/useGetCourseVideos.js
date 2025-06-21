// src/hooks/useGetCourse.js
import { useQuery } from "@tanstack/react-query";
import { getVideoDetails } from "../apis/courseApi";

const useGetCourseVideos = (id) => {
  return useQuery({
    queryKey: ["Videodetails", id], 
    queryFn: () => getVideoDetails(id), 
    enabled: !!id, 
    onSuccess: (data) => {
      console.log("course:", data);
    },
    onError: (error) => {
      console.error("course error:", error.message);
    },
  });
};

export default useGetCourseVideos;
