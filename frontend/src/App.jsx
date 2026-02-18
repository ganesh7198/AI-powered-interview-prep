import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Landingpage from "./pages/Landingpage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import DashBoard from "./pages/Dashboard";
import Layout from "./components/Layout";
import Interviewprep from "./pages/Interviewprep";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landingpage></Landingpage>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/signup" element={<Signup></Signup>}></Route>
          <Route element={<Layout></Layout>}>
            <Route path="/dashboard" element={<DashBoard></DashBoard>}></Route>
          </Route>
          <Route
            path="/interview/prep/:sessionId"
            element={<Interviewprep></Interviewprep>}
          ></Route>
        </Routes>
      </BrowserRouter>
      <Toaster
        toastOptions={{
          className: "",
          style: {
            fontSize: "13px",
          },
        }}
      />
    </>
  );
}

export default App;
