import React from 'react'
import { assets } from '../assets/assets'
import { Zap, MapPin, UserCheck } from "lucide-react" // icons for why choose us

const About = () => {
  return (
    <div className="relative">
      
      {/* ---------- ABOUT US ---------- */}
      <div className="text-center text-2xl pt-10">
        <p className="text-gray-600">
          ABOUT <span className="bg-gradient-to-r from-indigo-500 to-emerald-400 bg-clip-text text-transparent font-semibold">US</span>
        </p>
      </div>

      <div className="my-12 flex flex-col md:flex-row gap-12 items-center">
        {/* Left Image */}
        <img 
          className="w-full md:max-w-[360px] rounded-xl shadow-lg hover:scale-105 transition duration-500" 
          src={assets.about_image} 
          alt="About medi-hub" 
        />

        {/* Right Text */}
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-base text-gray-600 leading-relaxed">
          <p>
            Welcome to <span className="font-semibold text-gray-800">Medi-Hub</span>, your trusted partner in managing your healthcare needs conveniently and efficiently. 
            At Prescripto, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.
          </p>
          <p>
            Medi-Hub is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements 
            to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, Prescripto is here to support you every step of the way.
          </p>
          <h3 className="text-lg font-bold text-gray-800">Our Vision</h3>
          <p>
            Our vision at Prescripto is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, 
            making it easier for you to access the care you need, when you need it.
          </p>
        </div>
      </div>

      {/* ---------- WHY CHOOSE US ---------- */}
      <div className="text-center text-2xl my-10">
        <p className="text-gray-600">
          WHY <span className="bg-gradient-to-r from-sky-500 to-indigo-500 bg-clip-text text-transparent font-semibold">CHOOSE US</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
        {/* Card 1 */}
        <div className="border rounded-2xl px-10 py-12 flex flex-col items-center gap-4 text-center bg-white hover:bg-gradient-to-r from-indigo-500 to-sky-500 hover:text-white shadow-md transition-all duration-500 cursor-pointer">
          <Zap className="w-8 h-8 text-indigo-500 group-hover:text-white transition" />
          <b className="text-lg">EFFICIENCY</b>
          <p>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
        </div>

        {/* Card 2 */}
        <div className="border rounded-2xl px-10 py-12 flex flex-col items-center gap-4 text-center bg-white hover:bg-gradient-to-r from-emerald-400 to-sky-400 hover:text-white shadow-md transition-all duration-500 cursor-pointer">
          <MapPin className="w-8 h-8 text-emerald-500 group-hover:text-white transition" />
          <b className="text-lg">CONVENIENCE</b>
          <p>Access to a network of trusted healthcare professionals in your area.</p>
        </div>

        {/* Card 3 */}
        <div className="border rounded-2xl px-10 py-12 flex flex-col items-center gap-4 text-center bg-white hover:bg-gradient-to-r from-pink-400 to-indigo-500 hover:text-white shadow-md transition-all duration-500 cursor-pointer">
          <UserCheck className="w-8 h-8 text-pink-500 group-hover:text-white transition" />
          <b className="text-lg">PERSONALIZATION</b>
          <p>Tailored recommendations and reminders to help you stay on top of your health.</p>
        </div>
      </div>
    </div>
  )
}

export default About
