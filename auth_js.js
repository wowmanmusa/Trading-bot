// Authentication service

import axios from 'axios';

const AUTH_BASE_URL = process.env.REACT_APP_AUTH_URL || 'http://localhost:3001/auth';

const authClient = axios.create({
  baseURL: AUTH_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const auth = {
  // Login
  login: async (email, password) => {
    try {
      const response = await authClient.post('/login', { email, password });
      const { token, user } = response.data;
      
      // Store token and user info
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      return { success: true, user };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Login failed' 
      };
    }
  },

  // Register
  register: async (userData) => {
    try {
      const response = await authClient.post('/register', userData);
      const { token, user } = response.data;
      
      // Store token and user info
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      return { success: true, user };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Registration failed' 
      };
    }
  },

  // Logout
  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    window.location.href = '/login';
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('authToken');
  },

  // Get current user
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  // Update user profile
  updateProfile: async (profileData) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await authClient.put('/profile', profileData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      const { user } = response.data;
      localStorage.setItem('user', JSON.stringify(user));
      
      return { success: true, user };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Profile update failed' 
      };
    }
  },

  // Change password
  changePassword: async (currentPassword, newPassword) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await authClient.post('/change-password', 
        { currentPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Password change failed' 
      };
    }
  },

  // Request password reset
  requestPasswordReset: async (email) => {
    try {
      await authClient.post('/reset-password', { email });
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Password reset request failed' 
      };
    }
  },

  // Reset password with token
  resetPassword: async (token, newPassword) => {
    try {
      await authClient.post('/reset-password/confirm', { token, newPassword });
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Password reset failed' 
      };
    }
  }
};

export default auth;