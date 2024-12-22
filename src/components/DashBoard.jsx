import React from "react";
import SideBar from "../pages/SideBar";
import Explore from "../pages/Explore";
import Upgrade from "../pages/Upgrade";
import { Route, Routes } from "react-router-dom";
import DashBoardHeader from "./DashBoardHeader";
import DashHome from "../pages/DashHome";

const DashBoard = () => {
  return (
    <div>
      <div className="w-64 hidden md:block">
        <SideBar />
      </div>
      <div className="md:ml-64">
        <DashBoardHeader />
        <div className="py-8 sm:p-8">
          <Routes>
            <Route path="/" element={<DashHome />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/upgrade" element={<Upgrade />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;