import axios from "axios";
import { API_URL } from "./config";

const getAuthToken = () => {
  return localStorage.getItem("token");
};

export const registerUser = async (data) => {
  const res = await axios.post(`${API_URL}/auth/register`, data);
  localStorage.setItem("user", JSON.stringify(res.data));
  localStorage.setItem("token", res.data.token);
  return res.data;
};

export const loginUser = async (data) => {
  const res = await axios.post(`${API_URL}/auth/login`, data);
  localStorage.setItem("user", JSON.stringify(res.data));
  localStorage.setItem("token", res.data.token);
  return res.data;
};

export const logoutUser = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};

export const getCurrentUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

export { getAuthToken };
