import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI, apiUtils } from '../services/api';
import { USER_ROLES } from '../types';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      setLoading(true);

      if (!apiUtils.isAuthenticated()) {
        setLoading(false);
        return;
      }

      const storedUser = apiUtils.getStoredUser();
      if (storedUser) {
        setUser(storedUser);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (loginData) => {
    try {
      setLoading(true);
      setError(null);

      const response = await authAPI.login(loginData);

      if (response.success) {
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
    user,
    loading,
    error,

    login,
    logout,
    updateProfile,

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
