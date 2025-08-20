import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { Star } from 'lucide-react'

const RelatedDoctors = ({ speciality, docId }) => {
  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)

  const [relDoc, setRelDoc] = useState([])

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const doctorsData = doctors.filter(
        (doc) => doc.speciality === speciality && doc._id !== docId
      )
      setRelDoc(doctorsData)
    }
  }, [doctors, speciality, docId])

  // Dummy reviews
  const reviews = [
    "Very attentive and helpful!",
    "Great experience, highly recommended.",
    "Explained everything clearly.",
    "Friendly and professional.",
    "Made me feel comfortable during my visit."
  ]

  return (
    <div className="flex flex-col items-center gap-4 my-16 text-[#262626] md:mx-10">
      <h1 className="text-3xl font-semibold">Related Doctors</h1>
      <p className="sm:w-1/3 text-center text-sm text-gray-600">
        Explore doctors from the same specialty who may also be a great match for your needs.
      </p>

      <div className="w-full grid grid-cols-auto gap-6 pt-6 px-3 sm:px-0">
        {relDoc.map((item, index) => (
          <div
            onClick={() => {
              navigate(`/appointment/${item._id}`)
              scrollTo(0, 0)
            }}
            key={index}
            className="border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer 
                       hover:shadow-lg hover:scale-[1.02] transition-all duration-500 bg-white"
          >
            <img
              className="w-full h-66 object-cover bg-[#EAEFFF]"
              src={item.image}
              alt={item.name}
            />
            <div className="p-4">
              <div
                className={`flex items-center gap-2 text-sm mb-1 ${
                  item.available ? "text-green-500" : "text-gray-500"
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    item.available ? "bg-green-500" : "bg-gray-500"
                  }`}
                ></span>
                <p>{item.available ? "Available" : "Not Available"}</p>
              </div>
              <p className="text-[#262626] text-lg font-medium">{item.name}</p>
              <p className="text-[#5C5C5C] text-sm">{item.speciality}</p>

              {/* Rating & Review */}
              <div className="flex items-center gap-1 mt-2 text-yellow-500 text-sm">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    fill={i < 4 ? "#FACC15" : "none"} // 4-star dummy rating
                    strokeWidth={1.5}
                  />
                ))}
                <span className="text-gray-600 ml-1 text-xs">
                  {reviews[index % reviews.length]}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RelatedDoctors
