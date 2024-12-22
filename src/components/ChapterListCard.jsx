import React from "react";
import { FaRegClock } from "react-icons/fa";

const ChapterListCard = ({ chapter, index }) => {
  return (
    <div className="grid grid-cols-5 items-center p-4">
      <div>
        <h2 className="p-1 bg-orange-500 h-8 w-8 text-center text-white rounded-full">
          {index + 1}
        </h2>
      </div>  
      <div className="col-span-4">
        <h2 className="text-white font-medium">{chapter?.chapterName}</h2>
        <h2 className="text-gray-400 text-sm flex items-center gap-1">
          <FaRegClock />
          {chapter?.duration}
        </h2>
      </div>
    </div>
  );
};

export default ChapterListCard;
