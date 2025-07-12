import React, { useState, useEffect } from 'react';
import AdminLogin from '../components/admin/AdminLogin';
import AdminDashboard from '../components/admin/AdminDashboard';
import { usePortfolioData } from '../hooks/usePortfolioData';

const Admin: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : true;
  });

  const { data, updateData } = usePortfolioData();

  useEffect(() => {
    const authStatus = sessionStorage.getItem('adminAuth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // THIS IS THE CORRECTED FUNCTION
  // We removed the password check here because AdminLogin already does it.
  const handleLogin = () => {
    setIsAuthenticated(true);
    sessionStorage.setItem('adminAuth', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('adminAuth');
  };

  if (!isAuthenticated) {
    // We pass the corrected handleLogin function here.
    return <AdminLogin onLogin={handleLogin} darkMode={darkMode} />;
  }

  return (
    <AdminDashboard
      data={data}
      updateData={updateData}
      onLogout={handleLogout}
      darkMode={darkMode}
    />
  );
};

export default Admin;
