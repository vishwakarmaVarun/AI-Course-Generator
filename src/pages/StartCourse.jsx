import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { dbd } from "../config/dbd";
import { Chapters, courseList } from "../config/schema";
import { and, eq } from "drizzle-orm";
import ChapterListCard from "../components/ChapterListCard";
import ChapterContent from "../components/ChapterContent";

const StartCourse = () => {
  const [course, setCourse] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [chapterContent, setChapterContent] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    getCourse();
  }, [id]);

  const getCourse = async () => {
    try {
      const result = await dbd
        .select()
        .from(courseList)
        .where(eq(courseList.courseId, id));

      if (result.length > 0) {
        setCourse(result[0]);
      } else {
        console.log("Course not found");
      }
    } catch (error) {
      console.log("Error fetching course:", error.message);
    }
  };

  const getSelectedChapterContent = async (chapterId) => {
    try {
      const result = await dbd
        .select()
        .from(Chapters)
        .where(
          and(
            eq(Chapters.chapterId, chapterId),
            eq(Chapters.courseId, course?.courseId)
          )
        );

      if (result.length > 0) {
        setChapterContent(result[0]);
      } else {
        console.log("Chapter content not found");
      }
    } catch (error) {
      console.log("Error fetching chapter content:", error.message);
    }
  };

  return (
    <div>
      {/* chapter list side bar */}
      <div className="fixed md:w-64 hidden md:block h-screen shadow-black shadow-md overflow-y-auto no-scroll scroll-smooth">
        <h2 className="text-red-400 font-semibold p-3 text-[18px]">
          {course?.courseOutput?.courseName}
        </h2>
        <div>
          {course?.courseOutput?.chapters.map((chapter, index) => (
            <div
              onClick={() => {
                setSelectedChapter(chapter);
                getSelectedChapterContent(index);
              }}  
              key={index}
              className={`hover:bg-black cursor-pointer ${
                selectedChapter?.chapterName === chapter?.chapterName &&
                "bg-black"
              }`}
            >
              <ChapterListCard chapter={chapter} index={index} />
            </div>
          ))}
        </div>
      </div>
      {/* content div */}
      <div className="md:ml-64">
        <ChapterContent chapter={selectedChapter} content={chapterContent} />
      </div>
    </div>
  );
};

export default StartCourse;
