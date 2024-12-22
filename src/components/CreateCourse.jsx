import React, { useEffect, useState } from "react";
import DashBoardHeader from "./DashBoardHeader";
import { PiSquaresFourFill } from "react-icons/pi";
import { GenerateCourseLayout } from "../config/aiModel";
import { toast } from "react-toastify";
import { dbd } from "../config/dbd";
import { courseList } from "../config/schema";
import uuid4 from "uuid4";
import { auth, db } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const CreateCourse = () => {
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  const userId = auth.currentUser?.uid;

  useEffect(() => {
    if (!userId) return;
    const getUserData = async () => {
      try {
        const userRef = doc(db, "Users", userId);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setUserData(userSnap.data());
        } else {
          console.log("No user data found");
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    getUserData();
  }, [userId]);

  // stepper option
  const stepperOptions = [
    {
      id: 1,
      name: "Category",
      icon: <PiSquaresFourFill />,
    },
    {
      id: 2,
      name: "Topic & Desc",
      icon: <PiSquaresFourFill />,
    },
    {
      id: 3,
      name: "Options",
      icon: <PiSquaresFourFill />,
    },
  ];

  // select the category
  const category = [
    {
      id: 1,
      name: "Programming",
      image: "/programming.jpeg",
    },
    {
      id: 2,
      name: "Health",
      image: "/health.jpeg",
    },
    {
      id: 3,
      name: "Creativity",
      image: "/creativity.jpg",
    },
  ];

  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(1);
  const [selectCategory, setSelectCategory] = useState("");
  const [topicdesc, setTopicDesc] = useState("");
  const [level, setLevel] = useState("");
  const [duration, setDuration] = useState("");
  const [addVideo, setAddVideo] = useState("");
  const [noofChapter, setNoOfChapter] = useState("");

  const handleNext = async () => {
    // Ensure all required fields are filled before generating course layout
    if (
      (activeIndex === 1 && !selectCategory) ||
      (activeIndex === 2 && !topicdesc) ||
      (activeIndex === 3 && (!level || !duration || !noofChapter))
    ) {
      toast.warning("Please fill in all required fields.");
      return;
    }

    if (activeIndex < stepperOptions.length) {
      setActiveIndex((prev) => prev + 1);
    } else {
      setLoading(true);
      const BASIC_PROMPT =
        "Generate a Course Tutorial on following Detail with field as Course Name, Description, along with Chapter Name, about, Duration: ";
      const USER_INPUT_PROMPT = `Category: ${selectCategory}, Topic: ${topicdesc}, Level: ${level}, Duration: ${duration}, No. of Chapters: ${noofChapter}, in JSON format"`;
      const FINAL_PROMPT = BASIC_PROMPT + USER_INPUT_PROMPT;
      const result = await GenerateCourseLayout.sendMessage(FINAL_PROMPT);
      setLoading(false);
      saveCourseLayoutInDb(JSON.parse(result.response?.text()));
    }
  };

  const handlePrevious = () => {
    if (activeIndex > 1) {
      setActiveIndex((prev) => prev - 1);
    }
  };

  const saveCourseLayoutInDb = async (courseLayout) => {
    var id = uuid4(); // course id
    setLoading(true);
    await dbd.insert(courseList).values({
      courseId: id,
      name: topicdesc,
      level: level,
      includeVideo: addVideo,
      category: selectCategory,
      courseOutput: courseLayout,
      createdBy: userData?.email,
      userName: userData?.name,
      userProfileImage: userData?.avatar,
    });
    setLoading(false);
    navigate(`/created-course/${id}`);
  };

  return (
    <div className="relative">
      <DashBoardHeader />
      {/* Stepper */}
      <div className="flex flex-col justify-center items-center mt-10">
        <h2 className="text-4xl text-orange-500 font-medium">Create Course</h2>
        <div className="flex items-center mt-10 space-x-4">
          {stepperOptions.map((item, index) => (
            <div key={index} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`p-3 rounded-full text-white text-xl flex items-center justify-center w-12 md:w-16 h-12 md:h-16 ${
                    activeIndex >= item.id ? "bg-red-600" : "bg-red-400"
                  }`}
                >
                  {item.icon}
                </div>
                <h2 className="hidden md:block font-medium mt-2 text-white">
                  {item.name}
                </h2>
              </div>
              {index !== stepperOptions.length - 1 && (
                <div
                  className={`h-1 w-12 md:w-24 lg:w-44 ${
                    activeIndex > index + 1 ? "bg-yellow-400" : "bg-yellow-200"
                  } rounded-full mx-2`}
                ></div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="px-10 md:px-20 lg:px-44 mt-10">
        {/* Component */}
        {activeIndex === 1 ? (
          // Select Category component
          <div className="px-10 md:px-20">
            <h2 className="my-5 text-white">Select the Course Category</h2>
            <div className="grid grid-cols-3 gap-10">
              {category.map((item, index) => (
                <div
                  key={index}
                  onClick={() => setSelectCategory(item.name)}
                  className={`flex flex-col p-5 border items-center rounded-xl cursor-pointer ${
                    selectCategory === item.name ? "border-orange-400" : ""
                  }`}
                >
                  <img
                    className="w-20 aspect-square"
                    src={item.image}
                    alt="programming logo"
                  />
                  <h2 className="text-white font-bold text-xl mt-1">
                    {item.name}
                  </h2>
                </div>
              ))}
            </div>
          </div>
        ) : activeIndex === 2 ? (
          // Write the topic or description to know more about course
          <div className="mx-20 md:mx-44">
            <div className="mt-5">
              <label className="text-white">
                💡Write the topic for which you want to generate a course (e.g.
                Python Course, Yoga, etc.)
              </label>
              <input
                type="text"
                value={topicdesc}
                onChange={(e) => setTopicDesc(e.target.value)}
                className="block w-full px-3 py-1 mt-1 border-2 rounded-md border-red-500 outline-2 focus:outline-orange-500"
                placeholder="Topic"
              />
            </div>
            <div className="mt-5">
              <label className="text-white">
                🧠 Tell us more about your course, what you want to include in
                the Course. (Optional)
              </label>
              <textarea
                className="block w-full h-16 px-3 py-1 mt-1 rounded-md border-2 resize-none border-red-500 outline-2 focus:outline-orange-500"
                placeholder="About your course"
              ></textarea>
            </div>
          </div>
        ) : (
          // select the option like level, course duration, video want or not, no of chapters
          <div className="px-10 md:px-20 lg:px-44">
            <div className="grid grid-cols-2 gap-10">
              <div>
                <label className="block text-red-500 font-bold mb-2">
                  🎓 Difficulty Level
                </label>
                <select
                  onChange={(e) => setLevel(e.target.value)}
                  value={level}
                  className="w-full block px-3 py-2 border-2 outline-2 border-red-500 rounded-md shadow-sm shadow-orange-300 focus:outline-orange-500"
                >
                  <option value="Select">Select Difficulty</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advance">Advance</option>
                </select>
              </div>
              <div>
                <label className="block text-red-500 font-bold mb-2">
                  ⏱️ Course Duration
                </label>
                <select
                  onChange={(e) => setDuration(e.target.value)}
                  value={duration}
                  className="w-full block px-3 py-2 border-2 border-red-500 rounded-md shadow-sm shadow-orange-300 focus:outline-orange-500"
                >
                  <option value="Select Hour">Select Hour</option>
                  <option value="1 Hour">1 Hour</option>
                  <option value="2 Hour">2 Hour</option>
                  <option value="More than 3 Hours">More than 3 Hours</option>
                </select>
              </div>
              <div>
                <label className="block text-red-500 font-bold mb-2">
                  📻 Add Video
                </label>
                <select
                  onChange={(e) => setAddVideo(e.target.value)}
                  value={addVideo}
                  className="w-full block px-3 py-2 border-2 border-red-500 rounded-md shadow-sm shadow-orange-300 focus:outline-orange-500"
                >
                  <option value="Select">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div>
                <label className="block text-red-500 font-bold mb-2">
                  📚 No of Chapters
                </label>
                <input
                  type="number"
                  onChange={(e) => setNoOfChapter(e.target.value)}
                  value={noofChapter}
                  className="block w-full px-3 py-2 border-2 rounded-md border-red-500 outline-2 focus:outline-orange-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-10 space-x-4">
          <button
            onClick={handlePrevious}
            disabled={activeIndex === 1}
            className={`px-4 py-2 rounded-md outline-none font-bold text-white ${
              activeIndex === 1 ? "bg-red-300 cursor-not-allowed" : "bg-red-500"
            }`}
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            className={`px-4 py-2 rounded-md outline-none font-bold text-white bg-red-500`}
          >
            {activeIndex === stepperOptions.length
              ? "Generate Course Layout"
              : "Next"}
          </button>
        </div>
      </div>
      {/* loading dialog box */}
      {loading && (
        <div className="absolute top-0 left-0 w-full h-screen bg-black bg-opacity-75 flex items-center justify-center">
          <div className="w-[450px] px-12 py-10 rounded-md flex flex-col items-center gap-2 bg-white">
            <img width={90} src="/loading.gif" alt="loading gif" />
            <p className="font-bold">
              Please wait.... AI is generating your course.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateCourse;
