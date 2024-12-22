import React from "react";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { MdAccessTime } from "react-icons/md";

const CourseChapterList = ({ course }) => {
  return (
    <div className="my-10">
      <h2 className="font-bold text-2xl my-3 text-gray-200">Chapters</h2>
      <div className="mt-2 grid grid-cols-1 gap-4">
        {course?.courseOutput?.chapters.map((chapter, index) => (
          <div key={index} className="border p-4 rounded-lg flex items-center justify-between">
            <div className="flex gap-5 items-center">
              <h2 className="text-white p-3 bg-orange-500 rounded-full flex-none">
                {index + 1}
              </h2>
              <div>
                <h2 className="font-medium text-lg text-white">
                  {chapter?.chapterName}
                </h2>
                <p className="text-sm text-slate-300 mb-1">{chapter?.about}</p>
                <p className="flex items-center gap-1 text-orange-400">
                  <MdAccessTime className="text-xl text-red-500" />{" "}
                  {chapter?.duration}
                </p>
              </div>
            </div>
            <IoIosCheckmarkCircleOutline size={30} className="text-green-200 opacity-60 flex-none" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseChapterList;
