// src/App.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginForm from './components/LoginForm';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Alerts from './pages/Alerts';
import ManageWorkers from './pages/ManageWorkers';
import ShelfView from './pages/ShelfView';
import StoreView from './pages/StoreView';
import Upload from './pages/Upload';
import './App.css';

function ProtectedRoute({ children, role }) {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!isAuthenticated()) return <Navigate to="/" replace />;

  if (role && user.role?.toUpperCase() !== role) return <Navigate to="/" replace />;

  return children;
}

function LoginPage() {
  const { isAuthenticated, user } = useAuth();

  if (isAuthenticated()) {
    const role = user.role?.toUpperCase();
    if (role === 'ADMIN') return <Navigate to="/admin/dashboard" replace />;
    if (role === 'MANAGER') return <Navigate to="/manager/dashboard" replace />;
    if (role === 'STAFF') return <Navigate to="/staff/shelf" replace />;
  }
  return <LoginForm />;
}

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LoginPage />} />

        {/* ADMIN ROUTES */}
        <Route path="/admin/*" element={
          <ProtectedRoute role="ADMIN">
            <Layout>
              <Routes>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="alerts" element={<Alerts />} />
                <Route path="upload" element={<Upload />} />
                <Route path="store/:id" element={<StoreView />} />
              </Routes>
            </Layout>
          </ProtectedRoute>
        } />

        {/* MANAGER ROUTES */}
        <Route path="/manager/*" element={
          <ProtectedRoute role="MANAGER">
            <Layout>
              <Routes>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="alerts" element={<Alerts />} />
                <Route path="manage-workers" element={<ManageWorkers />} />
              </Routes>
            </Layout>
          </ProtectedRoute>
        } />

        {/* STAFF ROUTES */}
        <Route path="/staff/*" element={
          <ProtectedRoute role="STAFF">
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
