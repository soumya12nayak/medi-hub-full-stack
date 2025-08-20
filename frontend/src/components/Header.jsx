import React from 'react'
import { assets } from '../assets/assets'
import { Star, ShieldCheck, Clock } from "lucide-react"; // icons

const Header = () => {
    return (
        <div className="relative flex flex-col md:flex-row flex-wrap rounded-3xl overflow-hidden shadow-2xl">

            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400 animate-gradient-x"></div>
            <div className="absolute inset-0 bg-black/10 backdrop-blur-sm"></div>

            <div className="relative z-10 flex flex-col md:flex-row w-full px-6 md:px-10 lg:px-20">
                
                {/* --------- Header Left --------- */}
                <div className="md:w-1/2 flex flex-col items-start justify-center gap-4 py-8 md:py-[7vw]">
                    <p className="text-3xl md:text-4xl lg:text-5xl text-white font-bold leading-tight">
                        Book Appointment <br /> With Trusted Doctors
                    </p>

                    <p className="text-white/80 text-base sm:text-lg">
                        Healthcare made simple, secure, and fast 🚑
                    </p>

                    <div className="flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light">
                        <img className="w-28" src={assets.group_profiles} alt="" />
                        <p>
                            Simply browse through our list of trusted doctors,<br className="hidden sm:block" /> 
                            and schedule your appointment hassle-free.
                        </p>
                    </div>

                    {/* CTA button */}
                    <a href="#speciality" 
                        className="flex items-center gap-2 bg-white px-8 py-3 rounded-full text-gray-700 text-sm mt-4 shadow-md hover:shadow-2xl hover:scale-105 transition-all duration-300">
                        Book Appointment 
                        <img className="w-3" src={assets.arrow_icon} alt="" />
                    </a>

                    {/* Trust Badges */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6 text-white/90 text-xs sm:text-sm">
                        <div className="flex items-center gap-2">
                            <Star className="w-4 h-4 text-yellow-300" />
                            <span>4.9/5 Rating</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4 text-green-300" />
                            <span>Secure Booking</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-emerald-200" />
                            <span>24/7 Availability</span>
                        </div>
                    </div>
                </div>

                {/* --------- Header Right --------- */}
                <div className="md:w-1/2 relative flex justify-center items-end py-0">
                    <img 
                        className="w-full max-w-lg drop-shadow-2xl rounded-xl hover:scale-105 transition-transform duration-500" 
                        src={assets.header_img} 
                        alt="Doctor consultation" 
                    />
                </div>
            </div>

            {/* Decorative floating shapes */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        </div>
    )
}

export default Header
