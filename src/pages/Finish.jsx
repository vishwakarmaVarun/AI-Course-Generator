import React, { useEffect, useState } from "react";
import DashBoardHeader from "../components/DashBoardHeader";
import { useParams } from "react-router-dom";
import { auth, db } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { dbd } from "../config/dbd";
import { courseList } from "../config/schema";
import { and, eq } from "drizzle-orm";
import CourseBasicInfo from "../components/CourseBasicInfo";

const Finish = () => {
  const [userData, setUserData] = useState({});
  const [course, setCourse] = useState([]);
  const userId = auth.currentUser?.uid;
  const { id } = useParams();

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
  }, []);

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
          console.error("Error fetching course:", error);
        }
      }
    };

    getCourse();
  }, [id, userData?.email]);

  return (
    <>
      <DashBoardHeader />
      <div className="px-10 md:px-20 lg:px-44 my-7">
        <h2 className="text-center font-bold text-white my-2 text-xl">
          Congrats 👍 <span className="text-red-500">Your course is Ready</span>
        </h2>
        <CourseBasicInfo course={course} />
      </div>
    </>
  );
};

export default Finish;
