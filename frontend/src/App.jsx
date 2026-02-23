import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import { Toaster } from "react-hot-toast";

import Landingpage from "./pages/Landingpage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import DashBoard from "./pages/Dashboard";
import Layout from "./components/Layout";
import Interviewprep from "./pages/Interviewprep";

// ================= PROTECTED ROUTE =================
const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get("http://localhost:8000/api/v1/session/my-session", {
          withCredentials: true,
        });
        setIsAuth(true);
      } catch (error) {
        setIsAuth(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // 🔄 Loading Spinner
  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="h-14 w-14 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // 🚫 Not logged in → redirect
  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  // ✅ Logged in
  return children;
};

// ================= APP =================
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landingpage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Layout Route */}
          <Route
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<DashBoard />} />
          </Route>

          {/* Protected Interview Page */}
          <Route
            path="/interview/prep/:sessionId"
            element={
              <ProtectedRoute>
                <Interviewprep />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>

      <Toaster
        toastOptions={{
          style: {
            fontSize: "13px",
          },
        }}
      />
    </>
  );
}

export default App;
