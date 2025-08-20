import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
import { Calendar, Clock, MapPin, XCircle, CheckCircle } from "lucide-react";

const MyAppointments = () => {
  const { backendUrl, token } = useContext(AppContext);
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [payment, setPayment] = useState("");

  const months = [
    "Jan","Feb","Mar","Apr","May","Jun",
    "Jul","Aug","Sep","Oct","Nov","Dec",
  ];

  // Format slot date (eg: 20_01_2000 -> 20 Jan 2000)
  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_");
    return `${dateArray[0]} ${months[Number(dateArray[1])]} ${dateArray[2]}`;
  };

  // Fetch appointments
  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/user/appointments",
        { headers: { token } }
      );
      setAppointments(data.appointments.reverse());
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Cancel appointment
  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/cancel-appointment",
        { appointmentId },
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
      } else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Init Razorpay
  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Appointment Payment",
      description: "Doctor Consultation Payment",
      order_id: order.id,
      handler: async (response) => {
        try {
          const { data } = await axios.post(
            backendUrl + "/api/user/verifyRazorpay",
            response,
            { headers: { token } }
          );
          if (data.success) {
            navigate("/my-appointments");
            getUserAppointments();
          }
        } catch (error) {
          toast.error(error.message);
        }
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  // Razorpay API call
  const appointmentRazorpay = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/payment-razorpay",
        { appointmentId },
        { headers: { token } }
      );
      if (data.success) initPay(data.order);
      else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Stripe API call
  const appointmentStripe = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/payment-stripe",
        { appointmentId },
        { headers: { token } }
      );
      if (data.success) window.location.replace(data.session_url);
      else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) getUserAppointments();
  }, [token]);

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-gray-800 border-b pb-3">
        My Appointments
      </h2>

      <div className="mt-6 space-y-6">
        {appointments.map((item, index) => (
          <div
            key={index}
            className="relative flex flex-col sm:flex-row bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-5 border"
          >
            {/* Doctor Image */}
            <div className="flex-shrink-0 flex justify-center sm:justify-start">
              <img
                src={item.docData.image}
                alt={item.docData.name}
                className="w-32 h-32 object-cover rounded-xl border"
              />
            </div>

            {/* Appointment Info */}
            <div className="flex-1 sm:ml-6 mt-4 sm:mt-0">
              <h3 className="text-lg font-semibold text-gray-900">
                {item.docData.name}
              </h3>
              <p className="text-primary font-medium">{item.docData.speciality}</p>

              <div className="mt-2 space-y-1 text-gray-600 text-sm">
                <p className="flex items-center gap-2">
                  <MapPin size={16} className="text-gray-500" /> 
                  {item.docData.address.line1}, {item.docData.address.line2}
                </p>
                <p className="flex items-center gap-2">
                  <Calendar size={16} className="text-gray-500" />{" "}
                  {slotDateFormat(item.slotDate)}
                </p>
                <p className="flex items-center gap-2">
                  <Clock size={16} className="text-gray-500" /> {item.slotTime}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-4 sm:mt-0 flex flex-col gap-2 justify-center items-center sm:items-end">
              {!item.cancelled && !item.payment && !item.isCompleted && payment !== item._id && (
                <button
                  onClick={() => setPayment(item._id)}
                  className="px-4 py-2 text-sm font-medium border rounded-lg text-gray-700 hover:bg-primary hover:text-white transition"
                >
                  Pay Online
                </button>
              )}

              {/* Payment Options */}
              {!item.cancelled && !item.payment && !item.isCompleted && payment === item._id && (
                <>
                  <button
                    onClick={() => appointmentStripe(item._id)}
                    className="px-4 py-2 w-32 border rounded-lg flex items-center justify-center hover:bg-gray-100 transition"
                  >
                    <img src={assets.stripe_logo} className="h-5" alt="Stripe" />
                  </button>
                  {/* <button
                    onClick={() => appointmentRazorpay(item._id)}
                    className="px-4 py-2 w-32 border rounded-lg flex items-center justify-center hover:bg-gray-100 transition"
                  >
                    <img src={assets.razorpay_logo} className="h-5" alt="Razorpay" />
                  </button> */}
                </>
              )}

              {/* Status Buttons */}
              {!item.cancelled && item.payment && !item.isCompleted && (
                <span className="px-4 py-2 text-sm font-semibold text-green-600 bg-green-100 border border-green-300 rounded-lg">
                  Paid
                </span>
              )}
              {item.isCompleted && (
                <span className="px-4 py-2 text-sm font-semibold text-blue-600 bg-blue-100 border border-blue-300 rounded-lg flex items-center gap-1">
                  <CheckCircle size={16} /> Completed
                </span>
              )}
              {!item.cancelled && !item.isCompleted && (
                <button
                  onClick={() => cancelAppointment(item._id)}
                  className="px-4 py-2 text-sm font-medium border rounded-lg text-red-600 hover:bg-red-600 hover:text-white transition"
                >
                  Cancel
                </button>
              )}
              {item.cancelled && !item.isCompleted && (
                <span className="px-4 py-2 text-sm font-semibold text-red-600 bg-red-100 border border-red-300 rounded-lg flex items-center gap-1">
                  <XCircle size={16} /> Cancelled
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;
