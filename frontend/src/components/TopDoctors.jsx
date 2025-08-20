import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { Star, ArrowRight } from "lucide-react"

const TopDoctors = () => {
    const navigate = useNavigate()
    const { doctors } = useContext(AppContext)

    // Generate random review count (between 20 and 200)
    const getRandomReviews = () => Math.floor(Math.random() * 180) + 20

    return (
        <div className="relative py-20 px-6 sm:px-12 lg:px-20 text-[#262626] ">
            {/* Decorative background shapes */}
            <div className="absolute top-0 left-0 w-40 h-40 bg-blue-200/30 rounded-full blur-3xl -z-10"></div>
            <div className="absolute bottom-0 right-0 w-56 h-56 bg-purple-200/30 rounded-full blur-3xl -z-10"></div>

            {/* Heading */}
            <div className="text-center max-w-2xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Top Doctors to Book
                </h1>
                <p className="text-gray-600 text-sm md:text-base">
                    Find the right doctor for your needs — fast, reliable, and hassle-free.
                </p>

            </div>

            {/* Doctor Cards */}
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {doctors.slice(0, 8).map((item, index) => (
                    <div
                        onClick={() => {
                            navigate(`/appointment/${item._id}`)
                            scrollTo(0, 0)
                        }}
                        key={index}
                        className="group bg-white rounded-2xl shadow-md border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-500 cursor-pointer overflow-hidden"
                    >
                        {/* Doctor Image */}
                        <div className="relative">
                            <img
                                className="w-full h-64 object-cover object-top bg-gray-100 group-hover:scale-105 transition-transform duration-500"
                                src={item.image}
                                alt={item.name}
                            />
                            <span
                                className={`absolute top-3 right-3 text-xs px-3 py-1 rounded-full font-medium shadow ${item.available
                                        ? "bg-green-100 text-green-600"
                                        : "bg-red-100 text-red-600"
                                    }`}
                            >
                                {item.available ? "Available" : "Not Available"}
                            </span>
                        </div>


                        {/* Card Content */}
                        <div className="p-5 space-y-2">
                            <p className="text-lg font-semibold text-gray-800">
                                {item.name}
                            </p>
                            <p className="text-sm text-gray-500">{item.speciality}</p>

                            {/* Rating + Reviews */}
                            <div className="flex items-center gap-1 text-yellow-500 mt-2">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={14} className="fill-yellow-400" />
                                ))}
                                <span className="text-xs text-gray-500 ml-2">
                                    {getRandomReviews()} Reviews
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* More Button */}
            <div className="flex justify-center mt-12">
                <button
                    onClick={() => {
                        navigate('/doctors')
                        scrollTo(0, 0)
                    }}
                    className="flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium shadow hover:scale-105 transition-transform"
                >
                    View More Doctors <ArrowRight size={18} />
                </button>
            </div>
        </div>
    )
}

export default TopDoctors
