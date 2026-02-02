import React, { useState } from "react";
import { Link } from "react-router-dom";
import AddPhoto from "../components/AddPhoto";
import { validateEmail } from "../utils/Helper";

function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [profileImage, setProfileImage] = useState(null);
  const [error, setError] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // clear specific field error while typing
    setError({
      ...error,
      [e.target.name]: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let hasError = false;

    // ✅ Email validation
    if (!validateEmail(formData.email)) {
      setError((prev) => ({
        ...prev,
        email: "Please enter a valid email address",
      }));
      hasError = true;
    }

    // ✅ Password validation
    if (formData.password.length < 5 || formData.password.length > 12) {
      setError((prev) => ({
        ...prev,
        password: "Password must be between 5 and 12 characters",
      }));
      hasError = true;
    }

    if (hasError) return;

    // ✅ Final data
    const data = {
      ...formData,
      profileImage,
    };

    console.log("Signup Data:", data);
    //api call here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <div className="w-full max-w-md p-8 rounded-2xl bg-gray-900 border border-gray-800">
        <h1 className="text-2xl font-bold text-center">
          Create your <span className="text-blue-500">Account</span>
        </h1>

        <p className="text-gray-400 text-sm text-center mt-2">
          Start generating interview questions instantly
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          {/* PHOTO */}
          <AddPhoto setImage={setProfileImage} image={profileImage} />

          {/* USERNAME */}
          <div>
            <label className="block text-sm mb-1 text-gray-300">Username</label>
            <input
              type="text"
              name="username"
              required
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-black border border-gray-700 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="block text-sm mb-1 text-gray-300">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg bg-black border ${
                error.email ? "border-red-500" : "border-gray-700"
              } focus:outline-none focus:border-blue-500`}
            />
            {error.email && (
              <p className="mt-1 text-sm text-red-500">{error.email}</p>
            )}
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-sm mb-1 text-gray-300">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg bg-black border ${
                error.password ? "border-red-500" : "border-gray-700"
              } focus:outline-none focus:border-blue-500`}
            />
            {error.password && (
              <p className="mt-1 text-sm text-red-500">{error.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition font-medium"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
