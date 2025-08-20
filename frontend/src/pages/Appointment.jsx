import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import RelatedDoctors from "../components/RelatedDoctors";
import axios from "axios";
import { toast } from "react-toastify";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol, backendUrl, token, getDoctosData } =
    useContext(AppContext);
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const [docInfo, setDocInfo] = useState(false);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  const navigate = useNavigate();

  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
  };

  const getAvailableSolts = async () => {
    setDocSlots([]);
    let today = new Date();

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();

        const slotDate = day + "_" + month + "_" + year;
        const slotTime = formattedTime;

        const isSlotAvailable =
          docInfo.slots_booked[slotDate] &&
          docInfo.slots_booked[slotDate].includes(slotTime)
            ? false
            : true;

        if (isSlotAvailable) {
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime,
          });
        }
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      setDocSlots((prev) => [...prev, timeSlots]);
    }
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.warning("Login to book appointment");
      return navigate("/login");
    }

    const date = docSlots[slotIndex][0].datetime;
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    const slotDate = day + "_" + month + "_" + year;

    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/book-appointment",
        { docId, slotDate, slotTime },
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        getDoctosData();
        navigate("/my-appointments");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (doctors.length > 0) {
      fetchDocInfo();
    }
  }, [doctors, docId]);

  useEffect(() => {
    if (docInfo) {
      getAvailableSolts();
    }
  }, [docInfo]);

  return docInfo ? (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* ---------- Doctor Details ----------- */}
      <div className="flex flex-col lg:flex-row gap-10">
  {/* Doctor Image */}
  <div className="flex-shrink-0">
    <img
      className="w-full max-w-[14rem] lg:max-w-[18rem] rounded-2xl shadow-lg border-4 border-white"
      src={docInfo.image}
      alt=""
    />
  </div>



        {/* Doctor Info */}
        <div className="flex-1 bg-white/80 backdrop-blur-md shadow-xl rounded-2xl p-8 border border-gray-200">
          <p className="flex items-center gap-2 text-3xl font-bold text-gray-800">
            {docInfo.name}
            <img className="w-6" src={assets.verified_icon} alt="" />
          </p>
          <div className="flex items-center gap-3 mt-2 text-gray-600">
            <p className="text-lg">
              {docInfo.degree} — {docInfo.speciality}
            </p>
            <span className="px-3 py-1 bg-gradient-to-r from-green-400 to-emerald-500 text-white text-xs rounded-full shadow">
              {docInfo.experience}
            </span>
          </div>

          {/* About */}
          <div className="mt-6">
            <p className="flex items-center gap-2 text-lg font-semibold text-gray-700">
              About <img className="w-4" src={assets.info_icon} alt="" />
            </p>
            <p className="mt-2 text-gray-600 leading-relaxed">
              {docInfo.about}
            </p>
          </div>

          {/* Fees */}
          <p className="mt-6 text-lg font-medium text-gray-700">
            Appointment Fee:{" "}
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
              {currencySymbol}
              {docInfo.fees}
            </span>
          </p>
        </div>
      </div>

      {/* ---------- Booking Slots ----------- */}
      <div className="mt-12">
        <p className="text-xl font-semibold text-gray-800">Book Your Slot</p>

        {/* Days */}
        <div className="flex gap-4 items-center overflow-x-auto mt-6 pb-2">
          {docSlots.length &&
            docSlots.map((item, index) => (
              <div
                onClick={() => setSlotIndex(index)}
                key={index}
                className={`text-center px-5 py-4 rounded-xl cursor-pointer shadow-sm transition-all ${
                  slotIndex === index
                    ? "bg-gradient-to-r from-primary to-purple-500 text-white shadow-md scale-105"
                    : "border border-gray-200 text-gray-600 bg-white"
                }`}
              >
                <p className="font-medium">
                  {item[0] && daysOfWeek[item[0].datetime.getDay()]}
                </p>
                <p className="text-lg font-bold">
                  {item[0] && item[0].datetime.getDate()}
                </p>
              </div>
            ))}
        </div>

        {/* Times */}
        <div className="flex gap-3 items-center overflow-x-auto mt-6">
          {docSlots.length &&
            docSlots[slotIndex].map((item, index) => (
              <p
                onClick={() => setSlotTime(item.time)}
                key={index}
                className={`px-5 py-2 rounded-full cursor-pointer transition-all ${
                  item.time === slotTime
                    ? "bg-gradient-to-r from-primary to-purple-500 text-white shadow-md scale-105"
                    : "border border-gray-300 text-gray-600 bg-white hover:border-primary"
                }`}
              >
                {item.time.toLowerCase()}
              </p>
            ))}
        </div>

        {/* CTA */}
        <div className="mt-10">
          <button
            onClick={bookAppointment}
            className="w-full lg:w-auto px-10 py-4 text-lg font-semibold text-white rounded-xl bg-gradient-to-r from-primary to-purple-500 shadow-lg hover:scale-105 transition-transform"
          >
            Confirm Appointment
          </button>
        </div>
      </div>

      {/* ---------- Related Doctors ----------- */}
      <div className="mt-16">
        <RelatedDoctors speciality={docInfo.speciality} docId={docId} />
      </div>
    </div>
  ) : null;
};

export default Appointment;
