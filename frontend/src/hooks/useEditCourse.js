import { useMutation } from "@tanstack/react-query";
import { editCourse } from "../apis/courseApi";

export default function useEditCourse() {
  return useMutation({
    mutationFn: ({ id, formData }) => editCourse({ id, formData }),
    mutationKey: ["edit"],
  });
}
