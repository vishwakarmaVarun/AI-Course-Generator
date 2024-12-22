import React, { useEffect, useState } from "react";
import { BiEdit, BiSolidCategoryAlt } from "react-icons/bi";
import { dbd } from "../config/dbd";
import { courseList } from "../config/schema";
import { eq } from "drizzle-orm";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../config/firebase";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const CourseBasicInfo = ({ course }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedCourse, setEditedCourse] = useState({
    courseName: "",
    description: "",
  });
  const [selectedFile, setSelectedFile] = useState("");
  useEffect(() => {
    if (course) {
      setSelectedFile(course?.courseBanner);
    }
  }, [course]);

  useEffect(() => {
    if (isEditing && course) {
      setEditedCourse({
        courseName: course?.courseOutput?.courseName || "",
        description: course?.courseOutput?.description || "",
        category: course?.category || "",
      });
    }
  }, [isEditing, course]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleClose = () => {
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedCourse({ ...editedCourse, [name]: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    course.courseOutput.courseName = editedCourse.courseName;
    course.courseOutput.description = editedCourse.description;
    try {
      await dbd
        .update(courseList)
        .set({
          courseOutput: course?.courseOutput,
        })
        .where(eq(courseList?.id, course?.id));

      setIsEditing(false);
    } catch (error) {
      console.error("Failed to fetch and Update the Course", error);
      toast.error("Failed to Update Course" + error.message);
    }
  };

  const onFileSelected = async (e) => {
    const file = e.target.files[0];
    console.log(file);
    setSelectedFile(URL.createObjectURL(file));
    const fileName = `${Date.now()}_${file.name}`;
    const storageRef = ref(storage, "ai-course/" + fileName);
    await uploadBytes(storageRef, file)
      .then((snapshot) => {
        toast.success("Upload File Complete");
      })
      .then((resp) => {
        getDownloadURL(storageRef).then(async (downloadUrl) => {
          await dbd
            .update(courseList)
            .set({
              courseBanner: downloadUrl,
            })
            .where(eq(courseList.id, course?.id));
        });
      });
  };

  return (
    <div className="p-6 sm:p-8 md:p-10 border rounded-xl shadow-sm mt-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-white font-bold text-2xl sm:text-3xl flex items-center justify-between">
            {course?.courseOutput?.courseName}
            <button
              className="text-gray-400 hover:text-yellow-500 transition duration-300"
              onClick={handleEditClick}
            >
              <BiEdit size={24} />
            </button>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            {course?.courseOutput?.description}
          </p>
          <h2 className="font-medium mt-3 flex gap-2 items-center text-[16px] sm:text-[17px] text-red-500">
            <BiSolidCategoryAlt /> {course?.category}
          </h2>
          <Link to={`/course/${course?.courseId}/start`}>
            <button className="w-full bg-yellow-500 border border-yellow-500 outline-none hover:text-yellow-500 mt-6 rounded-lg font-bold hover:bg-transparent p-3 transition duration-300 ease-in-out">
              Start
            </button>
          </Link>
        </div>
        <div className="flex justify-center">
          <label htmlFor="upload-image" className="w-full">
            <img
              width={300}
              className="w-full h-full max-w-xs sm:max-w-sm md:max-w-full object-cover rounded-xl cursor-pointer"
              src={
                selectedFile
                  ? selectedFile
                  : "https://cdn.pixabay.com/photo/2015/11/19/21/10/glasses-1052010_640.jpg"
              }
              alt="Course"
            />
          </label>
          <input
            type="file"
            id="upload-image"
            className="hidden"
            onChange={onFileSelected}
          />
        </div>
      </div>

      {/* Modal for editing course details */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg w-11/12 md:w-1/2 lg:w-1/3">
            <h2 className="text-xl font-bold mb-4">Edit Course Details</h2>
            <div className="mb-4">
              <label className="block font-medium">Course Name</label>
              <input
                type="text"
                name="courseName"
                value={editedCourse.courseName}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium">Description</label>
              <textarea
                name="description"
                value={editedCourse.description}
                onChange={handleInputChange}
                className="w-full h-44 resize-none p-2 border rounded-lg"
              />
            </div>
            <div className="flex justify-end gap-4">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                onClick={handleClose}
              >
                Cancel
              </button>
              <button
                className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
                onClick={handleUpdate}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseBasicInfo;
