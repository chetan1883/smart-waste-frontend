//import axios from "axios";
import API from "../api/axios";   // adjust path if needed

const API = axios.create({
  baseURL: "https://smart-waste-backend-9qy4.onrender.com"
});

// attach token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;