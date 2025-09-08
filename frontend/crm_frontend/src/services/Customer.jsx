import axios from "axios";
import { API_URL } from "./config";
import { getAuthToken } from "./Auth";

export const getAllCustomers = async (page = 1, search = '') => {
  const token = getAuthToken();
  const res = await axios.get(`${API_URL}/customers?page=${page}&search=${search}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

export const getCustomerById = async (id) => {
  const token = getAuthToken();
  const res = await axios.get(`${API_URL}/customers/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

export const createCustomer = async (customerData) => {
  const token = getAuthToken();
  const res = await axios.post(`${API_URL}/customers`, customerData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

export const updateCustomer = async (id, customerData) => {
  const token = getAuthToken();
  const res = await axios.put(`${API_URL}/customers/${id}`, customerData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

export const deleteCustomer = async (id) => {
  const token = getAuthToken();
  const res = await axios.delete(`${API_URL}/customers/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};
