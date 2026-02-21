import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiPlus } from "react-icons/fi";
import CreateSessionModal from "../components/CreateSessionModal";

function DashBoard() {
  const [session, setsession] = useState([]);
  const [loading, setLoading] = useState(true);
  const [box,setbox]=useState(false);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/v1/session/my-session",
        {
          withCredentials: true,
        }
      );
      console.log(res.data.sessions);
      if (res.data.success) {
        setsession(res.data.sessions);
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

  if (loading)
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="h-14 w-14 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  return (
    <>
      {session.map((item) => (
        <div
          key={item._id}
          className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition duration-300"
        >
          {/* Role */}
          <h2 className="text-xl font-semibold text-indigo-600 mb-2">
            {item.role}
          </h2>

          {/* Description */}
          <p className="text-gray-600 mb-3">{item.description}</p>

          {/* Experience */}
          <div className="mb-2">
            <span className="text-sm font-medium text-gray-700">
              Experience:
            </span>{" "}
            <span className="text-sm text-gray-500">{item.experience}</span>
          </div>

          {/* Topics */}
          <div className="mb-2">
            <span className="text-sm font-medium text-gray-700">Topics:</span>{" "}
            <span className="text-sm text-gray-500">{item.topicsToFocus}</span>
          </div>

          {/* Questions Badge */}
          <div className="mt-3">
            <span className="inline-block bg-indigo-100 text-indigo-600 text-xs px-3 py-1 rounded-full">
              {item.questions.length} Questions
            </span>
          </div>

          {/* Date */}
          <p className="text-xs text-gray-400 mt-4">
            Created on {new Date(item.createdAt).toLocaleDateString()}
          </p>
        </div>
      ))}
      <button onClick={()=>setbox(true)}  className="text-white fixed bottom-34 right-44 h-14 w-14 bg-amber-500 rounded-2xl shadow-lg hover:bg-amber-600 transition duration-300 flex items-center justify-center">
        <FiPlus size={28} />
      </button>
       {box==true && <CreateSessionModal setbox={setbox}></CreateSessionModal>}
    </>
  );
}

export default DashBoard;
