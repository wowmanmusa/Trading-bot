// API service for backend communication

import axios from 'axios';
import { API_ENDPOINTS } from '../utils/constants';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor for authentication
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API methods
export const api = {
  // Order flow endpoints
  getOrderFlow: async (params = {}) => {
    const response = await apiClient.get(API_ENDPOINTS.ORDER_FLOW, { params });
    return response.data;
  },

  getHistoricalData: async (symbol, timeframe = '1d') => {
    const response = await apiClient.get(`${API_ENDPOINTS.HISTORICAL}/${symbol}`, {
      params: { timeframe }
    });
    return response.data;
  },

  // Symbol endpoints
  searchSymbols: async (query) => {
    const response = await apiClient.get(API_ENDPOINTS.SYMBOLS, {
      params: { q: query }
    });
    return response.data;
  },

  getSymbolDetails: async (symbol) => {
    const response = await apiClient.get(`${API_ENDPOINTS.SYMBOLS}/${symbol}`);
    return response.data;
  },

  // Notification endpoints
  getNotifications: async (limit = 10) => {
    const response = await apiClient.get(API_ENDPOINTS.NOTIFICATIONS, {
      params: { limit }
    });
    return response.data;
  },

  markNotificationRead: async (notificationId) => {
    const response = await apiClient.put(`${API_ENDPOINTS.NOTIFICATIONS}/${notificationId}/read`);
    return response.data;
  },

  // User preferences
  getUserPreferences: async () => {
    const response = await apiClient.get('/api/user/preferences');
    return response.data;
  },

  updateUserPreferences: async (preferences) => {
    const response = await apiClient.put('/api/user/preferences', preferences);
    return response.data;
  },

  // Alerts
  createAlert: async (alertData) => {
    const response = await apiClient.post('/api/alerts', alertData);
    return response.data;
  },

  getAlerts: async () => {
    const response = await apiClient.get('/api/alerts');
    return response.data;
  },

  deleteAlert: async (alertId) => {
    const response = await apiClient.delete(`/api/alerts/${alertId}`);
    return response.data;
  }
};

export default api;