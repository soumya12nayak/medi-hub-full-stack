import React, { useEffect, useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";

const AllAppointments = () => {
  const { aToken, appointments, cancelAppointment, getAllAppointments } =
    useContext(AdminContext);
  const { slotDateFormat, calculateAge, currency } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);

  return (
    <div className="w-full max-w-6xl mx-auto p-5">
      <h2 className="mb-6 text-3xl font-bold text-gray-800">
        All Appointments
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {appointments.map((item, index) => (
          <div
            key={index}
            className="relative bg-white/70 backdrop-blur-md border rounded-2xl shadow-md hover:shadow-xl transition-transform hover:-translate-y-1 p-5"
          >
            {/* Status Badge */}
            <div className="absolute top-3 right-3">
              {item.cancelled ? (
                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-600">
                  Cancelled
                </span>
              ) : item.isCompleted ? (
                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-600">
                  Completed
                </span>
              ) : (
                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-600">
                  Pending
                </span>
              )}
            </div>

            {/* Patient */}
            <div className="flex items-center gap-4 mb-4">
              <img
                src={item.userData.image}
                alt="patient"
                className="w-14 h-14 rounded-full border shadow"
              />
              <div>
                <p className="font-semibold text-gray-800">
                  {item.userData.name}
                </p>
                <p className="text-sm text-gray-500">
                  Age: {calculateAge(item.userData.dob)}
                </p>
              </div>
            </div>

            {/* Appointment Info */}
            <div className="space-y-2 text-sm text-gray-600">
              <p>
                <span className="font-medium">📅 Date:</span>{" "}
                {slotDateFormat(item.slotDate)}
              </p>
              <p>
                <span className="font-medium">⏰ Time:</span> {item.slotTime}
              </p>
              <p className="flex items-center gap-2">
                <img
                  src={item.docData.image}
                  alt="doctor"
                  className="w-8 h-8 rounded-full border"
                />
                <span className="font-medium text-gray-800">
                  Dr. {item.docData.name}
                </span>
              </p>
              <p>
                <span className="font-medium">💰 Fees:</span> {currency}
                {item.amount}
              </p>
            </div>

            {/* Action */}
            {!item.cancelled && !item.isCompleted && (
              <button
                onClick={() => cancelAppointment(item._id)}
                className="mt-4 w-full py-2 rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition"
              >
                Cancel Appointment
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllAppointments;
