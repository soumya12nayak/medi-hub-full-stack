import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { toast } from "react-toastify";
import axios from "axios";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Lock,
  GraduationCap,
  Briefcase,
  MapPin,
  Stethoscope,
  Wallet,
  Upload,
} from "lucide-react";

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 Year");
  const [fees, setFees] = useState("");
  const [about, setAbout] = useState("");
  const [speciality, setSpeciality] = useState("General physician");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");

  const { backendUrl } = useContext(AppContext);
  const { aToken } = useContext(AdminContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (!docImg) {
        return toast.error("Image Not Selected");
      }

      const formData = new FormData();
      formData.append("image", docImg);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("fees", Number(fees));
      formData.append("about", about);
      formData.append("speciality", speciality);
      formData.append("degree", degree);
      formData.append("address", JSON.stringify({ line1: address1, line2: address2 }));

      const { data } = await axios.post(
        backendUrl + "/api/admin/add-doctor",
        formData,
        { headers: { aToken } }
      );

      if (data.success) {
        toast.success(data.message);
        setDocImg(false);
        setName("");
        setPassword("");
        setEmail("");
        setAddress1("");
        setAddress2("");
        setDegree("");
        setAbout("");
        setFees("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  return (
    <motion.form
      onSubmit={onSubmitHandler}
      className="m-5 w-full flex justify-center"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-5xl border border-gray-200 hover:shadow-3xl transition duration-300">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          ➕ Add <span className="text-primary">Doctor</span>
        </h2>

        {/* Upload Image */}
        <div className="flex items-center gap-6 mb-10">
          <label
            htmlFor="doc-img"
            className="cursor-pointer group relative w-20 h-20 flex items-center justify-center rounded-full border-2 border-dashed border-gray-300 hover:border-primary transition"
          >
            <img
              className="w-20 h-20 object-cover rounded-full"
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt=""
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 rounded-full transition">
              <Upload size={20} />
            </div>
          </label>
          <input
            onChange={(e) => setDocImg(e.target.files[0])}
            type="file"
            id="doc-img"
            hidden
          />
          <p className="text-gray-600">Upload doctor picture</p>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left */}
          <div className="space-y-4">
            <div className="flex items-center border rounded-xl px-3 py-2 hover:border-primary transition">
              <User className="text-gray-400 mr-2" size={18} />
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="w-full outline-none"
                type="text"
                placeholder="Doctor Name"
                required
              />
            </div>

            <div className="flex items-center border rounded-xl px-3 py-2 hover:border-primary transition">
              <Mail className="text-gray-400 mr-2" size={18} />
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="w-full outline-none"
                type="email"
                placeholder="Doctor Email"
                required
              />
            </div>

            <div className="flex items-center border rounded-xl px-3 py-2 hover:border-primary transition">
              <Lock className="text-gray-400 mr-2" size={18} />
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="w-full outline-none"
                type="password"
                placeholder="Password"
                required
              />
            </div>

            <div className="flex items-center border rounded-xl px-3 py-2 hover:border-primary transition">
              <Briefcase className="text-gray-400 mr-2" size={18} />
              <select
                onChange={(e) => setExperience(e.target.value)}
                value={experience}
                className="w-full outline-none bg-transparent"
              >
                {Array.from({ length: 15 }, (_, i) => (
                  <option key={i + 1} value={`${i + 1} Year`}>
                    {i + 1} Year{i + 1 > 1 ? "s" : ""}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center border rounded-xl px-3 py-2 hover:border-primary transition">
              <Wallet className="text-gray-400 mr-2" size={18} />
              <input
                onChange={(e) => setFees(e.target.value)}
                value={fees}
                className="w-full outline-none"
                type="number"
                placeholder="Doctor Fees"
                required
              />
            </div>
          </div>

          {/* Right */}
          <div className="space-y-4">
            <div className="flex items-center border rounded-xl px-3 py-2 hover:border-primary transition">
              <Stethoscope className="text-gray-400 mr-2" size={18} />
              <select
                onChange={(e) => setSpeciality(e.target.value)}
                value={speciality}
                className="w-full outline-none bg-transparent"
              >
                <option value="General physician">General physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>

            <div className="flex items-center border rounded-xl px-3 py-2 hover:border-primary transition">
              <GraduationCap className="text-gray-400 mr-2" size={18} />
              <input
                onChange={(e) => setDegree(e.target.value)}
                value={degree}
                className="w-full outline-none"
                type="text"
                placeholder="Degree"
                required
              />
            </div>

            <div className="flex items-center border rounded-xl px-3 py-2 hover:border-primary transition">
              <MapPin className="text-gray-400 mr-2" size={18} />
              <div className="flex flex-col w-full">
                <input
                  onChange={(e) => setAddress1(e.target.value)}
                  value={address1}
                  className="outline-none border-b border-gray-200 pb-1 mb-1"
                  type="text"
                  placeholder="Address Line 1"
                  required
                />
                <input
                  onChange={(e) => setAddress2(e.target.value)}
                  value={address2}
                  className="outline-none"
                  type="text"
                  placeholder="Address Line 2"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* About Doctor */}
        <div className="mt-6">
          <p className="mb-2 text-gray-700 font-medium">About Doctor</p>
          <textarea
            onChange={(e) => setAbout(e.target.value)}
            value={about}
            className="w-full px-4 py-3 border rounded-xl focus:border-primary outline-none transition"
            rows={5}
            placeholder="Write about doctor"
          ></textarea>
        </div>

        {/* Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="bg-primary w-full md:w-auto px-10 py-3 mt-6 text-white font-semibold rounded-full shadow-md hover:shadow-xl transition"
        >
          Add Doctor
        </motion.button>
      </div>
    </motion.form>
  );
};

export default AddDoctor;
