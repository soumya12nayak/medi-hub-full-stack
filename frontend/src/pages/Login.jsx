import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [state, setState] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { backendUrl, token, setToken } = useContext(AppContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (state === "Sign Up") {
      const { data } = await axios.post(backendUrl + "/api/user/register", {
        name,
        email,
        password,
      });

      if (data.success) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
      } else {
        toast.error(data.message);
      }
    } else {
      const { data } = await axios.post(backendUrl + "/api/user/login", {
        email,
        password,
      });

      if (data.success) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
      } else {
        toast.error(data.message);
      }
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <div className="flex min-h-screen">
      {/* Left Side with illustration + gradient */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white items-center justify-center relative overflow-hidden rounded">
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Animated heartbeat line */}
          <svg
            className="w-4/5 opacity-20 animate-pulse"
            viewBox="0 0 500 100"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="white"
            strokeWidth="3"
          >
            <path d="M 0 50 L 100 50 L 120 20 L 140 80 L 160 50 L 220 50 L 240 20 L 260 80 L 280 50 L 500 50" />
          </svg>
        </div>
        <div className="relative z-10 text-center px-6">
          <h2 className="text-4xl font-bold mb-4">Your Health, Our Priority</h2>
          <p className="text-lg text-gray-100 max-w-md mx-auto">
            Book appointments with trusted doctors in just a few clicks.
          </p>
        </div>
      </div>

      {/* Right Side Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <form
          onSubmit={onSubmitHandler}
          className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8"
        >
          <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            {state === "Sign Up" ? "Create Account" : "Login"}
          </h2>

          {/* Full Name */}
          {state === "Sign Up" && (
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Full Name</label>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                required
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          )}

          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              required
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              required
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Button */}
          <button className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-md hover:scale-[1.02] active:scale-95 transition">
            {state === "Sign Up" ? "Sign Up" : "Login"}
          </button>

          {/* Switch */}
          <p className="text-center text-gray-600 mt-5">
            {state === "Sign Up" ? (
              <>
                Already have an account?{" "}
                <span
                  onClick={() => setState("Login")}
                  className="text-blue-600 font-semibold cursor-pointer hover:underline"
                >
                  Login
                </span>
              </>
            ) : (
              <>
                New here?{" "}
                <span
                  onClick={() => setState("Sign Up")}
                  className="text-blue-600 font-semibold cursor-pointer hover:underline"
                >
                  Sign Up
                </span>
              </>
            )}
          </p>

          {/* Extra Benefits */}
          <ul className="mt-6 space-y-2 text-sm text-gray-600">
            <li>✅ Book doctor instantly</li>
            <li>✅ 24/7 patient support</li>
            <li>✅ Verified professionals only</li>
          </ul>
        </form>
      </div>
    </div>
  );
};

export default Login;
