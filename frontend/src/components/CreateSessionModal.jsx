import axios from "axios";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";

function CreateSessionModal({ setbox }) {
  const [formData, setFormData] = useState({
    role: "",
    experience: "",
    topicsToFocus: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try{
       const res = await axios.post(
         "http://localhost:8000/api/ai/generate-question",
         formData,
		 {withCredentials:true}
       );
	   console.log(res.data)
	}catch(error){
     console.log(error)
	}
    setbox(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white w-96 p-6 rounded-2xl shadow-xl relative">
        <button
          onClick={() => setbox(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <FaTimes size={18} />
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-1">
          Start Interview Journey
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Fill details to get personalized questions
        </p>

        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Role
          </label>
          <input
            type="text"
            name="role"
            placeholder="e.g. Frontend Developer"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-amber-400"
          />
        </div>

        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Experience
          </label>
          <input
            type="text"
            name="experience"
            placeholder="e.g. 3 years"
            value={formData.experience}
            onChange={handleChange}
            className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-amber-400"
          />
        </div>

        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Topics to Focus
          </label>
          <input
            type="text"
            name="topicsToFocus"
            placeholder="e.g. React, JavaScript, CSS"
            value={formData.topicsToFocus}
            onChange={handleChange}
            className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-amber-400"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            name="description"
            placeholder="e.g. I want to focus on system design"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-amber-400 resize-none"
          ></textarea>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-black text-white py-3 rounded-xl hover:bg-amber-600 transition flex items-center justify-center gap-2 font-medium"
        >
          <IoMdAdd size={20} />
          Create Session
        </button>
      </div>
    </div>
  );
}

export default CreateSessionModal;
