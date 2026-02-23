import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiPlus, FiTrash2, FiBriefcase, FiClock, FiTag } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import CreateSessionModal from "../components/CreateSessionModal";

function DashBoard() {
  const [session, setsession] = useState([]);
  const [loading, setLoading] = useState(true);
  const [box, setbox] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const navigate = useNavigate();

  // ================= FETCH SESSIONS =================
  const fetchProfile = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/v1/session/my-session",
        { withCredentials: true }
      );

      if (res.data.success) {
        setsession(res.data.sessions);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // ================= DELETE SESSION =================
  const deleteSession = async (e, sessionId) => {
    e.stopPropagation();
    setDeleteId(sessionId);

    try {
      await axios.delete(`http://localhost:8000/api/v1/session/${sessionId}`, {
        withCredentials: true,
      });

      // remove instantly from UI with smooth animation
      setTimeout(() => {
        setsession((prev) => prev.filter((item) => item._id !== sessionId));
        setDeleteId(null);
      }, 300);
    } catch (error) {
      console.log(error);
      setDeleteId(null);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="relative">
          <div className="h-16 w-16 border-4 border-amber-200 border-t-amber-500 rounded-full animate-spin"></div>
          <p className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-gray-500 text-sm">
            Loading your sessions...
          </p>
        </div>
      </div>
    );
  }

  // ================= EMPTY STATE =================
  if (session.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
        <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-3xl p-12 text-center max-w-lg w-full border border-gray-100">
          <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiBriefcase className="text-amber-500" size={40} />
          </div>

          <h2 className="text-3xl font-bold text-gray-800 mb-3">
            No Sessions Yet
          </h2>

          <p className="text-gray-500 mb-8 text-lg">
            Start your interview journey by creating your first practice
            session.
          </p>

          <button
            onClick={() => setbox(true)}
            className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-2xl hover:from-amber-600 hover:to-orange-600 transition-all duration-300 font-medium shadow-lg shadow-amber-500/25 hover:shadow-xl hover:shadow-amber-500/30 transform hover:-translate-y-1"
          >
            Create First Session
          </button>
        </div>

        {box && <CreateSessionModal setbox={setbox} />}
      </div>
    );
  }

  // ================= NORMAL DASHBOARD =================
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                My Interview Sessions
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                You have {session.length} active session
                {session.length > 1 ? "s" : ""}
              </p>
            </div>
            <button
              onClick={() => setbox(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-5 py-2.5 rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <FiPlus size={20} />
              <span>New Session</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sessions Grid */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {session.map((item) => (
            <div
              key={item._id}
              onClick={() => navigate(`/interview/prep/${item._id}`)}
              className={`group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 hover:border-amber-200 overflow-hidden ${
                deleteId === item._id ? "opacity-50 scale-95" : ""
              }`}
            >
              {/* Top gradient bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>

              {/* DELETE BUTTON */}
              <button
                onClick={(e) => deleteSession(e, item._id)}
                className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white text-red-500 p-2.5 rounded-xl hover:bg-red-50 hover:text-red-600 shadow-md hover:shadow-lg z-10"
                title="Delete session"
              >
                <FiTrash2 size={16} />
              </button>

              <div className="p-6">
                {/* Role */}
                <div className="flex items-start gap-3 mb-4">
                  <div className="bg-amber-100 p-2.5 rounded-xl">
                    <FiBriefcase className="text-amber-600" size={20} />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-gray-800 mb-1 line-clamp-1">
                      {item.role}
                    </h2>
                    <p className="text-gray-500 text-sm line-clamp-2">
                      {item.description || "No description provided"}
                    </p>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-3">
                    <FiClock className="text-gray-400" size={16} />
                    <span className="text-sm text-gray-600">
                      {item.experience} experience
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <FiTag className="text-gray-400" size={16} />
                    <span className="text-sm text-gray-600 line-clamp-1">
                      {item.topicsToFocus}
                    </span>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 text-sm px-3 py-1.5 rounded-xl">
                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
                    {item.questions.length} Question
                    {item.questions.length !== 1 ? "s" : ""}
                  </span>

                  <span className="text-xs text-gray-400">
                    {new Date(item.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Add Button (mobile friendly) */}
      <button
        onClick={() => setbox(true)}
        className="lg:hidden fixed bottom-6 right-6 h-14 w-14 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center hover:scale-110"
      >
        <FiPlus size={28} />
      </button>

      {box && <CreateSessionModal setbox={setbox} />}
    </div>
  );
}

export default DashBoard;
