import axios from "axios";
import config from "./config";
import { getAuthToken } from "./Auth";

export const getLeadsByCustomer = async (customerId, status = '') => {
  const token = getAuthToken();
  const url = status 
    ? `${config.BASE_URL}/leads/customer/${customerId}?status=${status}`
    : `${config.BASE_URL}/leads/customer/${customerId}`;
  
  const res = await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

export const createLead = async (customerId, leadData) => {
  const token = getAuthToken();
  const res = await axios.post(`${config.BASE_URL}/leads/customer/${customerId}`, leadData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

export const updateLead = async (customerId, leadId, leadData) => {
  const token = getAuthToken();
  const res = await axios.put(`${config.BASE_URL}/leads/customer/${customerId}/${leadId}`, leadData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

export const deleteLead = async (customerId, leadId) => {
  const token = getAuthToken();
  const res = await axios.delete(`${config.BASE_URL}/leads/customer/${customerId}/${leadId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

export const getDashboardData = async () => {
  const token = getAuthToken();
  const res = await axios.get(`${config.BASE_URL}/leads/dashboard`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};
