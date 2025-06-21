import API_BASE_URL from "../../config/api";

const CourseCard = ({ course ,onClick }) => {
  return (
    <div 
    onClick={onClick}
    className="rounded-lg p-3 shadow-sm hover:shadow-md transition">
      <img src={`${API_BASE_URL}${course.thumbnail}`} alt={course.title} className="rounded-md mb-2" />
      <h3 className="font-semibold text-sm">{course.title}</h3>
      <p className="text-xs text-gray-500">By {course.instructor}</p>
      {/* <div className="mt-2 text-yellow-500 text-sm">
        {"★".repeat(course.rating)}
        <span className="text-gray-600 ml-1 text-xs">
          ({course.reviews} Ratings)
        </span>
      </div> */}
    </div>
  );
};

export default CourseCard;
