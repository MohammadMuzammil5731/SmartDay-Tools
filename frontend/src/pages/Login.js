// frontEnd/src/pages/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      // Live cloud backend URL mapping
      const res = await axios.post('https://onrender.com', formData);
      localStorage.setItem('token', res.data.token);
      navigate('/add-customer');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Invalid Credentials.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">SmartDay Tools</h2>
        <p className="auth-subtitle">Smart digital tools to streamline your everyday routine.</p>
        {error && <div className="error-banner">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input type="text" className="form-control" placeholder="Enter your username" required value={formData.username} onChange={(e) => setFormData({...formData, username: e.target.value})} />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <input 
                type={showPassword ? "text" : "password"} 
                className="form-control" 
                placeholder="Enter your password" 
                required 
                style={{ paddingRight: '2.5rem' }}
                value={formData.password} 
                onChange={(e) => setFormData({...formData, password: e.target.value})} 
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: '10px', background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280', display: 'flex', alignItems: 'center' }}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          
          <button type="submit" className="btn-primary">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
