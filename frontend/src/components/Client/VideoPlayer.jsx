import React, { useRef, useEffect } from "react";
import API_BASE_URL from "../../config/api";

const VideoPlayer = ({ videoUrl }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load(); // Reload video when videoUrl changes
    }
  }, [videoUrl]);

  return (
    <div className="relative w-full pb-[56.25%] rounded-xl overflow-hidden shadow bg-black">
      <video
        ref={videoRef}
        controls
        controlsList="nodownload"
        className="absolute top-0 left-0 w-full h-full object-contain rounded-xl"
      >
        <source
          src={`${API_BASE_URL}/dashboard/video/stream/${videoUrl}`}
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
