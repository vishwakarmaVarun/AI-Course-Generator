import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen flex-col">
      <div className="w-14 h-14 mb-5 border-2 border-gray-500 rounded-full animate-spin"></div>
      <p className="text-xl text-gray-500">Loading...</p>
    </div>
  );
};

export default Loading;
