import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CourseBasicInfo from "../components/CourseBasicInfo";
import { dbd } from "../config/dbd";
import { eq } from "drizzle-orm";
import { courseList } from "../config/schema";
import DashBoardHeader from "../components/DashBoardHeader";

const UserCoursePage = () => {
  const [course, setCourse] = useState(null);
  const { id } = useParams();

  console.log(id)

  useEffect(() => {
    getCourse();
  }, []);

  const getCourse = async () => {
    const result = await dbd
      .select()
      .from(courseList)
      .where(eq(courseList?.courseId, id));

    setCourse(result[0]);
    console.log(result[0]);
  };

  return (
    <>
      <DashBoardHeader />
      <div className="px-10 p-10 md:px-20 lg:px-44">
        <CourseBasicInfo course={course} />
      </div>
    </>
  );
};

export default UserCoursePage;
