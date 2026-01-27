import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? "http://localhost:5000/api" : "/api");

export const getPetOrders = async ({ page = 1, search = "", token }) => {
  const { data } = await axios.get(`${API_URL}/admin/pet-orders`, {
    params: { page, search },
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const confirmPetOrder = async (orderId, token) => {
  const { data } = await axios.put(
    `${API_URL}/admin/pet-orders/${orderId}/confirm`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return data;
};

export const deletePetOrder = async (orderId, token) => {
  const { data } = await axios.delete(`${API_URL}/admin/pet-orders/${orderId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};
