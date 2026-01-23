import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "https://case-craft-final-yc3q.vercel.app/api";

const publicClient = axios.create({
    baseURL: `${API_URL}/contact`
});

const adminClient = axios.create({
    baseURL: `${API_URL}/contact/admin`
});

// Response interceptor for session expiry
adminClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem("cpc_admin_token");
            window.location.href = "/admin/login";
        }
        return Promise.reject(error);
    }
);

export const submitContact = async (formData) => {
    const { data } = await publicClient.post("/", formData);
    return data;
};

export const getContactMessages = async (token) => {
    const { data } = await adminClient.get("/", {
        headers: { Authorization: `Bearer ${token}` }
    });
    return data;
};

export const updateMessageStatus = async (id, status, token) => {
    const { data } = await adminClient.patch(`/${id}`, { status }, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return data;
};

export const deleteContactMessage = async (id, token) => {
    const { data } = await adminClient.delete(`/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return data;
};
