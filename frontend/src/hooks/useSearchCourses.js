import { useQuery } from "@tanstack/react-query";
import { searchCourses } from "../apis/courseApi";

const useSearchCourses = (query) => {
  return useQuery({
    queryKey: ["searchCourses", query],
    queryFn: () => searchCourses(query),
    enabled: !!query, // only run when query is not empty
  });
};

export default useSearchCourses;
