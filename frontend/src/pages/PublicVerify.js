// frontEnd/src/pages/PublicVerify.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PublicVerify = () => {
  const { regNo } = useParams();
  const [customer, setCustomer] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Live cloud backend database dynamic endpoint
        const res = await axios.get('https://onrender.com' + regNo);
        setCustomer(res.data);
      } catch (err) {
        setError('Invalid QR code or profile verification record missing');
      }
    };
    fetchProfile();
  }, [regNo]);

  return (
    <div style={{ padding: '1rem', backgroundColor: '#e5e7eb', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', width: '100%', maxWidth: '500px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
        {error && <div className="error-banner" style={{ textAlign: 'center' }}>{error}</div>}
        {customer && (
          <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #d1d5db', fontFamily: 'Arial, sans-serif' }}>
            <tbody>
              <tr><td style={{ border: '1px solid #d1d5db', padding: '12px', fontWeight: 'bold', color: '#4b5563', width: '40%', fontSize: '0.9rem' }}>Registration Number</td><td style={{ border: '1px solid #d1d5db', padding: '12px', color: '#111827', fontSize: '0.9rem' }}>{customer.regNo}</td></tr>
              <tr><td style={{ border: '1px solid #d1d5db', padding: '12px', fontWeight: 'bold', color: '#4b5563', fontSize: '0.9rem' }}>NAME</td><td style={{ border: '1px solid #d1d5db', padding: '12px', color: '#111827', fontWeight: '500', fontSize: '0.9rem' }}>{customer.name.toUpperCase()}</td></tr>
              <tr><td style={{ border: '1px solid #d1d5db', padding: '12px', fontWeight: 'bold', color: '#4b5563', fontSize: '0.9rem' }}>GENDER</td><td style={{ border: '1px solid #d1d5db', padding: '12px', color: '#111827', fontSize: '0.9rem' }}>{customer.gender}</td></tr>
              <tr><td style={{ border: '1px solid #d1d5db', padding: '12px', fontWeight: 'bold', color: '#4b5563', fontSize: '0.9rem' }}>DOB</td><td style={{ border: '1px solid #d1d5db', padding: '12px', color: '#111827', fontSize: '0.9rem' }}>{customer.dob}</td></tr>
              <tr><td style={{ border: '1px solid #d1d5db', padding: '12px', fontWeight: 'bold', color: '#4b5563', fontSize: '0.9rem' }}>Name Of Mother</td><td style={{ border: '1px solid #d1d5db', padding: '12px', color: '#111827', fontSize: '0.9rem' }}>{customer.motherName.toUpperCase()}</td></tr>
              <tr><td style={{ border: '1px solid #d1d5db', padding: '12px', fontWeight: 'bold', color: '#4b5563', fontSize: '0.9rem' }}>Name Of Father</td><td style={{ border: '1px solid #d1d5db', padding: '12px', color: '#111827', fontSize: '0.9rem' }}>{customer.fatherName.toUpperCase()}</td></tr>
              <tr><td style={{ border: '1px solid #d1d5db', padding: '12px', fontWeight: 'bold', color: '#4b5563', fontSize: '0.9rem' }}>Place of Birth</td><td style={{ border: '1px solid #d1d5db', padding: '12px', color: '#111827', fontSize: '0.9rem' }}>{customer.pob.toUpperCase()}</td></tr>
              <tr><td style={{ border: '1px solid #d1d5db', padding: '12px', fontWeight: 'bold', color: '#4b5563', fontSize: '0.9rem' }}>Registration Date</td><td style={{ border: '1px solid #d1d5db', padding: '12px', color: '#111827', fontSize: '0.9rem' }}>{customer.regDate}</td></tr>
              <tr><td style={{ border: '1px solid #d1d5db', padding: '12px', fontWeight: 'bold', color: '#4b5563', fontSize: '0.9rem' }}>Registration Unit Name</td><td style={{ border: '1px solid #d1d5db', padding: '12px', color: '#111827', fontSize: '0.9rem' }}>{customer.unitName.toUpperCase()}</td></tr>
              <tr><td style={{ border: '1px solid #d1d5db', padding: '12px', fontWeight: 'bold', color: '#4b5563', fontSize: '0.9rem' }}>Registration Unit Code</td><td style={{ border: '1px solid #d1d5db', padding: '12px', color: '#111827', fontSize: '0.9rem' }}>{customer.unitCode}</td></tr>
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
export default PublicVerify;
