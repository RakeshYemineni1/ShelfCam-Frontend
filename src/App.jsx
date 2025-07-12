// src/App.jsx
import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginForm from './components/LoginForm';
import './App.css';

// Protected Route component
function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <p>Loading...</p>
      </div>
    );
  }
  
  return isAuthenticated() ? children : <Navigate to="/" replace />;
}

// Login Page component
function LoginPage() {
  const { isAuthenticated } = useAuth();
  
  // If already logged in, redirect to dashboard
  if (isAuthenticated()) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <LoginForm />;
}

function TemporaryDashboard() {
  const { user, logout } = useAuth();
  
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>📊 Welcome to ShelfCam Dashboard</h1>
      <div style={{ marginBottom: '20px' }}>
        <p>✅ Successfully logged in!</p>
        <p><strong>User:</strong> {user?.username}</p>
        <p><strong>Role:</strong> {user?.role}</p>
        <p><strong>Employee ID:</strong> {user?.employee_id}</p>
      </div>
      <button 
        onClick={logout}
        style={{
          padding: '10px 20px',
          backgroundColor: '#dc3545',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Logout
      </button>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<LoginPage />} />
        
        {/* Protected routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <TemporaryDashboard />
          </ProtectedRoute>
        } />
        
        {/* Catch all route */}
        <Route path="*" element={
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <h1>🚧 Page Under Construction</h1>
            <p>This page will be built soon!</p>
            <a href="/">← Go back to Login</a>
          </div>
        } />
      </Routes>
    </AuthProvider>
  );
}

export default App;