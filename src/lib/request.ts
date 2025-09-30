import axios from "axios";
import { getCookie } from "./Cookie";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// create a custom axiosInstance
const axiosInstance = axios.create({
  baseURL: `${BASE_URL}/api`,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

// Create a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getCookie("Token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Create a response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      document.cookie =
        "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
