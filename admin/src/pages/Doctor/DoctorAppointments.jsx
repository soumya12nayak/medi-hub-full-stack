import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const DoctorAppointments = () => {
  const { dToken, appointments, getAppointments, cancelAppointment, completeAppointment } = useContext(DoctorContext)
  const { slotDateFormat, calculateAge, currency } = useContext(AppContext)

  useEffect(() => {
    if (dToken) {
      getAppointments()
    }
  }, [dToken])

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      {/* Header */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        All <span className="text-primary">Appointments</span>
      </h2>

      {/* Appointments Container */}
      <div className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-lg overflow-hidden max-h-[80vh] overflow-y-auto">
        {/* Table Header */}
        <div className="hidden sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-4 px-6 py-4 border-b bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 font-semibold text-sm">
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Status / Action</p>
        </div>

        {/* Appointment Rows */}
        {appointments.map((item, index) => (
          <div
            key={index}
            className="sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-4 px-6 py-5 border-b flex flex-col sm:flex-row sm:items-center text-gray-700 hover:bg-gray-50 transition-all"
          >
            {/* Index */}
            <p className="hidden sm:block text-gray-400">{index + 1}</p>

            {/* Patient */}
            <div className="flex items-center gap-3">
              <img
                src={item.userData.image}
                className="w-10 h-10 rounded-full border-2 border-primary/30 shadow-sm"
                alt="patient"
              />
              <p className="font-semibold">{item.userData.name}</p>
            </div>

            {/* Payment */}
            <div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${
                  item.payment
                    ? 'bg-green-100 text-green-700 border border-green-200'
                    : 'bg-yellow-100 text-yellow-700 border border-yellow-200'
                }`}
              >
                {item.payment ? 'Online' : 'Cash'}
              </span>
            </div>

            {/* Age */}
            <p className="hidden sm:block text-gray-600">{calculateAge(item.userData.dob)} yrs</p>

            {/* Date & Time */}
            <p className="text-sm text-gray-600 font-medium">
              {slotDateFormat(item.slotDate)}, {item.slotTime}
            </p>

            {/* Fees */}
            <p className="font-semibold text-gray-800">
              {currency}
              {item.amount}
            </p>

            {/* Status / Actions */}
            {item.cancelled ? (
              <span className="text-red-600 font-semibold text-xs px-3 py-1 rounded-full bg-red-50 border border-red-200 shadow-sm">
                Cancelled
              </span>
            ) : item.isCompleted ? (
              <span className="text-green-600 font-semibold text-xs px-3 py-1 rounded-full bg-green-50 border border-green-200 shadow-sm">
                Completed
              </span>
            ) : (
              <div className="flex gap-3">
                <button
                  onClick={() => cancelAppointment(item._id)}
                  className="w-9 h-9 flex items-center justify-center bg-red-50 border border-red-200 rounded-xl hover:bg-red-100 transition shadow-sm"
                >
                  <img src={assets.cancel_icon} alt="Cancel" className="w-5" />
                </button>
                <button
                  onClick={() => completeAppointment(item._id)}
                  className="w-9 h-9 flex items-center justify-center bg-green-50 border border-green-200 rounded-xl hover:bg-green-100 transition shadow-sm"
                >
                  <img src={assets.tick_icon} alt="Complete" className="w-5" />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default DoctorAppointments
