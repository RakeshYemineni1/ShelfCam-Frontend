// src/components/Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Sidebar = () => {
  const { user, logout } = useAuth();

  const linksByRole = {
    ADMIN: [
      { to: '/admin/dashboard', label: 'Dashboard' },
      { to: '/admin/alerts', label: 'Alerts' },
      { to: '/admin/stores', label: 'Stores' },
      { to: '/admin/upload', label: 'Upload' },
    ],
    MANAGER: [
      { to: '/manager/dashboard', label: 'Dashboard' },
      { to: '/manager/alerts', label: 'Alerts' },
      { to: '/manager/manage-workers', label: 'Manage Workers' },
    ],
    STAFF: [
      { to: '/staff/shelf', label: 'Shelf View' },
    ],
  };

  return (
    <div style={styles.sidebar}>
      <h2 style={styles.title}>📊 ShelfCam</h2>
      <ul style={styles.nav}>
        {(linksByRole[user?.role?.toUpperCase()] || []).map(link => (
          <li key={link.to}>
            <Link to={link.to} style={styles.link}>{link.label}</Link>
          </li>
        ))}
      </ul>
      <button onClick={logout} style={styles.logout}>
        Logout
      </button>
    </div>
  );
};

const styles = {
  sidebar: {
    width: '220px',
    height: '100vh',
    backgroundColor: '#222',
    color: '#fff',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: '1.5rem',
    marginBottom: '20px',
    color: '#fff',
  },
  nav: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    flexGrow: 1,
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    display: 'block',
    padding: '10px 0',
  },
  logout: {
    backgroundColor: '#dc3545',
    border: 'none',
    padding: '10px',
    color: '#fff',
    cursor: 'pointer',
    width: '100%',
    marginTop: 'auto',
  },
};

export default Sidebar;
