import React, { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password.length < 5) {
      setError("Password must be at least 5 characters");
      return;
    }

    console.log(formData);
    // API call later
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <div className="w-full max-w-md p-8 rounded-2xl bg-gray-900 border border-gray-800">
        {/* HEADER */}
        <h1 className="text-2xl font-bold text-center">
          Welcome Back to{" "}
          <span className="text-blue-500">InterviewPrep AI</span>
        </h1>
        <p className="text-gray-400 text-sm text-center mt-2">
          Login to continue your preparation
        </p>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          {/* EMAIL */}
          <div>
            <label className="block text-sm mb-1 text-gray-300">Email</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              className="w-full px-4 py-2 rounded-lg bg-black border border-gray-700 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-sm mb-1 text-gray-300">Password</label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              className={`w-full px-4 py-2 rounded-lg bg-black border ${
                error ? "border-red-500" : "border-gray-700"
              } focus:outline-none focus:border-blue-500`}
            />

            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition font-medium"
          >
            Login
          </button>
        </form>

        {/* FOOTER */}
        <p className="mt-6 text-center text-sm text-gray-400">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
