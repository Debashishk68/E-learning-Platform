import React from "react";

const TopLoader = ({ loading }) => {
  return (
    <div className="fixed top-0 left-0 w-full z-50">
      {loading && (
        <div className="h-1 bg-black animate-loader" />
      )}
    </div>
  );
};

export default TopLoader;
