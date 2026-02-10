import axios from "axios";
// import axiosInstance from "./axios";

// then axiosInstance.interceptors...

const axiosInstance = axios.create({
	baseURL: import.meta?.env?.VITE_API_BASE_URL || "http://localhost:5001/api/",
	withCredentials: true, // send cookies to the server
});

export default axiosInstance;