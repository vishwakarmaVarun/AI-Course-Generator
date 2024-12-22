import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="text-white">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:items-center">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="bg-gradient-to-r from-yellow-300 via-orange-500 to-red-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
            AI Course Generator
            <span className="sm:block text-red-600">
              {" "}
              Custom Learning Paths, Powered by AI{" "}
            </span>
          </h1>

          <p className="mx-auto text-center mt-4 max-w-xl sm:text-xl/relaxed">
            Unlock personalized education with AI-driven course creation. Tailor
            you learning journey to fit your unique goals and pace
          </p>

          <div className="mt-8 flex justify-center">
            <Link
              className="block w-full rounded border border-yellow-600 bg-yellow-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
              to={"/dashboard"}
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
