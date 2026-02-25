import axios from "axios";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";

function CreateSessionModal({ setbox, onSessionCreated }) {
  // Add onSessionCreated prop
  const [formData, setFormData] = useState({
    role: "",
    experience: "",
    topicsToFocus: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async () => {
    // Validate form
    if (
      !formData.role ||
      !formData.experience ||
      !formData.topicsToFocus ||
      !formData.description
    ) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:8000/api/ai/generate-question",
        formData,
        { withCredentials: true }
      );

      console.log(res.data);

      // Call the refresh callback before closing
      if (onSessionCreated) {
        onSessionCreated();
      }

      // Close modal
      setbox(false);
    } catch (error) {
      console.log(error);
      setError(
        error.response?.data?.message ||
          "Failed to generate questions. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white w-96 p-6 rounded-2xl shadow-xl relative">
        <button
          onClick={() => setbox(false)}
          disabled={loading}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FaTimes size={18} />
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-1">
          Start Interview Journey
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Fill details to get personalized questions
        </p>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm">
            {error}
          </div>
        )}

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
            disabled={loading}
            className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-amber-400 disabled:bg-gray-100 disabled:cursor-not-allowed"
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
            disabled={loading}
            className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-amber-400 disabled:bg-gray-100 disabled:cursor-not-allowed"
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
            disabled={loading}
            className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-amber-400 disabled:bg-gray-100 disabled:cursor-not-allowed"
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
            disabled={loading}
            className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-amber-400 resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
          ></textarea>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-black text-white py-3 rounded-xl hover:bg-amber-600 transition flex items-center justify-center gap-2 font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Generating Questions...</span>
            </>
          ) : (
            <>
              <IoMdAdd size={20} />
              <span>Create Session</span>
            </>
          )}
        </button>

        {/* Loading Overlay */}
        {loading && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-2xl flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-amber-200 border-t-amber-500 rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600 font-medium">
                Creating your interview session...
              </p>
              <p className="text-sm text-gray-400 mt-2">
                This may take a few moments
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CreateSessionModal;
