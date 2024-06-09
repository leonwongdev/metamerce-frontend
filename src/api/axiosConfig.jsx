// src/api/axiosConfig.js

import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL, // Replace with your actual environment variable name
});

export default axiosInstance;
