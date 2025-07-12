// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI, apiUtils } from '../services/api';
import { USER_ROLES } from '../types';

// Create the context
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is authenticated on app start
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      setLoading(true);
      
      // Check if token exists
      if (!apiUtils.isAuthenticated()) {
        setLoading(false);
        return;
      }

      // Get stored user data
      const storedUser = apiUtils.getStoredUser();
      if (storedUser) {
        setUser(storedUser);
        // Optionally fetch fresh profile data
        await fetchUserProfile();
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const fetchUserProfile = async () => {
    try {
      const response = await authAPI.getProfile();
      if (response.success) {
        setUser(response.data);
        // Update stored user data
        const token = localStorage.getItem('token');
        apiUtils.storeUser(response.data, token);
      }
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
    }
  };

  const login = async (loginData) => {
    try {
      setLoading(true);
      setError(null);

      const response = await authAPI.login(loginData);
      
      if (response.success) {
        // Store user data and token
        apiUtils.storeUser(response.data.user || response.data, response.token);
        setUser(response.data.user || response.data);
        
        return {
          success: true,
          message: 'Login successful'
        };
      } else {
        setError(response.error);
        return {
          success: false,
          error: response.error
        };
      }
    } catch (error) {
      const errorMessage = 'Login failed. Please try again.';
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    apiUtils.clearStoredData();
    setUser(null);
    setError(null);
  };

  const updateProfile = async (profileData) => {
    try {
      setLoading(true);
      setError(null);

      const response = await authAPI.updateProfile(profileData);
      
      if (response.success) {
        setUser(response.data);
        // Update stored user data
        const token = localStorage.getItem('token');
        apiUtils.storeUser(response.data, token);
        
        return {
          success: true,
          message: 'Profile updated successfully'
        };
      } else {
        setError(response.error);
        return {
          success: false,
          error: response.error
        };
      }
    } catch (error) {
      const errorMessage = 'Failed to update profile. Please try again.';
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage
      };
    } finally {
      setLoading(false);
    }
  };

  // Helper functions
  const isAuthenticated = () => {
    return !!user && apiUtils.isAuthenticated();
  };

  const hasRole = (role) => {
    return user?.role === role;
  };

  const isStaff = () => hasRole(USER_ROLES.STAFF);
  const isManager = () => hasRole(USER_ROLES.MANAGER);
  const isAdmin = () => hasRole(USER_ROLES.ADMIN);

  const canAssignStaff = () => {
    return isManager() || isAdmin();
  };

  const canViewAllAssignments = () => {
    return isManager() || isAdmin();
  };

  const canManageUsers = () => {
    return isAdmin();
  };

  const value = {
    // State
    user,
    loading,
    error,
    
    // Actions
    login,
    logout,
    updateProfile,
    
    // Helpers
    isAuthenticated,
    hasRole,
    isStaff,
    isManager,
    isAdmin,
    canAssignStaff,
    canViewAllAssignments,
    canManageUsers
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};