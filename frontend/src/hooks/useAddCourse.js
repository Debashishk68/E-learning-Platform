import { useMutation } from "@tanstack/react-query";
import { addCourseApi } from "../apis/courseApi";
import { toast } from "react-toastify";

const useAddCourse = () => {
  return useMutation({
    mutationFn: addCourseApi,
    onError: (error) => {
      toast.error(`❌ ${error.message}`);
    },
  });
};

export default useAddCourse;
