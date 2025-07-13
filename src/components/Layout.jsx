// src/components/Layout.jsx
import React from 'react';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <Sidebar />
      <main style={{
        padding: '20px',
        flexGrow: 1,
        backgroundColor: '#f4f4f4',
        overflowY: 'auto',
      }}>
        {children}
      </main>
    </div>
  );
};

export default Layout;
