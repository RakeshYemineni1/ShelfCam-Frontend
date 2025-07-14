import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI, apiUtils } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(apiUtils.getStoredUser());
    const [loading, setLoading] = useState(false);

    const login = async ({ username, password }) => {
        setLoading(true);
        try {
            const res = await authAPI.login({ username, password });
            if (!res.success) throw new Error(res.error);

            const profileRes = await authAPI.getProfile();
            if (!profileRes.success) throw new Error(profileRes.error);

            apiUtils.storeUser(profileRes.data, res.token);
            setUser(profileRes.data);
            localStorage.setItem('accessToken', res.token);
            localStorage.setItem('role', profileRes.data.role);
            if (profileRes.data.store_id) {
                localStorage.setItem('storeId', profileRes.data.store_id);
            }
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        apiUtils.clearStoredData();
        setUser(null);
        window.location.href = '/';
    };

    const isAuthenticated = () => !!user;

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
