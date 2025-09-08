import axios from "axios";
import { API_URL } from "./config";
import { getAuthToken } from "./Auth";

export const getLeadsByCustomer = async (customerId, status = '') => {
  const token = getAuthToken();
  const url = status 
    ? `${API_URL}/leads/customer/${customerId}?status=${status}`
    : `${API_URL}/leads/customer/${customerId}`;
  
  const res = await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

export const createLead = async (customerId, leadData) => {
  const token = getAuthToken();
  const res = await axios.post(`${API_URL}/leads/customer/${customerId}`, leadData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

export const updateLead = async (customerId, leadId, leadData) => {
  const token = getAuthToken();
  const res = await axios.put(`${API_URL}/leads/customer/${customerId}/${leadId}`, leadData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

export const deleteLead = async (customerId, leadId) => {
  const token = getAuthToken();
  const res = await axios.delete(`${API_URL}/leads/customer/${customerId}/${leadId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

export const getDashboardData = async () => {
  const token = getAuthToken();
  const res = await axios.get(`${API_URL}/leads/dashboard`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};
