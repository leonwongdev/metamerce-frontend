// src/api/axiosConfig.js

import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.example.com", // Replace with your actual base URL
});

export default axiosInstance;
