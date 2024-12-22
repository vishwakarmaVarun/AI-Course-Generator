import React, { useEffect, useState } from "react";
import { dbd } from "../config/dbd";
import { courseList } from "../config/schema";
import { eq } from "drizzle-orm";
import { auth, db } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import CourseCard from "./CourseCard";
import { toast } from "react-toastify";

const UserCourseList = () => {
  const [userData, setUserData] = useState({});
  const [userCourses, setUserCourses] = useState([]);
  const [error, setError] = useState(null); // State to track errors
  const [loading, setLoading] = useState(true); // Loading state
  const userId = auth.currentUser?.uid;

  useEffect(() => {
    if (!userId) return; // Early return if no userId

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
        setError("Failed to fetch user data");
      }
    };

    getUserData();
  }, [userId]);

  useEffect(() => {
    if (!userData.email) return; // Early return if no email

    const getUserCourses = async () => {
      try {
        setLoading(true); // Start loading
        const result = await dbd
          .select()
          .from(courseList)
          .where(eq(courseList?.createdBy, userData?.email));

        setUserCourses(result);
      } catch (error) {
        setError("Failed to fetch courses");
      } finally {
        setLoading(false); // End loading
      }
    };

    getUserCourses();
  }, [userData.email]);

  if (!userId) {
    return <div>Please sign in to view your courses.</div>;
  }

  return (
    <div className="mt-10 px-4 sm:px-6 lg:px-8">
      <h2 className="text-yellow-500 font-bold text-lg sm:text-xl md:text-2xl">
        My AI Courses
      </h2>
      {error && <p className="text-red-500 mt-4">{error}</p>}{" "}
      {/* Display error message */}
      {loading ? (
        <p className="text-white mt-4">Loading your courses...</p> // Display loading message
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
          {userCourses.length > 0 ? (
            userCourses.map((userCourse, index) => (
              <CourseCard userCourse={userCourse} key={index} />
            ))
          ) : (
            <p className="text-white">No courses found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default UserCourseList;
