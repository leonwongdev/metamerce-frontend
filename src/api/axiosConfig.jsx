// src/api/axiosConfig.js

import axios from "axios";

console.log(
  "🚀 ~ import.meta.env.REACT_APP_API_URL",
  import.meta.env.VITE_APP_API_URL
);
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL, // Replace with your actual environment variable name
});

export default axiosInstance;
