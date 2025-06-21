import React from "react";
import { FaPlayCircle, FaLock } from "react-icons/fa";

const VideoSidebar = ({ videos, currentIndex, setCurrentIndex }) => {
  return (
    <aside className="w-full lg:w-72 bg-white rounded-xl border border-gray-200 shadow p-4 h-fit max-h-[80vh] overflow-y-auto">
      <h3 className="font-semibold text-lg text-gray-800 mb-4">
        📚 Course Content
      </h3>

      <ul className="space-y-3">
        {videos.map((video, index) => {
          const isActive = currentIndex === index;
          const isLocked = video.locked;

          return (
            <li
              key={index}
              onClick={() => !isLocked && setCurrentIndex(index)}
              className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition group
                ${isActive ? "bg-blue-100 text-blue-700 font-semibold" : "hover:bg-gray-100"}
                ${isLocked ? "cursor-not-allowed opacity-60" : ""}
              `}
            >
              <div className="flex items-center gap-3">
                {isLocked ? (
                  <FaLock className="text-gray-400 text-lg" />
                ) : (
                  <FaPlayCircle className="text-blue-500 text-lg group-hover:scale-105 transition" />
                )}
                <span className="truncate max-w-[140px]">
                  {video.title}
                </span>
              </div>
              <span className="text-sm text-gray-500 shrink-0">
                {video.duration}
              </span>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default VideoSidebar;
