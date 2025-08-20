import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
import { Mail, Phone, MapPin, User, Calendar } from "lucide-react";

const MyProfile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);
  const { token, backendUrl, userData, setUserData, loadUserProfileData } =
    useContext(AppContext);

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("address", JSON.stringify(userData.address));
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);
      image && formData.append("image", image);

      const { data } = await axios.post(
        backendUrl + "/api/user/update-profile",
        formData,
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return userData ? (
    <div className="max-w-3xl mx-auto bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-8 space-y-6">
      {/* Profile Header */}
      <div className="flex flex-col sm:flex-row items-center gap-6 border-b pb-6">
        <div className="relative">
          <img
            className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
            src={image ? URL.createObjectURL(image) : userData.image}
            alt="profile"
          />
          {isEdit && (
            <>
              <label
                htmlFor="image"
                className="absolute bottom-2 right-2 bg-primary text-white p-2 rounded-full cursor-pointer shadow"
              >
                <img src={assets.upload_icon} className="w-4" alt="upload" />
              </label>
              <input
                onChange={(e) => setImage(e.target.files[0])}
                type="file"
                id="image"
                hidden
              />
            </>
          )}
        </div>
        <div>
          {isEdit ? (
            <input
              className="text-2xl font-semibold border-b border-gray-300 focus:outline-none"
              type="text"
              value={userData.name}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          ) : (
            <h2 className="text-3xl font-bold text-gray-900">
              {userData.name}
            </h2>
          )}
          <p className="text-gray-500">{userData.email}</p>
        </div>
      </div>

      {/* Contact Info */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
          <Phone size={18} /> Contact Information
        </h3>
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-600">
          <div>
            <p className="font-medium">Phone:</p>
            {isEdit ? (
              <input
                className="w-full border rounded-lg px-2 py-1"
                type="text"
                value={userData.phone}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, phone: e.target.value }))
                }
              />
            ) : (
              <p>{userData.phone}</p>
            )}
          </div>
          <div>
            <p className="font-medium">Address:</p>
            {isEdit ? (
              <>
                <input
                  className="w-full border rounded-lg px-2 py-1 mb-1"
                  type="text"
                  value={userData.address.line1}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line1: e.target.value },
                    }))
                  }
                />
                <input
                  className="w-full border rounded-lg px-2 py-1"
                  type="text"
                  value={userData.address.line2}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line2: e.target.value },
                    }))
                  }
                />
              </>
            ) : (
              <p>
                {userData.address.line1} <br /> {userData.address.line2}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Basic Info */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
          <User size={18} /> Basic Information
        </h3>
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-600">
          <div>
            <p className="font-medium">Gender:</p>
            {isEdit ? (
              <select
                className="w-full border rounded-lg px-2 py-1"
                value={userData.gender}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, gender: e.target.value }))
                }
              >
                <option value="Not Selected">Not Selected</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : (
              <p>{userData.gender}</p>
            )}
          </div>
          <div>
            <p className="font-medium">Birthday:</p>
            {isEdit ? (
              <input
                className="w-full border rounded-lg px-2 py-1"
                type="date"
                value={userData.dob}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, dob: e.target.value }))
                }
              />
            ) : (
              <p>{userData.dob}</p>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 pt-6 border-t">
        {isEdit ? (
          <button
            onClick={updateUserProfileData}
            className="px-6 py-2 rounded-lg bg-primary text-white shadow-md hover:opacity-90 transition"
          >
            Save Changes
          </button>
        ) : (
          <button
            onClick={() => setIsEdit(true)}
            className="px-6 py-2 rounded-lg border border-primary text-primary hover:bg-primary hover:text-white transition"
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  ) : null;
};

export default MyProfile;
