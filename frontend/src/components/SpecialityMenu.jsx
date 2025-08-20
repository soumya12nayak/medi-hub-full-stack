import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
  return (
    <section id="speciality" className="py-20 px-6 text-[#262626] relative overflow-hidden">
      
      {/* Heading */}
      <div className="text-center mb-9">
        <h1 className="text-3xl md:text-4xl font-bold">
          Explore by <span className="text-blue-600">Speciality</span>
        </h1>
        <p className="sm:w-2/3 md:w-1/2 mx-auto mt-3 text-gray-600 text-sm md:text-base">
          Choose from a wide range of trusted doctors, organized neatly for your needs.
        </p>
      </div>

      {/* Circle Menu */}
      <div className="relative flex justify-center items-center">
        <div className="w-[400px] h-[400px] md:w-[500px] md:h-[500px] rounded-full border border-gray-300 relative animate-spin-slow">
          {specialityData.map((item, index) => {
            const angle = (index / specialityData.length) * 360
            const radius = 180
            const x = radius * Math.cos((angle * Math.PI) / 180)
            const y = radius * Math.sin((angle * Math.PI) / 180)
            return (
              <Link
                key={index}
                to={`/doctors/${item.speciality}`}
                onClick={() => scrollTo(0, 0)}
                className="absolute flex flex-col items-center text-xs cursor-pointer transition-transform hover:scale-110"
                style={{
                  top: `calc(50% + ${y}px)`,
                  left: `calc(50% + ${x}px)`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <div className="w-16 h-16 flex items-center justify-center bg-white shadow-md rounded-full border hover:border-blue-500 transition-all">
                  <img src={item.image} alt={item.speciality} className="w-14 h-14" />
                </div>
                <p className="mt-2 text-gray-700">{item.speciality}</p>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default SpecialityMenu
