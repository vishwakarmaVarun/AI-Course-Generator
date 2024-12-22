import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";

const Header = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Firebase listener to track user login state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) setUser(user);
    });

    return () => unsubscribe(); // Clean up listener on component unmount
  }, [auth]);

  return (
    <div className="flex justify-between items-center p-6 sm:px-12 shadow-md shadow-black">
      {/* Logo with hover effect */}
      <img
        className="w-28 sm:w-36 cursor-pointer brightness-125 hover:brightness-110 transition-all duration-200 ease-in-out transform hover:scale-105"
        src="/logo.png"
        alt="logo"
        loading="lazy"
        onClick={() => navigate("/")}
        aria-label="Navigate to Home"
      />

      {user ? (
        <Link
          to={"/dashboard"}
          className="hover:bg-orange-500 hover:text-white font-semibold border-2 border-orange-500 p-2 px-4 sm:px-6 sm:py-2 rounded-lg bg-transparent text-orange-500 transition-all duration-200 ease-in-out shadow-md hover:shadow-lg"
          aria-label="Navigate to Dashboard or Sign in"
        >
          Get Started
        </Link>
      ) : (
        <Link
          to={"/sign-in"}
          className="hover:bg-orange-500 hover:text-white font-semibold border-2 border-orange-500 p-2 px-4 sm:px-6 sm:py-2 rounded-lg bg-transparent text-orange-500 transition-all duration-200 ease-in-out shadow-md hover:shadow-lg"
          aria-label="Navigate to Dashboard or Sign in"
        >
          Log In
        </Link>
      )}
    </div>
  );
};

export default Header;
