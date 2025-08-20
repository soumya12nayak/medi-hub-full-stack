import React from 'react'
import { assets } from '../assets/assets'
import { MapPin, Phone, Mail, Briefcase } from 'lucide-react'

const Contact = () => {
  return (
    <section className="relative py-20 px-6 md:px-12 lg:px-20 bg-gradient-to-br from-[#fdfbfb] via-[#ebedee] to-[#d7e1ec]">
      
      {/* Section Heading */}
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          CONTACT <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">US</span>
        </h2>
        <p className="text-gray-500 mt-3">We’d love to hear from you. Reach out anytime!</p>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
        
        {/* Left Side Image */}
        <div className="relative">
          <img 
            src={assets.contact_image} 
            alt="Contact" 
            className="w-full rounded-2xl shadow-xl"
          />
          <div className="absolute -bottom-6 -left-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-xl shadow-lg">
            Let's Connect 🚀
          </div>
        </div>

        {/* Right Info */}
        <div className="flex flex-col gap-8 text-gray-600 text-base">
          
          {/* Address */}
          <div className="flex items-start gap-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl">
              <MapPin size={22}/>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-800">Our Office</h3>
              <p>54709 Willms Station <br /> Suite 350, Washington, USA</p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-start gap-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl">
              <Phone size={22}/>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-800">Call Us</h3>
              <p>(415) 555-0132</p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start gap-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl">
              <Mail size={22}/>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-800">Email Us</h3>
              <p>medihub@gmail.com</p>
            </div>
          </div>

          {/* Careers */}
          <div className="flex items-start gap-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl">
              <Briefcase size={22}/>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-800">Careers</h3>
              <p className="mb-3">Learn more about our teams and job openings.</p>
              <button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm rounded-full hover:opacity-90 transition-all">
                Explore Jobs
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Contact
