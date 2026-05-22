import axios from 'axios';

// Initialize the API using the Vite env URL or fallback to the provided Render URL if not found.
const API_URL = import.meta.env.VITE_API_URL || 'https://smart-expense-tracker-hvnr.onrender.com/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor to add the authorization token to every request.
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;
