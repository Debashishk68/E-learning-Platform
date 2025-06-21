import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCourse } from "../apis/courseApi";

export default function useDeleteCourse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCourse,   
    onSuccess: () => {
      queryClient.invalidateQueries(["adminCourses"]);
    },
  });
}
