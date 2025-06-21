// src/hooks/useUserEditProfile.js
import { useMutation } from "@tanstack/react-query";
import { editProfileApi } from "../apis/userProfileEdit";

const useUserEditProfile = () => {
  return useMutation({
    mutationFn: editProfileApi,
   
  });
};

export default useUserEditProfile;
