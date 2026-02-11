// src/api/axiosInstance.js
import axios from "axios";
import BASE_URL from "./Apipath";


const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // 👈 IMPORTANT for cookies
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

export default axiosInstance;
