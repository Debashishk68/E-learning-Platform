// hooks/useDeleteUser.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUserApi } from "../apis/userProfileEdit";

export default function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUserApi,
    onSuccess: () => {
      // Invalidate or refetch relevant user data here
      queryClient.invalidateQueries(["users"]); // Adjust as per your query keys
    },
  });
}
