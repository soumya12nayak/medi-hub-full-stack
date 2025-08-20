import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { BadgeCheck, Stethoscope } from "lucide-react"; // using icons

const DoctorsList = () => {
  const { doctors, changeAvailability, aToken, getAllDoctors } =
    useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);

  return (
    <div className="m-5 max-h-[85vh] overflow-y-auto">
      <h1 className="text-xl font-semibold text-gray-700 mb-6">
        Doctors Directory
      </h1>

      <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {doctors.map((item, index) => (
          <div
            key={index}
            className="relative bg-white border rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-4 flex flex-col items-center text-center group"
          >
            {/* Doctor Image */}
            <div className="relative">
              <img
                className="w-20 h-20 object-cover rounded-full border-2 border-gray-200 group-hover:border-primary transition-all"
                src={item.image}
                alt={item.name}
              />
              {item.available && (
                <span className="absolute bottom-1 right-1 w-3 h-3 bg-green-500 rounded-full border border-white"></span>
              )}
            </div>

            {/* Doctor Info */}
            <div className="mt-3">
              <p className="text-gray-800 font-semibold text-lg">
                {item.name}
              </p>
              <p className="text-sm text-gray-500 flex items-center justify-center gap-1">
                <Stethoscope className="w-4 h-4 text-primary" />
                {item.speciality}
              </p>
            </div>

            {/* Availability Toggle */}
            <div className="mt-4 flex items-center gap-2 text-sm">
              <input
                onChange={() => changeAvailability(item._id)}
                type="checkbox"
                checked={item.available}
                className="cursor-pointer accent-primary w-4 h-4"
              />
              <span
                className={`${
                  item.available ? "text-green-600" : "text-red-500"
                } font-medium`}
              >
                {item.available ? "Available" : "Unavailable"}
              </span>
            </div>

            {/* Badge */}
            <div className="absolute top-3 right-3">
              <BadgeCheck
                className={`w-5 h-5 ${
                  item.available ? "text-green-500" : "text-gray-300"
                }`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsList;
