import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/Axiosinstance";
import { API_PATH } from "../utils/Apipath";
import { UserContext } from "../context/UserContext";

const Signup = () => {
  const navigate = useNavigate();
  const { updateUser } = useContext(UserContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [profileImg, setProfileImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleFileChange = (e) => {
    setProfileImg(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);

      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("password", formData.password);

      if (profileImg) {
        data.append("profileImg", profileImg);
      }

      const response = await axiosInstance.post(API_PATH.AUTH.SIGNUP, data);

      if (response.data?.success) {
        // ✅ Update auth context
        updateUser(response.data.user);

        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-full max-w-md p-8 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-2xl font-bold text-center">Create Account</h2>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Username"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg"
          />

          <input type="file" accept="image/*" onChange={handleFileChange} />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 rounded-lg disabled:opacity-60"
          >
            {loading ? "Signing up..." : "Signup"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
