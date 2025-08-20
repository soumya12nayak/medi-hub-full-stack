import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate, useParams } from "react-router-dom";
import { Stethoscope, Users, Activity } from "lucide-react"; // nice icons

const Doctors = () => {
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter((doc) => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);

  const filters = [
    "General physician",
    "Gynecologist",
    "Dermatologist",
    "Pediatricians",
    "Neurologist",
    "Gastroenterologist",
  ];

  return (
    <div className="flex flex-col sm:flex-row gap-6 mt-6">
      {/* Sidebar Filters */}
      <div
        className={`${showFilter ? "block" : "hidden"
          } sm:block sm:w-1/4 bg-white rounded-xl shadow p-5 border h-fit sticky top-20`}
      >
        <h2 className="text-lg font-semibold mb-4 text-gray-800">
          Filter by Speciality
        </h2>
        <div className="flex flex-col gap-3">
          {filters.map((f, idx) => (
            <p
              key={idx}
              onClick={() =>
                speciality === f ? navigate("/doctors") : navigate(`/doctors/${f}`)
              }
              className={`px-4 py-2 rounded-lg border cursor-pointer transition-all ${speciality === f
                  ? "bg-primary text-white border-primary"
                  : "hover:bg-gray-100"
                }`}
            >
              {f}
            </p>
          ))}
        </div>
      </div>

      {/* Doctors List */}
      <div className="flex-1">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Stethoscope className="text-primary" /> Our Specialists
          </h1>
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="sm:hidden px-4 py-2 rounded-lg border bg-primary text-white text-sm"
          >
            {showFilter ? "Hide Filters" : "Show Filters"}
          </button>
        </div>

        {filterDoc.length === 0 ? (
          <p className="text-gray-500 italic">
            No doctors available for this speciality.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filterDoc.map((item, index) => (
              <div
                onClick={() => {
                  navigate(`/appointment/${item._id}`);
                  scrollTo(0, 0);
                }}
                key={index}
                className="group border rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer bg-white"
              >
                <div className="relative">
                  <img
                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                    src={item.image}
                    alt={item.name}
                  />
                  <span
                    className={`absolute top-4 right-4 px-4 py-2 rounded-full text-sm font-medium ${item.available
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                      }`}
                  >
                    {item.available ? "Available" : "Not Available"}
                  </span>
                </div>

                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {item.name}
                  </h2>
                  <p className="text-sm text-gray-500">{item.speciality}</p>

                  <div className="mt-3 flex items-center gap-3 text-gray-600 text-sm">
                    <Users size={16} /> <span>{item.experience} yrs exp</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600 text-sm">
                    <Activity size={16} /> <span>Consultation ₹{item.fees}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Doctors;
