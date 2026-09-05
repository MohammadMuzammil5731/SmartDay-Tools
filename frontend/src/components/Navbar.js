import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  // Logout function jo token delete karega aur login par phenk dega
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <h2>SmartDay Tools</h2>
      <div className="nav-links">
        {/* NavLink automatic check karta hai ki kaun sa tab active hai aur use 'active' class de deta hai */}
        <NavLink to="/add-customer" className={({ isActive }) => isActive ? 'active' : ''}>
          Add Customer
        </NavLink>
        <NavLink to="/find-customer" className={({ isActive }) => isActive ? 'active' : ''}>
          Find Customer
        </NavLink>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
