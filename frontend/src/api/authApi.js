import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? "http://localhost:5000/api" : "/api");

const authClient = axios.create({
  baseURL: `${API_URL}/auth`,
  timeout: 10000, 
  headers: {
    "Content-Type": "application/json"
  }
});

export const registerUser = async (payload) => {
  try {
    const { data } = await authClient.post("/register", payload);
    return data;
  } catch (error) {
    if (error.code === "ECONNREFUSED" || error.message.includes("Network Error")) {
      throw new Error("Cannot connect to server. Please ensure the backend is running on port 5000.");
    }
    throw error;
  }
};

export const loginUser = async (payload) => {
  const { data } = await authClient.post("/login", payload);
  return data;
};

export const adminLogin = async (payload) => {
  const { data } = await authClient.post("/admin/login", payload);
  return data;
};

export const fetchProfile = async (token) => {
  const { data } = await authClient.get("/profile", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return data;
};


export const forgotPassword = async (email) => {
  try {
    const { data } = await authClient.post("/forgot-password", { email });
    return data;
  } catch (error) {
    throw error;
  }
};

export const resetPassword = async (token, password) => {
  try {
    const { data } = await authClient.post(`/reset-password/${token}`, { password });
    return data;
  } catch (error) {
    throw error;
  }
};

export const getCart = async (token) => {
  const { data } = await authClient.get("/cart", {
    headers: { Authorization: `Bearer ${token}` }
  });
  return data;
};

export const syncCart = async (cart, token) => {
  const { data } = await authClient.post("/cart", { cart }, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return data;
};

const authApi = {
  registerUser,
  loginUser,
  adminLogin,
  fetchProfile,
  forgotPassword,
  resetPassword,
  getCart,
  syncCart
};

export default authApi;



