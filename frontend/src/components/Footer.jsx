import React from 'react'
import { assets } from '../assets/assets'
import { Facebook, Twitter, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-r from-sky-50 via-indigo-50 to-emerald-50 border-t border-gray-200 mt-20 rounded-lg">
      <div className="md:mx-10 px-6 md:px-16">
        
        {/* Top Section */}
        <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 py-16 text-sm relative z-10">

          {/* About / Logo */}
          <div>
            <img className="mb-5 w-40" src={assets.logo} alt="Prescripto Logo" />
            <p className="w-full md:w-2/3 text-gray-600 leading-6">
              Simplifying healthcare with trusted doctors and secure booking. 
              Your health, our priority 💙
            </p>

            {/* Social Links */}
            <div className="flex gap-4 mt-6">
              <a href="#" className="p-2 rounded-full bg-white shadow hover:scale-110 transition">
                <Facebook className="w-5 h-5 text-sky-600" />
              </a>
              <a href="#" className="p-2 rounded-full bg-white shadow hover:scale-110 transition">
                <Twitter className="w-5 h-5 text-sky-400" />
              </a>
              <a href="#" className="p-2 rounded-full bg-white shadow hover:scale-110 transition">
                <Linkedin className="w-5 h-5 text-blue-700" />
              </a>
              <a href="mailto:greatstackdev@gmail.com" className="p-2 rounded-full bg-white shadow hover:scale-110 transition">
                <Mail className="w-5 h-5 text-emerald-600" />
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <p className="text-lg font-semibold mb-5 text-gray-800">Company</p>
            <ul className="flex flex-col gap-2 text-gray-600">
              {["Home", "About Us", "Delivery", "Privacy Policy"].map((item, idx) => (
                <li key={idx} className="hover:text-sky-600 hover:translate-x-1 transition cursor-pointer">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact / Newsletter */}
          <div>
            <p className="text-lg font-semibold mb-5 text-gray-800">Get in Touch</p>
            <ul className="flex flex-col gap-2 text-gray-600 mb-4">
              <li>+1-212-456-7890</li>
              <li>medihub@gmail.com</li>
            </ul>

            {/* Newsletter */}
            <div className="flex bg-white rounded-full shadow overflow-hidden max-w-xs">
              <input 
                type="email" 
                placeholder="Your email" 
                className="flex-1 px-4 py-2 text-sm outline-none"
              />
              <button className="px-4 py-2 bg-sky-500 text-white text-sm font-medium hover:bg-sky-600 transition">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div>
          <hr className="border-gray-300" />
          <p className="py-5 text-sm text-center text-gray-500">
            © 2024 Medi-Hub.com — All Rights Reserved.
          </p>
        </div>
      </div>

      {/* Decorative shapes */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-sky-200/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-200/30 rounded-full blur-2xl"></div>
    </footer>
  )
}

export default Footer
