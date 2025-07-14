// src/App.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import LoginForm from './components/LoginForm';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Alerts from './pages/Alerts';
import ManageWorkers from './pages/ManageWorkers';
import ShelfView from './pages/ShelfView';
import Upload from './pages/Upload';
import './App.css';

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    return <Navigate to="/" replace />;
  }
  return children;
}

function LoginPage() {
  const token = localStorage.getItem("accessToken");
  const role = localStorage.getItem("role");

  if (token) {
    if (role === 'store-manager') return <Navigate to="/manager/dashboard" replace />;
    if (role === 'staff') return <Navigate to="/staff/shelf" replace />;
  }

  return <LoginForm />;
}

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LoginPage />} />

        {/* MANAGER ROUTES */}
        <Route path="/manager/*" element={
          <ProtectedRoute>
            <Layout>
              <Routes>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="alerts" element={<Alerts />} />
                <Route path="manage-workers" element={<ManageWorkers />} />
                <Route path="upload" element={<Upload />} />
              </Routes>
            </Layout>
          </ProtectedRoute>
        } />

        {/* STAFF ROUTES */}
        <Route path="/staff/*" element={
          <ProtectedRoute>
            <Layout>
              <Routes>
                <Route path="shelf" element={<ShelfView />} />
              </Routes>
            </Layout>
          </ProtectedRoute>
        } />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
