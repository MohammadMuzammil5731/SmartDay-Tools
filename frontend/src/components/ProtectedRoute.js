import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Check karenge ki local storage me login token hai ya nahi
  const token = localStorage.getItem('token');
  
  // Agar token hai to page dikhao, nahi to automatic /login page par bhej do
  return token ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
