import { useMutation } from "@tanstack/react-query"
import {registerUser} from "../apis/authService";

const useRegisterUser=()=>{
   return useMutation({
    mutationFn: registerUser,
    mutationKey:"user",
    onSucess:()=>{
        console.log(data);
    },
    onError: (error) => {
        console.error(error);
        
      },
   })
}
export default useRegisterUser