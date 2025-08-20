import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'

const DoctorDashboard = () => {
  const { dToken, dashData, getDashData, cancelAppointment, completeAppointment } = useContext(DoctorContext)
  const { slotDateFormat, currency } = useContext(AppContext)

  useEffect(() => {
    if (dToken) {
      getDashData()
    }
  }, [dToken])

  return dashData && (
    <div className="m-6 grid lg:grid-cols-3 gap-8">

      {/* Left Side – Stats */}
      <div className="lg:col-span-1 space-y-6">
        {[
          { label: "Earnings", value: `${currency} ${dashData.earnings}`, icon: assets.earning_icon, gradient: "from-emerald-400 to-teal-500" },
          { label: "Appointments", value: dashData.appointments, icon: assets.appointments_icon, gradient: "from-indigo-400 to-purple-500" },
          { label: "Patients", value: dashData.patients, icon: assets.patients_icon, gradient: "from-pink-400 to-rose-500" }
        ].map((stat, i) => (
          <div
            key={i}
            className={`relative p-6 rounded-2xl shadow-lg bg-gradient-to-br ${stat.gradient} text-white overflow-hidden group`}
          >
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all"></div>
            <div className="flex items-center gap-4 relative z-10">
              <div className="p-3 bg-white/20 backdrop-blur-md rounded-xl shadow-inner">
                <img src={stat.icon} alt="" className="w-8 h-8" />
              </div>
              <div>
                <p className="text-3xl font-extrabold drop-shadow">{stat.value}</p>
                <p className="text-sm opacity-90">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Right Side – Latest Bookings */}
      <div className="lg:col-span-2 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="flex items-center gap-2 px-6 py-4 border-b bg-gradient-to-r from-primary/10 to-transparent">
          <img src={assets.list_icon} alt="" className="w-5" />
          <p className="font-semibold text-gray-700">Latest Bookings</p>
        </div>

        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/40 to-gray-200"></div>

          <div className="divide-y">
            {dashData.latestAppointments.slice(0, 5).map((item, index) => (
              <div key={index} className="relative flex items-start gap-4 px-10 py-6 hover:bg-gray-50 transition">
                {/* Timeline Dot */}
                <div className="absolute left-[30px] w-4 h-4 rounded-full bg-primary/70 border-4 border-white shadow"></div>

                <img className="rounded-full w-12 h-12 border shadow-md" src={item.userData.image} alt="" />
                <div className="flex-1">
                  <p className="text-gray-900 font-semibold">{item.userData.name}</p>
                  <p className="text-gray-500 text-sm">Booking on {slotDateFormat(item.slotDate)}</p>
                </div>

                {item.cancelled ? (
                  <span className="px-3 py-1 text-xs font-bold rounded-full bg-red-100 text-red-500 shadow-sm">Cancelled</span>
                ) : item.isCompleted ? (
                  <span className="px-3 py-1 text-xs font-bold rounded-full bg-green-100 text-green-600 shadow-sm">Completed</span>
                ) : (
                  <div className="flex gap-2">
                    <button 
                      onClick={() => cancelAppointment(item._id)} 
                      className="w-9 h-9 flex items-center justify-center rounded-full bg-red-50 hover:bg-red-100 shadow transition"
                    >
                      <img src={assets.cancel_icon} alt="" className="w-5" />
                    </button>
                    <button 
                      onClick={() => completeAppointment(item._id)} 
                      className="w-9 h-9 flex items-center justify-center rounded-full bg-green-50 hover:bg-green-100 shadow transition"
                    >
                      <img src={assets.tick_icon} alt="" className="w-5" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}

export default DoctorDashboard
