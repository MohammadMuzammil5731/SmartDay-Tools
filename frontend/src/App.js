import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login.js';
import AddCustomer from './pages/AddCustomer.js';
import FindCustomer from './pages/FindCustomer.js';
import PublicVerify from './pages/PublicVerify.js';
import ProtectedRoute from './components/ProtectedRoute.js';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/verify/:regNo" element={<PublicVerify />} />

        {/* Protected Dashboard Routes (Bina login ke koi open nahi kar payega) */}
        <Route path="/add-customer" element={
          <ProtectedRoute>
            <AddCustomer />
          </ProtectedRoute>
        } />
        
        <Route path="/find-customer" element={
          <ProtectedRoute>
            <FindCustomer />
          </ProtectedRoute>
        } />

        {/* Agar koi galat URL daale toh automatic login page par bhej do */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
