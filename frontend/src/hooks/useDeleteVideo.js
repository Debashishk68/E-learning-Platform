import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteVideo } from "../apis/courseApi";

export default function useDeleteVideo() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: deleteVideo,
    mutationKey:["delete"],
    onSuccess: (_data, variables) => {
      // variables contains the object passed to mutate() → { courseId, videoId }
      qc.invalidateQueries(["courseVideos", variables.courseId]);
      qc.invalidateQueries(["courseDetails", variables.courseId]);
    },
  });
}