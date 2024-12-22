import React, { useEffect, useState } from "react";
import { dbd } from "../config/dbd";
import { courseList } from "../config/schema";
import CourseCard from "../components/CourseCard";

const Explore = () => {
  const [courseLists, setCourseLists] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [loading, setLoading] = useState(false); // Track loading state
  const [hasMoreCourses, setHasMoreCourses] = useState(true); // Track if more courses are available

  useEffect(() => {
    getALLCourses();
  }, [pageIndex]);

  const getALLCourses = async () => {
    setLoading(true);
    try {
      const result = await dbd
        .select()
        .from(courseList)
        .limit(9)
        .offset(pageIndex * 9);

      setCourseLists(result);
      setHasMoreCourses(result.length === 9); // Check if the page is fully loaded with 9 items
    } catch (error) {
      console.log(error.message);
      setHasMoreCourses(false); // Stop showing next button on error
    } finally {
      setLoading(false); // Turn off loading
    }
  };

  return (
    <div>
      <h2 className="text-yellow-500 text-3xl font-semibold">
        Explore More Projects
      </h2>
      <p className="text-gray-300">
        Explore more projects created with AI by other users and see the courses
        you like to explore.
      </p>

      {/* Display loading state */}
      {loading && <p className="text-white">Loading courses...</p>}

      {/* Course List */}
      {!loading && courseLists.length === 0 && (
        <p className="text-white">No courses available.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {courseLists.map((userCourse, index) => (
          <div key={index} className="mt-6">
            <CourseCard userCourse={userCourse} />
          </div>
        ))}
      </div>

      {/* Pagination Buttons */}
      <div className="flex justify-between items-center mt-5">
        {pageIndex !== 0 && (
          <button
            className="text-white bg-orange-500 p-2 px-3 rounded-lg"
            onClick={() => setPageIndex(pageIndex - 1)}
            disabled={loading}
          >
            Previous Page
          </button>
        )}
        {hasMoreCourses && (
          <button
            className="text-white bg-orange-500 p-2 px-3 rounded-lg"
            onClick={() => setPageIndex(pageIndex + 1)}
            disabled={loading}
          >
            Next Page
          </button>
        )}
      </div>
    </div>
  );
};

export default Explore;
