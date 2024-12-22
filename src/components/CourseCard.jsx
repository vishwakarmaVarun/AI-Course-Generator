import React, { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaEllipsisVertical } from "react-icons/fa6";
import { IoBookOutline } from "react-icons/io5";
import { dbd } from "../config/dbd";
import { courseList } from "../config/schema";
import { eq } from "drizzle-orm";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { auth } from "../config/firebase";

const CourseCard = ({ userCourse }) => {
  const [active, setActive] = useState(false);

  const toggleActive = () => {
    setActive((prevActive) => !prevActive);
  };

  const handleOnDelete = async () => {
    try {
      await dbd
        .delete(courseList)
        .where(eq(courseList.id, userCourse?.id))
        .returning({ id: courseList.id });

      toast.success("Course Deleted Successfully");
    } catch (error) {
      toast.error("Failed to Delete: " + error.message);
    }
  };

  return (
    <div className="relative shadow-md p-3 rounded-lg duration-150 cursor-pointer border border-red-500 flex flex-col gap-2 bg-gray-800">
      {/* Link to course details */}
      <Link to={`/course/${userCourse?.courseId}`}>
        <img
          src={userCourse?.courseBanner}
          alt="course image"
          className="w-full h-[180px] sm:h-[200px] object-cover rounded-xl"
        />
        <div className="p-2 text-white">
          <h2 className="truncate text-lg font-semibold sm:text-xl">
            {userCourse?.courseOutput?.courseName}
          </h2>
          <p className="text-sm text-red-400 font-medium my-1 sm:my-2">
            {userCourse?.category}
          </p>
          <div className="flex items-center justify-between mt-2">
            <h2 className="flex items-center gap-2 p-1 text-sm rounded-lg shadow shadow-black bg-gray-900">
              <IoBookOutline size={18} color="orange" />{" "}
              {userCourse?.courseOutput?.noOfChapters} Chapters
            </h2>
            <h2 className="text-red-500 text-sm p-1 rounded-lg shadow shadow-black bg-gray-900">
              {userCourse?.level}
            </h2>
          </div>
        </div>
      </Link>

      {/* User profile and dropdown menu */}
      <div className="flex items-center justify-between gap-2 mt-2">
        <div className="flex items-center gap-2">
          <img
            className="w-8 h-8 rounded-full object-cover"
            src={userCourse?.userProfileImage}
            alt="user profile"
          />
          <h2 className="text-sm text-white">{userCourse?.userName}</h2>
        </div>
        {userCourse?.createdBy === auth?.currentUser?.email && (
          <FaEllipsisVertical
            className="text-gray-300 p-2 w-7 h-7 cursor-pointer"
            onClick={toggleActive}
          />
        )}
      </div>

      {/* Delete button (dropdown) */}
      {active && (
        <div className="absolute -bottom-7 right-4">
          <button
            onClick={handleOnDelete}
            className="flex items-center gap-2 bg-red-500 text-white p-2 py-1 rounded-lg shadow-lg"
          >
            <FaRegTrashAlt /> Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default CourseCard;
