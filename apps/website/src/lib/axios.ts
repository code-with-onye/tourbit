import axios from "axios";
import Cookies from "js-cookie";

export default axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const privateAxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

privateAxiosInstance.interceptors.request.use((config) => {
  const userData = Cookies.get("tourbit-user-storage");
  const user = JSON.parse(userData as string) || {};
  const token = user.state.user.access_token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
