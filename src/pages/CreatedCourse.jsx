import React, { useEffect, useState } from "react";
import DashBoardHeader from "../components/DashBoardHeader";
import { useNavigate, useParams } from "react-router-dom";
import { dbd } from "../config/dbd";
import { Chapters, courseList } from "../config/schema";
import { and, eq } from "drizzle-orm";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import CourseBasicInfo from "../components/CourseBasicInfo";
import CourseDetails from "../components/CourseDetails";
import CourseChapterList from "../components/CourseChapterList";
import { generateChapterContent_AI } from "../config/aiModel";
import { ImSpinner } from "react-icons/im";
import { getVideos } from "../config/services";
import { toast } from "react-toastify";

const CreatedCourse = () => {
  const [userData, setUserData] = useState({});
  const [course, setCourse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const userId = auth.currentUser?.uid;
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) return;

    const getUserData = async () => {
      try {
        const userRef = doc(db, "Users", userId);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setUserData(userSnap.data());
        } else {
          toast.error("No user data found");
        }
      } catch (error) {
        setError("Error fetching user data");
      }
    };

    getUserData();
  }, [userId]);

  useEffect(() => {
    const getCourse = async () => {
      if (id && userData?.email) {
        try {
          const result = await dbd
            .select()
            .from(courseList)
            .where(
              and(
                eq(courseList.courseId, id),
                eq(courseList.createdBy, userData?.email)
              )
            );

          if (result.length === 0) {
            console.log("No course found");
          } else {
            setCourse(result[0]);
            console.log(result);
          }
        } catch (error) {
          setError("Error fetching course data");
          console.error("Error fetching course:", error);
        }
      }
    };

    getCourse();
  }, [id, userData?.email]);

  // to write functionality to generate course content
  const generateChapterContent = () => {
    setLoading(true);
    const chapters = course?.courseOutput?.chapters;
    chapters.forEach(async (chapter, index) => {
      const PROMPT = `Explain the concept in Detail on Topic: ${course?.name},Chapter: ${chapter.chapterName}, in JSON format with list of array with field as title, explanation on given chapter in detail, Code example(Code Field in <precode> format) if applicable`;

      try {
        let videoId = "";

        // generate video url
        getVideos(course?.name + ":" + chapter?.chapterName).then((resp) => {
          console.log(resp);
          videoId = resp[0]?.id?.videoId;
        });

        const result = await generateChapterContent_AI.sendMessage(PROMPT);
        console.log(result?.response?.text());
        const content = JSON.parse(result?.response?.text());

        await dbd.insert(Chapters).values({
          chapterId: index,
          courseId: course?.courseId,
          content: content,
          videoId: videoId,
        });

        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }

      await dbd.update(courseList).set({
        publish: true,
      });
      navigate(`/created-course/${course?.courseId}/finish`);
    });
  };

  return (
    <>
      <DashBoardHeader />
      <div className="relative mt-10 px-7 md:px-20 lg:px-44">
        <h2 className="font-bold text-center text-3xl text-orange-600">
          Course Layout
        </h2>

        {/* Basic Info */}
        <CourseBasicInfo course={course} />

        {/* Course Details */}
        <CourseDetails course={course} />

        {/* List of Lesson */}
        <CourseChapterList course={course} />

        <button
          onClick={generateChapterContent}
          className={`p-4 px-6 text-white font-semibold rounded-lg text-sm mb-6 transition duration-300 ease-in-out transform ${
            loading ? "bg-red-400" : "bg-red-600"
          } hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-red-300`}
        >
          Generate Course Content{" "}
          {loading && (
            <ImSpinner size={20} className="inline-block animate-spin" />
          )}
        </button>
      </div>
    </>
  );
};

export default CreatedCourse;
