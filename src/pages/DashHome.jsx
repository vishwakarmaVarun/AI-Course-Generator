import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../config/firebase";
import { Link } from "react-router-dom";
import UserCourseList from "../components/UserCourseList";
import { toast } from "react-toastify";

const DashHome = () => {
  const [userData, setUserData] = useState({});
  const userId = auth.currentUser?.uid;

  useEffect(() => {
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
        console.log(error.message);
      }
    };

    getUserData();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center justify-between md:flex-row md:justify-between md:px-12">
        <div className="text-center md:text-left">
          <h2 className="text-2xl sm:text-3xl md:text-4xl text-gray-200 mb-2">
            Hello,{" "}
            <span className="text-orange-400 font-bold">
              {userData?.name} 🙋‍♂️
            </span>
          </h2>
          <p className="text-sm sm:text-lg md:text-xl px-2 sm:p-0 text-gray-100">
            Create an innovative course with AI and share it with friends.
          </p>  
        </div>
        <Link to={"/create-course"}>
          <button className="mt-4 md:mt-0 text-sm sm:text-base md:text-lg text-white bg-red-600 p-2 px-4 sm:px-6 font-semibold rounded-md cursor-pointer outline-none hover:bg-red-500 transition-all duration-300">
            + Create AI Course
          </button>
        </Link>
      </div>

      {/* Display the user Course List */}
      <div className="md:px-12">
        <UserCourseList />
      </div>
    </>
  );
};

export default DashHome;
