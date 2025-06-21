import { useMutation } from "@tanstack/react-query";
import { LogoutUser } from "../apis/authService";

const useLogout = () => {
  return useMutation({
    mutationFn: LogoutUser,
    mutationKey: ['logout'],
   
  });
};

export default useLogout;
