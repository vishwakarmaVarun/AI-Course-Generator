import React from "react";
import { IoHomeOutline, IoShieldCheckmarkOutline } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { HiOutlineSquare3Stack3D } from "react-icons/hi2";
import { NavLink } from "react-router-dom"; // Import NavLink from react-router-dom

const SideBar = () => {
  const menu = [
    {
      id: 1,
      name: "Home",
      icon: <IoHomeOutline size={25} />,
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Explore",
      icon: <HiOutlineSquare3Stack3D size={25} />,
      path: "/dashboard/explore",
    },
    {
      id: 3,
      name: "Upgrade",
      icon: <IoShieldCheckmarkOutline size={25} />,
      path: "/dashboard/upgrade",
    },
  ];

  return (
    <div className="fixed h-full md:w-64 p-5 shadow shadow-black">
      <div className="flex justify-center mt-1">
        <img src="/logo.png" className="w-36 brightness-125" alt="logo" />
      </div>
      <hr className="my-5 border border-gray-500" />

      <ul>
        {menu.map((item) => (
          <li key={item.id}>
            {/* Use NavLink for navigation and active link styling */}
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `flex items-center font-medium gap-4 p-3 my-5 cursor-pointer transition-all duration-150 rounded-md ${
                  isActive
                    ? "bg-slate-300 text-gray-900"
                    : "text-gray-400 hover:bg-slate-300 hover:text-gray-900"
                }`
              }
              end
            >
              <div>{item.icon}</div>
              <h2 className="text-[17px]">{item.name}</h2>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
