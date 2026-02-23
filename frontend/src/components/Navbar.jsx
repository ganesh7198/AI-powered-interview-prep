import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { LogOut, User, PlusCircle, Home, Menu, X } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Fetch profile
  const fetchProfile = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/auth/profile", {
        withCredentials: true,
      });

      if (res.data) {
        setUser(res.data.data || res.data);
      }
    } catch (error) {
      console.log(error)
      console.log("Not logged in");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-gray-900/95 backdrop-blur-lg shadow-lg py-3"
            : "bg-gradient-to-r from-gray-900 to-gray-800 py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/dashboard" className="flex items-center space-x-2 group">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center transform group-hover:rotate-6 transition-transform duration-300">
                <span className="text-white font-bold text-lg">IP</span>
              </div>
              <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                InterviewPrep
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link
                to="/dashboard"
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors group"
              >
                <Home
                  size={18}
                  className="group-hover:text-blue-400 transition-colors"
                />
                <span className="relative">
                  Dashboard
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
                </span>
              </Link>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              {/* Profile Section */}
              {!loading && user && (
                <div className="flex items-center space-x-3">
                  {/* Desktop Profile */}
                  <div className="hidden md:flex items-center space-x-3 bg-white/5 rounded-full pl-3 pr-1 py-1 border border-white/10 hover:bg-white/10 transition-all duration-300">
                    <div className="text-right">
                      <div className="text-sm font-medium text-white">
                        {user.name}
                      </div>
                      <div className="text-xs text-gray-400">{user.email}</div>
                    </div>

                    {user.profileImg ? (
                      <img
                        src={user.profileImg}
                        alt={user.name}
                        className="w-10 h-10 rounded-full object-cover border-2 border-blue-400"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center border-2 border-blue-400 shadow-lg">
                        <User size={18} className="text-white" />
                      </div>
                    )}
                  </div>

                  {/* Mobile Profile Icon */}
                  <div className="md:hidden">
                    {user.profileImg ? (
                      <img
                        src={user.profileImg}
                        alt={user.name}
                        className="w-9 h-9 rounded-full object-cover border-2 border-blue-400"
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center border-2 border-blue-400">
                        <User size={16} className="text-white" />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white px-3 sm:px-4 py-2 rounded-xl transition-all duration-300 border border-red-500/20 hover:border-red-500/50 shadow-md hover:shadow-lg group"
              >
                <LogOut
                  size={18}
                  className="group-hover:rotate-180 transition-transform duration-300"
                />
                <span className="hidden sm:inline">Logout</span>
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pt-4 border-t border-gray-700 animate-slideDown">
              <div className="flex flex-col space-y-3">
                <Link
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors group"
                >
                  <Home size={20} className="group-hover:text-blue-400" />
                  <span>Dashboard</span>
                </Link>
                <Link
                  to="/create-session"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors group"
                >
                  <PlusCircle size={20} className="group-hover:text-blue-400" />
                  <span>Create Session</span>
                </Link>

                {/* Mobile User Info */}
                {user && (
                  <div className="px-4 py-3 bg-white/5 rounded-xl border border-white/10">
                    <div className="flex items-center space-x-3">
                      {user.profileImg ? (
                        <img
                          src={user.profileImg}
                          alt={user.name}
                          className="w-10 h-10 rounded-full object-cover border-2 border-blue-400"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center border-2 border-blue-400">
                          <User size={18} className="text-white" />
                        </div>
                      )}
                      <div>
                        <div className="text-sm font-medium text-white">
                          {user.name}
                        </div>
                        <div className="text-xs text-gray-400">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Spacer to prevent content from hiding under fixed navbar */}
      <div className="h-16"></div>

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default Navbar;
