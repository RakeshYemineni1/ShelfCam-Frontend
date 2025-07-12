// src/services/api.js
import axios from 'axios';

// Base URL - change this to your backend URL
const BASE_URL = 'http://localhost:8000'; // Change this to your backend URL

// Create axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle responses and errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Authentication API calls
export const authAPI = {
  // Login - POST /auth/login
  login: async (loginData) => {
    try {
      const response = await api.post('/auth/login', loginData);
      return {
        success: true,
        data: response.data,
        token: response.data.token || response.data.access_token
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.detail || 'Login failed'
      };
    }
  },

  // Get current user profile - GET /me/profile
  getProfile: async () => {
    try {
      const response = await api.get('/me/profile');
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.detail || 'Failed to fetch profile'
      };
    }
  },

  // Update profile - PUT /me/profile
  updateProfile: async (profileData) => {
    try {
      const response = await api.put('/me/profile', profileData);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.detail || 'Failed to update profile'
      };
    }
  }
};

// Staff Assignment API calls
export const staffAssignmentAPI = {
  // Assign staff to shelf - POST /staff-assignments/assign?employee_id=E101
  assignStaff: async (employeeId, shelfId) => {
    try {
      const response = await api.post(`/staff-assignments/assign?employee_id=${employeeId}`, {
        shelf_id: shelfId
      });
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.detail || 'Failed to assign staff'
      };
    }
  },

  // Get current assignments - GET /staff-assignments/current
  getCurrentAssignments: async () => {
    try {
      const response = await api.get('/staff-assignments/current');
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.detail || 'Failed to fetch assignments'
      };
    }
  },

  // Unassign staff - POST /staff-assignments/unassign?employee_id=E101
  unassignStaff: async (employeeId) => {
    try {
      const response = await api.post(`/staff-assignments/unassign?employee_id=${employeeId}`);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.detail || 'Failed to unassign staff'
      };
    }
  },

  // Get assignment history (if available)
  getAssignmentHistory: async (employeeId = null) => {
    try {
      const url = employeeId 
        ? `/staff-assignments/history?employee_id=${employeeId}`
        : '/staff-assignments/history';
      const response = await api.get(url);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.detail || 'Failed to fetch assignment history'
      };
    }
  }
};

// Utility functions
export const apiUtils = {
  // Check if user is authenticated
  isAuthenticated: () => {
    const token = localStorage.getItem('token');
    return !!token;
  },

  // Get stored user data
  getStoredUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // Store user data
  storeUser: (userData, token) => {
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', token);
  },

  // Clear stored data
  clearStoredData: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }
};

export default api;