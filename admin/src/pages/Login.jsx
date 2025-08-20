import axios from 'axios'
import React, { useContext, useState } from 'react'
import { DoctorContext } from '../context/DoctorContext'
import { AdminContext } from '../context/AdminContext'
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'
import { User, Lock, LogIn } from 'lucide-react'

const Login = () => {

  const [state, setState] = useState('Admin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const backendUrl = import.meta.env.VITE_BACKEND_URL

  const { setDToken } = useContext(DoctorContext)
  const { setAToken } = useContext(AdminContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (state === 'Admin') {
        const { data } = await axios.post(backendUrl + '/api/admin/login', { email, password })
        if (data.success) {
          setAToken(data.token)
          localStorage.setItem('aToken', data.token)
          toast.success("Admin Login Successful")
        } else {
          toast.error(data.message)
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/doctor/login', { email, password })
        if (data.success) {
          setDToken(data.token)
          localStorage.setItem('dToken', data.token)
          toast.success("Doctor Login Successful")
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error("Something went wrong")
    }
  }

  return (
    <div className="min-h-[100vh] flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black px-4">

      <motion.form
        onSubmit={onSubmitHandler}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative backdrop-blur-xl bg-white/10 shadow-2xl rounded-2xl p-8 sm:p-10 w-full max-w-md border border-white/20"
      >
        {/* Tabs */}
        <div className="flex justify-between mb-6">
          {['Admin', 'Doctor'].map((role) => (
            <button
              key={role}
              type="button"
              onClick={() => setState(role)}
              className={`relative px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 
                ${state === role ? "bg-primary text-white shadow-md scale-105" : "text-gray-200 hover:text-white hover:scale-105"}`}
            >
              {role}
            </button>
          ))}
        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-white mb-8">
          {state} <span className="text-primary">Login</span>
        </h2>

        {/* Email */}
        <div className="mb-4">
          <label className="text-gray-200 text-sm">Email</label>
          <div className="relative mt-1">
            <User className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="w-full pl-10 p-2 rounded-md bg-white/20 border border-white/30 text-white 
              focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder-gray-300"
              type="email"
              placeholder="Enter your email"
              required
            />
          </div>
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="text-gray-200 text-sm">Password</label>
          <div className="relative mt-1">
            <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="w-full pl-10 p-2 rounded-md bg-white/20 border border-white/30 text-white 
              focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder-gray-300"
              type="password"
              placeholder="Enter your password"
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-indigo-600 text-white py-2 rounded-md text-lg font-semibold shadow-lg transition-all duration-300"
        >
          <LogIn size={18} /> Login
        </motion.button>

        {/* Toggle Text */}
        <p className="text-center text-gray-300 mt-4 text-sm">
          {state === 'Admin'
            ? <>Doctor Login? <span onClick={() => setState('Doctor')} className="text-primary underline cursor-pointer">Click here</span></>
            : <>Admin Login? <span onClick={() => setState('Admin')} className="text-primary underline cursor-pointer">Click here</span></>
          }
        </p>
      </motion.form>
    </div>
  )
}

export default Login
