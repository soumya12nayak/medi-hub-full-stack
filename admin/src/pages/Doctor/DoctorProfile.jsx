import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'
import { motion } from 'framer-motion'

const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData } = useContext(DoctorContext)
  const { currency, backendUrl } = useContext(AppContext)
  const [isEdit, setIsEdit] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")

  const updateProfile = async () => {
    try {
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        about: profileData.about,
        available: profileData.available
      }

      const { data } = await axios.post(backendUrl + '/api/doctor/update-profile', updateData, { headers: { dToken } })

      if (data.success) {
        toast.success(data.message)
        setIsEdit(false)
        getProfileData()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
      console.log(error)
    }
  }

  useEffect(() => {
    if (dToken) {
      getProfileData()
    }
  }, [dToken])

  return profileData && (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="m-6 bg-gradient-to-br from-white via-gray-50 to-gray-100 p-6 rounded-2xl shadow-xl"
    >
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row gap-6 items-center border-b pb-6">
        <img 
          className="w-40 h-40 rounded-2xl object-cover shadow-md border-4 border-white" 
          src={profileData.image} 
          alt="doctor" 
        />
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            {profileData.name}
            <span className={`px-3 py-1 text-xs rounded-full ${profileData.available ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
              {profileData.available ? "Available" : "Unavailable"}
            </span>
          </h2>
          <p className="text-gray-600 mt-1">{profileData.degree} • {profileData.speciality}</p>
          <p className="text-sm mt-1 text-gray-500">Experience: {profileData.experience}</p>

          <p className="mt-3 text-lg font-medium text-gray-700">
            Fee: {currency}{" "}
            {isEdit 
              ? <input type="number" className="border rounded px-2 py-0.5 ml-1" 
                  value={profileData.fees}
                  onChange={(e) => setProfileData(prev => ({ ...prev, fees: e.target.value }))}
                />
              : profileData.fees}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 mt-6 border-b">
        {["overview","about","address","settings"].map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 text-sm font-medium ${activeTab === tab ? "border-b-2 border-primary text-primary" : "text-gray-500 hover:text-gray-800"}`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === "overview" && (
          <div>
            <p className="text-gray-700">
              Welcome to your profile dashboard. Here you can manage your availability, fees and update personal information.
            </p>
          </div>
        )}

        {activeTab === "about" && (
          <div>
            <p className="font-medium text-gray-700 mb-2">About:</p>
            {isEdit ? (
              <textarea 
                rows={5}
                className="w-full border p-3 rounded-lg"
                value={profileData.about}
                onChange={(e) => setProfileData(prev => ({ ...prev, about: e.target.value }))}
              />
            ) : (
              <p className="text-gray-600">{profileData.about}</p>
            )}
          </div>
        )}

        {activeTab === "address" && (
          <div>
            <p className="font-medium text-gray-700 mb-2">Address:</p>
            {isEdit ? (
              <div className="flex flex-col gap-2">
                <input 
                  type="text"
                  className="border p-2 rounded"
                  value={profileData.address.line1}
                  onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))}
                />
                <input 
                  type="text"
                  className="border p-2 rounded"
                  value={profileData.address.line2}
                  onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))}
                />
              </div>
            ) : (
              <p className="text-gray-600">{profileData.address.line1}<br />{profileData.address.line2}</p>
            )}
          </div>
        )}

        {activeTab === "settings" && (
          <div className="flex items-center gap-2">
            <input 
              type="checkbox" 
              checked={profileData.available} 
              onChange={() => isEdit && setProfileData(prev => ({ ...prev, available: !prev.available }))}
            />
            <label className="text-gray-700">Mark as Available</label>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex gap-4">
        {isEdit ? (
          <button 
            onClick={updateProfile} 
            className="px-6 py-2 bg-primary text-white rounded-lg shadow hover:scale-105 transition-all"
          >
            Save
          </button>
        ) : (
          <button 
            onClick={() => setIsEdit(true)} 
            className="px-6 py-2 border border-primary text-primary rounded-lg shadow hover:bg-primary hover:text-white transition-all"
          >
            Edit Profile
          </button>
        )}
      </div>
    </motion.div>
  )
}

export default DoctorProfile
