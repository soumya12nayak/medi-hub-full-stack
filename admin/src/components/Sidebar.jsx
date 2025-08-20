import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { NavLink } from "react-router-dom";
import { DoctorContext } from "../context/DoctorContext";
import { AdminContext } from "../context/AdminContext";

const Sidebar = () => {
  const { dToken } = useContext(DoctorContext);
  const { aToken } = useContext(AdminContext);

  return (
    <div className="min-h-screen bg-white border-r shadow-sm flex flex-col">
      <div className="px-6 py-5 border-b">
        <h2 className="text-xl font-semibold text-gray-800 tracking-tight">
          {aToken ? "Admin Panel" : dToken ? "Doctor Panel" : "Dashboard"}
        </h2>
      </div>

      {aToken && (
        <ul className="text-[#515151] mt-4">
          <NavLink
            to={"/admin-dashboard"}
            className={({ isActive }) =>
              `flex items-center gap-4 py-3.5 px-6 md:min-w-72 cursor-pointer rounded-r-full transition-all duration-300 ${
                isActive
                  ? "bg-indigo-50 text-indigo-600 font-medium border-r-4 border-indigo-600"
                  : "hover:bg-gray-50"
              }`
            }
          >
            <div className="p-2 bg-indigo-100 rounded-md">
              <img className="w-5 h-5" src={assets.home_icon} alt="" />
            </div>
            <p className="hidden md:block">Dashboard</p>
          </NavLink>

          <NavLink
            to={"/all-appointments"}
            className={({ isActive }) =>
              `flex items-center gap-4 py-3.5 px-6 md:min-w-72 cursor-pointer rounded-r-full transition-all duration-300 ${
                isActive
                  ? "bg-indigo-50 text-indigo-600 font-medium border-r-4 border-indigo-600"
                  : "hover:bg-gray-50"
              }`
            }
          >
            <div className="p-2 bg-indigo-100 rounded-md">
              <img className="w-5 h-5" src={assets.appointment_icon} alt="" />
            </div>
            <p className="hidden md:block">Appointments</p>
          </NavLink>

          <NavLink
            to={"/add-doctor"}
            className={({ isActive }) =>
              `flex items-center gap-4 py-3.5 px-6 md:min-w-72 cursor-pointer rounded-r-full transition-all duration-300 ${
                isActive
                  ? "bg-indigo-50 text-indigo-600 font-medium border-r-4 border-indigo-600"
                  : "hover:bg-gray-50"
              }`
            }
          >
            <div className="p-2 bg-indigo-100 rounded-md">
              <img className="w-5 h-5" src={assets.add_icon} alt="" />
            </div>
            <p className="hidden md:block">Add Doctor</p>
          </NavLink>

          <NavLink
            to={"/doctor-list"}
            className={({ isActive }) =>
              `flex items-center gap-4 py-3.5 px-6 md:min-w-72 cursor-pointer rounded-r-full transition-all duration-300 ${
                isActive
                  ? "bg-indigo-50 text-indigo-600 font-medium border-r-4 border-indigo-600"
                  : "hover:bg-gray-50"
              }`
            }
          >
            <div className="p-2 bg-indigo-100 rounded-md">
              <img className="w-5 h-5" src={assets.people_icon} alt="" />
            </div>
            <p className="hidden md:block">Doctors List</p>
          </NavLink>
        </ul>
      )}

      {dToken && (
        <ul className="text-[#515151] mt-4">
          <NavLink
            to={"/doctor-dashboard"}
            className={({ isActive }) =>
              `flex items-center gap-4 py-3.5 px-6 md:min-w-72 cursor-pointer rounded-r-full transition-all duration-300 ${
                isActive
                  ? "bg-indigo-50 text-indigo-600 font-medium border-r-4 border-indigo-600"
                  : "hover:bg-gray-50"
              }`
            }
          >
            <div className="p-2 bg-indigo-100 rounded-md">
              <img className="w-5 h-5" src={assets.home_icon} alt="" />
            </div>
            <p className="hidden md:block">Dashboard</p>
          </NavLink>

          <NavLink
            to={"/doctor-appointments"}
            className={({ isActive }) =>
              `flex items-center gap-4 py-3.5 px-6 md:min-w-72 cursor-pointer rounded-r-full transition-all duration-300 ${
                isActive
                  ? "bg-indigo-50 text-indigo-600 font-medium border-r-4 border-indigo-600"
                  : "hover:bg-gray-50"
              }`
            }
          >
            <div className="p-2 bg-indigo-100 rounded-md">
              <img className="w-5 h-5" src={assets.appointment_icon} alt="" />
            </div>
            <p className="hidden md:block">Appointments</p>
          </NavLink>

          <NavLink
            to={"/doctor-profile"}
            className={({ isActive }) =>
              `flex items-center gap-4 py-3.5 px-6 md:min-w-72 cursor-pointer rounded-r-full transition-all duration-300 ${
                isActive
                  ? "bg-indigo-50 text-indigo-600 font-medium border-r-4 border-indigo-600"
                  : "hover:bg-gray-50"
              }`
            }
          >
            <div className="p-2 bg-indigo-100 rounded-md">
              <img className="w-5 h-5" src={assets.people_icon} alt="" />
            </div>
            <p className="hidden md:block">Profile</p>
          </NavLink>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
