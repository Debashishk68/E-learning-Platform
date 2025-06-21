import { useMutation } from "@tanstack/react-query";
import { LoginUser } from "../apis/authService";
import { useDispatch } from "react-redux";
import { setName, setProfileImg } from "../features/user/userSlice"

const useLogin = () => {
  const dispatch = useDispatch()
  return useMutation({
    mutationFn: LoginUser,
    mutationKey: ['user'],
    onSuccess: (data) => {
        console.log(data)
        dispatch(setName(data.name));
        dispatch(setProfileImg(data.profilepic))
        localStorage.setItem("userId",data.userId)
        localStorage.setItem("profilepic",data.profilepic)
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });
};

export default useLogin;
