import React, { useState } from "react";
import { auth } from "../config/firebase";
import { IoIosLogOut } from "react-icons/io";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";

const DashBoardHeader = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logout Successfully");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to Logout", error.message);
      });
  };

  return (
    <div className="flex justify-between items-center p-3 px-2 sm:p-5 shadow shadow-black">
      <img
        className="w-10 sm:w-12 brightness-125 sm:ml-10 cursor-pointer"
        src="/mono-logo.png"
        alt="mono-logo"
      />
      <div className="relative">
        <div
          className="w-10 sm:w-12 aspect-square rounded-full cursor-pointer"
          onClick={toggleDropdown}
        >
          <img
            className="w-full h-full"
            src="https://cdn-icons-png.flaticon.com/512/219/219988.png"
            alt="profile"
          />
        </div>

        {/* Dropdown menu */}
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2">
            <div className="px-4 py-2 text-sm text-gray-700">
              {auth?.currentUser?.email}
            </div>
            <div
              className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 cursor-pointer hover:bg-red-100"
              onClick={handleLogout}
            >
              <IoIosLogOut size={20} /> Log Out
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashBoardHeader;
