import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/Axiosinstance";
import { API_PATH } from "../utils/Apipath";
import { UserContext } from "../context/UserContext";

function Login() {
  const navigate = useNavigate();
  const { updateUser } = useContext(UserContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password.length < 5) {
      setError("Password must be at least 5 characters");
      return;
    }

    try {
      setLoading(true);

      const response = await axiosInstance.post(API_PATH.AUTH.LOGIN, formData);

      if (response.data?.success) {
        // ✅ Update global auth state
        updateUser(response.data.user);

        // ✅ Redirect
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-full max-w-md p-8 rounded-xl bg-gray-900 border border-gray-800">
        <h1 className="text-2xl font-bold text-center">
          Welcome Back to{" "}
          <span className="text-blue-500">InterviewPrep AI</span>
        </h1>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className={`w-full px-4 py-2 bg-black border rounded-lg ${
                error ? "border-red-500" : "border-gray-700"
              }`}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 rounded-lg disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-sm text-center mt-6 text-gray-400">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-500">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
