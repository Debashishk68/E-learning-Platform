import { useQuery } from "@tanstack/react-query";
import { getAdminPayments } from "../apis/payment";


const useAdminPayments = (id) => {
  return useQuery({
    queryKey: ["admin payments"], 
    queryFn:getAdminPayments, 

   
  });
};

export default useAdminPayments;