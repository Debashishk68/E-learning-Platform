import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import WatchHeader from "../../components/Client/VideoHeader";
import WatchSidebar from "../../components/Client/VideoSidebar";
import WatchVideoPlayer from "../../components/Client/VideoPlayer";
import useGetCourseVideos from "../../hooks/useGetCourseVideos";
import useGetCourse from "../../hooks/useCourseDetails";
import API_BASE_URL from "../../config/api"; // Make sure this exists and exports base URL

const CoursePlayerPage = () => {
  const { id } = useParams();
  const {
    data: videoData,
    isSuccess,
    isLoading,
    isError,
  } = useGetCourseVideos(id);
  const { data: courseData } = useGetCourse(id);
  const [currentIndex, setCurrentIndex] = useState(0);

  const course = courseData?.courses?.[0];

  useEffect(() => {
    if (isSuccess && videoData?.videos?.length > 0) {
      setCurrentIndex(0);
    }
  }, [isSuccess, videoData]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 text-lg">
        Loading course videos...
      </div>
    );
  }

  if (isError || !videoData?.videos?.length) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 text-lg">
        Failed to load course videos.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <WatchHeader />

      <div className="max-w-7xl mt-20 mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {course && (
          <>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
              {course.title}
            </h2>
            <p className="text-sm text-gray-600 mb-6">by {course.instructor}</p>
          </>
        )}

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <WatchVideoPlayer videoUrl={videoData.videos[currentIndex]?._id} />

            {course?.description && (
              <section className="mt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  About Course
                </h3>
                <p className="text-[15px] text-gray-600 leading-relaxed">
                  {course.description}
                </p>
              </section>
            )}

            {/* 📄 Notes Preview Section */}
            {course?.notes?.path && (
              <section className="mt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Course Notes
                </h3>
                <a
                  href={`${API_BASE_URL}${course.notes.path}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm transition"
                >
                  📄 Notes
                </a>
              </section>
            )}
          </div>

          <WatchSidebar
            videos={videoData.videos}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
          />
        </div>
      </div>
    </div>
  );
};

export default CoursePlayerPage;
