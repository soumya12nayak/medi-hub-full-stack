import React, { useContext, useEffect, useMemo } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';

// recharts
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

// ---- Stat Dial ----
const StatDial = ({ label, value, max, icon }) => {
  const radius = 34; // smaller radius
  const circumference = 2 * Math.PI * radius;
  const pct = Math.min(100, Math.round((value / (max || 1)) * 100));
  const dash = (pct / 100) * circumference;

  return (
    <div className="relative group rounded-xl p-3 bg-white/60 backdrop-blur-xl border border-white/30 shadow hover:shadow-md transition-all">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-primary/80 to-blue-400/80 text-white grid place-items-center shadow">
          <img src={icon} alt="" className="w-4 h-4" />
        </div>
        <span className="text-xs text-gray-500">{label}</span>
      </div>
      <div className="relative w-20 h-20 mx-auto">
        <svg className="-rotate-90 w-20 h-20">
          <circle cx="40" cy="40" r={radius} className="fill-none stroke-gray-200" strokeWidth="7" />
          <circle
            cx="40" cy="40" r={radius}
            className="fill-none stroke-primary transition-all duration-700"
            strokeWidth="7"
            strokeDasharray={`${dash} ${circumference - dash}`}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 grid place-items-center">
          <div className="text-center">
            <div className="text-base font-semibold text-gray-800">{value}</div>
            <div className="text-[10px] text-gray-500">{pct}%</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ---- Status Chip ----
const StatusChip = ({ status }) => {
  const map = {
    completed: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    cancelled: 'bg-rose-100 text-rose-700 border-rose-200',
    pending: 'bg-amber-100 text-amber-700 border-amber-200',
  };
  return (
    <span className={`px-2 py-0.5 text-[10px] rounded-full border ${map[status] || map.pending}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

const Dashboard = () => {
  const { aToken, getDashData, cancelAppointment, dashData } = useContext(AdminContext);
  const { slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (aToken) getDashData();
  }, [aToken]);

  const {
    doctors = 0,
    patients = 0,
    appointments = 0,
    latestAppointments = [],
  } = dashData || {};

  // ---- Chart data ----
  const charts = useMemo(() => {
    const counts = new Map();
    latestAppointments.forEach(a => {
      counts.set(a.slotDate, (counts.get(a.slotDate) || 0) + 1);
    });

    const perDay = [...counts.entries()]
      .map(([slotDate, count]) => ({
        label: slotDateFormat(slotDate),
        appointments: count,
      }))
      .sort((a, b) => new Date(a.label) - new Date(b.label))
      .slice(-7);

    let cum = 0;
    const growth = perDay.map(d => {
      cum += d.appointments;
      return { label: d.label, patients: cum };
    });

    return { perDay, growth };
  }, [latestAppointments, slotDateFormat]);

  const dialMax = Math.max(doctors, patients, appointments, 10);

  if (!dashData) return null;

  return (
    <div className="min-h-screen w-full px-3 py-4">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Header */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary/20 via-sky-100 to-indigo-100 p-4">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <h1 className="text-xl md:text-2xl font-semibold text-gray-800">Admin Analytics</h1>
              <p className="text-xs text-gray-600">Live overview of clinic activity</p>
            </div>
            
          </div>
        </div>

        {/* Simple Stat Cards */}
<div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
  <div className="bg-white rounded-xl border border-gray-200 p-5 flex items-center justify-between shadow-sm hover:shadow-md transition-all">
    <div>
      <h2 className="text-2xl font-semibold text-gray-800">{doctors}</h2>
      <p className="text-gray-500 text-sm">Doctors</p>
    </div>
    <img src={assets.doctor_icon} alt="Doctors" className="w-10 h-10" />
  </div>

  <div className="bg-white rounded-xl border border-gray-200 p-5 flex items-center justify-between shadow-sm hover:shadow-md transition-all">
    <div>
      <h2 className="text-2xl font-semibold text-gray-800">{appointments}</h2>
      <p className="text-gray-500 text-sm">Appointments</p>
    </div>
    <img src={assets.appointments_icon} alt="Appointments" className="w-10 h-10" />
  </div>

  <div className="bg-white rounded-xl border border-gray-200 p-5 flex items-center justify-between shadow-sm hover:shadow-md transition-all">
    <div>
      <h2 className="text-2xl font-semibold text-gray-800">{patients}</h2>
      <p className="text-gray-500 text-sm">Patients</p>
    </div>
    <img src={assets.patients_icon} alt="Patients" className="w-10 h-10" />
  </div>
</div>


        {/* Latest Bookings */}
        <div className="rounded-xl p-3 bg-white/70 backdrop-blur-xl border border-white/40">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <img src={assets.list_icon} alt="" className="w-4 h-4" />
              <h3 className="text-sm font-semibold text-gray-800">Latest Bookings</h3>
            </div>
            <span className="text-[10px] text-gray-500">Recent first</span>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
            {latestAppointments.slice(0, 10).map((item, idx) => {
              const status = item.cancelled ? 'cancelled' : item.isCompleted ? 'completed' : 'pending';
              return (
                <div
                  key={idx}
                  className="min-w-[200px] rounded-xl border border-white/40 bg-white/70 backdrop-blur-xl p-3 shadow hover:shadow-md hover:-translate-y-0.5 transition-all"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <img src={item.docData.image} alt="" className="w-8 h-8 rounded-full object-cover bg-gray-100" />
                    <div className="leading-tight">
                      <p className="text-xs font-semibold text-gray-800">{item.docData.name}</p>
                      <p className="text-[10px] text-gray-500">{item.docData.speciality}</p>
                    </div>
                    <div className="ml-auto">
                      <StatusChip status={status} />
                    </div>
                  </div>
                  <div className="text-[11px] text-gray-600">
                    <div className="flex items-center gap-1">
                      <img src={assets.calendar_icon || assets.list_icon} alt="" className="w-3 h-3 opacity-70" />
                      <span>{slotDateFormat(item.slotDate)} • {item.slotTime.toLowerCase()}</span>
                    </div>
                  </div>

                  {!item.cancelled && !item.isCompleted && (
                    <button
                      onClick={() => cancelAppointment(item._id)}
                      className="mt-3 w-full text-[10px] px-2 py-1.5 rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50 transition"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="rounded-xl p-3 bg-white/70 backdrop-blur-xl border border-white/40 shadow">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-gray-800">Appointments (7 days)</h3>
              <span className="text-[10px] text-gray-500">Bar</span>
            </div>
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={charts.perDay} barCategoryGap="15%">
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="label" tick={{ fontSize: 10 }} />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="appointments" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-xl p-3 bg-white/70 backdrop-blur-xl border border-white/40 shadow">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-gray-800">Patient Growth</h3>
              <span className="text-[10px] text-gray-500">Line</span>
            </div>
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={charts.growth}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="label" tick={{ fontSize: 10 }} />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Line type="monotone" dataKey="patients" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        

      </div>
    </div>
  );
};

export default Dashboard;
