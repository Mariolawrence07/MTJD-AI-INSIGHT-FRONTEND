import axios from "axios";
// import axiosInstance from "./axios";

// then axiosInstance.interceptors...

const axiosInstance = axios.create({
	baseURL: "http://localhost:5001/api/",
	withCredentials: true, // send cookies to the server
});

export default axiosInstance;