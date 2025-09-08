import axios from "axios";
import config from "./config";

const getAuthToken = () => {
  return localStorage.getItem("token");
};

export const registerUser = async (data) => {
  const res = await axios.post(`${config.BASE_URL}/auth/register`, data);
  localStorage.setItem("user", JSON.stringify(res.data));
  localStorage.setItem("token", res.data.token);
  return res.data;
};

export const loginUser = async (data) => {
  const res = await axios.post(`${config.BASE_URL}/auth/login`, data);
  localStorage.setItem("user", JSON.stringify(res.data));
  localStorage.setItem("token", res.data.token);
  return res.data;
};

export const logoutUser = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};

export const getCurrentUser = () => {
  try {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    
    if (!token) {
      localStorage.removeItem("user");
      return null;
    }
    
    return user ? JSON.parse(user) : null;
  } catch(error) {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    return null;
  }
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

export { getAuthToken };
