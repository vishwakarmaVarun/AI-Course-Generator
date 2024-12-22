import React from "react";
import { BsBarChart } from "react-icons/bs";
import { MdAccessTime, MdOutlinePlayCircleOutline } from "react-icons/md";
import { IoBookOutline } from "react-icons/io5";

const CourseDetails = ({ course }) => {
  return (
    <div className="border p-6 rounded-xl shadow-sm mt-3">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="flex gap-2 items-center">
          <BsBarChart className="text-4xl text-red-500" />
          <div>
            <h2 className="text-xs text-gray-500 font-medium">Skill Level</h2>
            <h2 className="font-medium text-gray-400 text-lg">
              {course?.courseOutput?.level}
            </h2>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <MdAccessTime className="text-4xl text-red-500" />
          <div>
            <h2 className="text-xs text-gray-500 font-medium">Duration</h2>
            <h2 className="font-medium text-gray-400 text-lg">
              {course?.courseOutput?.duration}
            </h2>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <IoBookOutline className="text-4xl text-red-500" />
          <div>
            <h2 className="text-xs text-gray-500 font-medium">Chapters</h2>
            <h2 className="font-medium text-gray-400 text-lg">
              {course?.courseOutput?.noOfChapters}
            </h2>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <MdOutlinePlayCircleOutline className="text-4xl text-red-500" />
          <div>
            <h2 className="text-xs text-gray-500 font-medium">
              Video Included?
            </h2>
            <h2 className="font-medium text-gray-400 text-lg">
              {course?.includeVideo}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
