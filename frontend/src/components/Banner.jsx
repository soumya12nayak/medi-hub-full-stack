import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { Star, ShieldCheck, Clock, Users } from "lucide-react"; // icons

const Banner = () => {
  const navigate = useNavigate();

  return (
    <div className="relative my-20 md:mx-10 rounded-3xl overflow-hidden shadow-2xl">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400 animate-gradient-x"></div>

      {/* Overlay for glassy effect */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-md"></div>

      <div className="relative flex flex-col md:flex-row items-center justify-between px-8 sm:px-12 md:px-16 py-14">
        {/* ------- Left Side ------- */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg">
            Book Appointment
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-white/90">
            With <span className="font-semibold">100+ Trusted Doctors</span>
          </p>
          <p className="mt-2 text-white/80 text-base sm:text-lg">
            Easy scheduling • Secure • 24/7 Availability
          </p>

          {/* Feature highlights with icons */}
          <div className="grid grid-cols-2 gap-4 mt-6 text-white/90 text-sm sm:text-base">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-300" />
              <span>Top Rated Doctors</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-green-300" />
              <span>Secure & Verified</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-emerald-300" />
              <span>24/7 Support</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-sky-200" />
              <span>10k+ Patients Served</span>
            </div>
          </div>

          <button
            onClick={() => {
              navigate("/login");
              scrollTo(0, 0);
            }}
            className="mt-8 px-8 py-3 bg-white text-gray-700 font-medium text-base sm:text-lg rounded-full shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            Create Account
          </button>
        </div>

        {/* ------- Right Side ------- */}
        <div className="hidden md:flex md:w-1/2 relative items-end justify-center">
          {/* floating badge */}
          <div className="absolute -top-6 -left-6 bg-white text-gray-800 px-4 py-2 rounded-full shadow-lg text-sm font-semibold flex items-center gap-2">
            <Star className="w-4 h-4 text-yellow-400" /> Rated 4.9/5
          </div>

          <img
            className="w-full max-w-3xl drop-shadow-2xl hover:scale-105 transition-transform duration-500"
            src={assets.appointment_img}
            alt="Doctor appointment"
          />
        </div>

      </div>
    </div>
  );
};

export default Banner;
