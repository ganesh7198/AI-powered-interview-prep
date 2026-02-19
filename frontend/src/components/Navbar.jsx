import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { LogOut, User, PlusCircle, Home } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch profile
  const fetchProfile = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/auth/profile", {
        withCredentials: true,
      });

      console.log(res.data);
      if (res.data) {
        setUser(res.data.data || res.data);
      }
    } catch (error) {
      console.log(error);
      console.log("Not logged in");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // Logout
  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:8000/api/v1/auth/logout",
        {},
        { withCredentials: true }
      );
      navigate("/login");
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  return (
    <nav className="bg-linear-to-r from-gray-900 to-gray-800 text-white px-6 py-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/dashboard" className="flex items-center space-x-2">
          <span className="text-2xl font-bold bg-linear-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            InterviewPrep
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          <Link
            to="/dashboard"
            className="flex items-center space-x-1 hover:text-blue-400 transition"
          >
            <Home size={18} />
            <span>Dashboard</span>
          </Link>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-6">
          {/* Profile Section */}
          {!loading && user && (
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-3">
                <div className="text-right">
                  <div className="text-sm font-medium">{user.name}</div>
                  <div className="text-xs text-gray-400">{user.email}</div>
                </div>

                {user.profileImg ? (
                  <img
                    src={user.profileImg}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-blue-400"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center border-2 border-blue-400">
                    <User size={20} />
                  </div>
                )}
              </div>

              {/* Mobile Profile Icon */}
              <div className="md:hidden">
                {user.profileImg ? (
                  <img
                    src={user.profileImg}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover border-2 border-blue-400"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center border-2 border-blue-400">
                    <User size={16} />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
          >
            <LogOut size={18} />
            <span className="hidden md:inline">Logout</span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden flex justify-center space-x-6 mt-4 pt-2 border-t border-gray-700">
        <Link
          to="/dashboard"
          className="flex flex-col items-center text-xs hover:text-blue-400"
        >
          <Home size={20} />
          <span>Home</span>
        </Link>
        <Link
          to="/create-session"
          className="flex flex-col items-center text-xs hover:text-blue-400"
        >
          <PlusCircle size={20} />
          <span>Create</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
