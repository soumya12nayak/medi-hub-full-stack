import React, { useContext, useState, useEffect, useRef } from 'react'
import { assets } from '../assets/assets'
import { DoctorContext } from '../context/DoctorContext'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'
import { LogOut, Bell } from 'lucide-react'

const Navbar = () => {
  const { dToken, setDToken } = useContext(DoctorContext)
  const { aToken, setAToken } = useContext(AdminContext)

  const navigate = useNavigate()
  const [openDropdown, setOpenDropdown] = useState(false)
  const dropdownRef = useRef(null)

  const logout = () => {
    navigate('/')
    dToken && setDToken('')
    dToken && localStorage.removeItem('dToken')
    aToken && setAToken('')
    aToken && localStorage.removeItem('aToken')
  }

  const notifications = [
    { id: 1, message: 'New appointment booked' },
    { id: 2, message: '3 patients pending today' },
    { id: 3, message: 'Profile updated successfully' }
  ]

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative">
      {/* Navbar Main */}
      <div className="flex justify-between items-center px-6 sm:px-12 py-3 shadow-md bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500">
        
        {/* Left section */}
        <div className="flex items-center gap-3 text-xs">
          <img
            onClick={() => navigate('/')}
            className="w-32 sm:w-40 cursor-pointer drop-shadow-lg"
            src={assets.admin_logo}
            alt="logo"
          />
          <p className="px-3 py-1 text-[13px] rounded-full font-medium text-white bg-white/20 backdrop-blur-md shadow-inner border border-white/30">
            {aToken ? 'Admin' : 'Doctor'}
          </p>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-6 relative">
          {/* Show only for DOCTOR */}
          {dToken && (
            <>
              {/* Welcome text */}
              <p className="hidden sm:block text-white font-medium text-sm">
                Hi, Doctor
              </p>

              {/* Notification Icon + Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setOpenDropdown(!openDropdown)}
                  className="relative text-white hover:scale-110 transition-transform"
                >
                  <Bell size={20} />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-[10px] text-white rounded-full px-1">
                    {notifications.length}
                  </span>
                </button>

                {/* Dropdown */}
                {openDropdown && (
                  <div className="absolute right-0 mt-3 w-64 bg-white shadow-xl rounded-lg overflow-hidden z-50">
                    <div className="px-4 py-2 bg-gray-100 font-medium text-gray-700">
                      Notifications
                    </div>
                    <ul className="max-h-60 overflow-y-auto">
                      {notifications.map((note) => (
                        <li
                          key={note.id}
                          className="px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 border-b last:border-0"
                        >
                          {note.message}
                        </li>
                      ))}
                    </ul>
                    <div className="px-4 py-2 text-center text-sm text-indigo-600 font-medium cursor-pointer hover:bg-gray-50">
                      View All
                    </div>
                  </div>
                )}
              </div>

              {/* Profile Avatar */}
              <div className="w-9 h-9 flex items-center justify-center rounded-full bg-white text-indigo-600 font-bold shadow-md cursor-pointer hover:scale-105 transition-transform">
                D
              </div>
            </>
          )}

          {/* Logout Button (Visible for both Admin & Doctor) */}
          <button
            onClick={logout}
            className="flex items-center gap-2 bg-white text-indigo-600 font-medium text-sm px-6 py-2 rounded-full shadow hover:scale-105 hover:bg-gray-100 transition-all duration-300"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>

      {/* Bottom glowing line */}
      <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-blue-400 via-pink-400 to-purple-400 animate-pulse"></div>
    </div>
  )
}

export default Navbar
