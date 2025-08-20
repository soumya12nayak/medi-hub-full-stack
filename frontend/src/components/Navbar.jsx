import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const { token, setToken, userData } = useContext(AppContext);

  const logout = () => {
    localStorage.removeItem("token");
    setToken(false);
    navigate("/login");
  };

  return (
    <header className="w-full sticky top-0 z-50 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 shadow-lg rounded-lg mb-12">
      <nav className="flex items-center justify-between px-6 md:px-12 py-3">
        {/* Logo */}
        <img
          onClick={() => navigate("/")}
          src={assets.logo}
          alt="logo"
          className="w-36 md:w-44 cursor-pointer"
        />

        {/* Nav Links */}
        <ul className="hidden md:flex items-center gap-6 font-medium text-white">
          {["Home", "Doctors", "About", "Contact"].map((item) => (
            <NavLink
              key={item}
              to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              className={({ isActive }) =>
                `px-4 py-2 rounded-full transition-all ${
                  isActive
                    ? "bg-white text-blue-600 font-semibold"
                    : "hover:bg-white/20"
                }`
              }
            >
              {item}
            </NavLink>
          ))}

          {/* Admin Login (always shown) */}
          <a
            href="http://localhost:5174/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 rounded-full font-semibold bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-transparent bg-clip-text bg-white/10 backdrop-blur-md border border-white/30 shadow-lg hover:bg-white/20 hover:scale-105 transition transform"

          >
            Admin Login
          </a>
        </ul>

        {/* User Menu */}
        {token && userData ? (
          <div className="hidden md:block relative">
            <img
              src={userData.image}
              alt="profile"
              className="w-10 h-10 rounded-full cursor-pointer border-2 border-white shadow peer"
            />

            {/* Dropdown */}
            <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-lg opacity-0 invisible peer-hover:opacity-100 peer-hover:visible hover:opacity-100 hover:visible transition-all duration-200 z-50">
              <p
                onClick={() => navigate("/my-profile")}
                className="px-5 py-3 hover:bg-gray-100 cursor-pointer rounded-2xl"
              >
                My Profile
              </p>
              <p
                onClick={() => navigate("/my-appointments")}
                className="px-5 py-3 hover:bg-gray-100 cursor-pointer"
              >
                My Appointments
              </p>
              <p
                onClick={logout}
                className="px-5 py-3 text-red-500 hover:bg-gray-100 cursor-pointer rounded-2xl"
              >
                Logout
              </p>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="hidden md:block bg-white text-blue-600 px-5 py-2 rounded-full font-medium hover:shadow-lg transition"
          >
            Login
          </button>
        )}

        {/* Mobile Menu Button */}
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="md:hidden flex flex-col gap-1"
        >
          <span className="w-6 h-0.5 bg-white"></span>
          <span className="w-6 h-0.5 bg-white"></span>
          <span className="w-6 h-0.5 bg-white"></span>
        </button>
      </nav>

      {/* Mobile Menu */}
      {showMenu && (
        <div className="md:hidden absolute top-full right-4 mt-2 bg-white rounded-2xl shadow-lg p-5 flex flex-col gap-4 w-52 text-gray-700">
          {["Home", "Doctors", "About", "Contact"].map((item) => (
            <NavLink
              key={item}
              to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              onClick={() => setShowMenu(false)}
              className="px-3 py-2 rounded-lg hover:bg-gray-100"
            >
              {item}
            </NavLink>
          ))}

          {/* Admin Login (always shown in mobile menu) */}
          <a
            href="http://localhost:5174/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-2 rounded-lg font-semibold text-blue-600 bg-white/60 backdrop-blur-md border border-gray-300 shadow hover:bg-white hover:scale-105 transition transform text-center"
          >
            Admin Login
          </a>

          {token ? (
            <>
              <p
                onClick={() => navigate("/my-profile")}
                className="px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer"
              >
                My Profile
              </p>
              <p
                onClick={() => navigate("/my-appointments")}
                className="px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer"
              >
                My Appointments
              </p>
              <p
                onClick={logout}
                className="px-3 py-2 text-red-500 rounded-lg hover:bg-gray-100 cursor-pointer"
              >
                Logout
              </p>
            </>
          ) : (
            <button
              onClick={() => {
                setShowMenu(false);
                navigate("/login");
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700"
            >
              Login
            </button>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
