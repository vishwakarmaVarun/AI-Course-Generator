import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import PrivateRoutes from "./protocols/PrivateRoutes";
import DashBoard from "./components/DashBoard";
import Signup from "./pages/Signup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreateCourse from "./components/CreateCourse";
import CreatedCourse from "./pages/CreatedCourse";
import Finish from "./pages/Finish";
import UserCoursePage from "./pages/UserCoursePage";
import StartCourse from "./pages/StartCourse";

const App = () => {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/dashboard/*" element={<DashBoard />} />
          <Route path="/create-course" element={<CreateCourse />} />
          <Route path="/created-course/:id" element={<CreatedCourse />} />
          <Route path="/created-course/:id/finish" element={<Finish />} />
          <Route path="/course/:id" element={<UserCoursePage />} />
          <Route path="/course/:id/start" element={<StartCourse />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
