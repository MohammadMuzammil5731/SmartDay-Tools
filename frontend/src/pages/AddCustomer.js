// frontEnd/src/pages/AddCustomer.js
import React, { useState, useRef } from 'react';
import axios from 'axios';
import { QRCodeSVG } from 'qrcode.react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar.js';

const AddCustomer = () => {
  const [formData, setFormData] = useState({
    regNo: '', name: '', gender: 'Male', dob: '', motherName: '', fatherName: '', pob: '', regDate: '', unitName: '', unitCode: ''
  });
  const [showQRModal, setShowQRModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [qrUrl, setQrUrl] = useState('');
  const [error, setError] = useState('');
  const [duplicateRegNo, setDuplicateRegNo] = useState('');
  const qrRef = useRef();
  const navigate = useNavigate();

  const handleSave = async (e) => {
    e.preventDefault();
    setError('');
    setDuplicateRegNo('');
    try {
      const token = localStorage.getItem('token');
      // Live cloud backend connection pipeline
      await axios.post('https://onrender.com', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Validation or Server Error');
      if (err.response?.data?.regNo) {
        setDuplicateRegNo(err.response.data.regNo);
      }
    }
  };

  const handleGenerateQR = () => {
    if (!formData.regNo) {
      alert('Please fill out the form first with Registration Number');
      return;
    }
    // Dynamic production link logic jo automatic Vercel link par route karegi
    const generatedLink = window.location.origin + "/verify/" + formData.regNo;
    setQrUrl(generatedLink);
    setShowQRModal(true);
  };

  const downloadQR = () => {
    const svgElement = qrRef.current.querySelector('svg');
    const svgString = new XMLSerializer().serializeToString(svgElement);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.href = pngFile;
      downloadLink.download = `QR_${formData.regNo}.png`;
      downloadLink.click();
    };
    img.src = 'data:image/svg+xml;base64,' + btoa(svgString);
  };

  const handleDone = () => {
    setFormData({
      regNo: '', name: '', gender: 'Male', dob: '', motherName: '', fatherName: '', pob: '', regDate: '', unitName: '', unitCode: ''
    });
    setShowQRModal(false);
    setError('');
    setDuplicateRegNo('');
  };

  return (
    <>
      <Navbar />
      <div className="dashboard-container" style={{ maxWidth: '850px', margin: '1.5rem auto' }}>
        <div className="layout-card" style={{ padding: '1.5rem 2rem' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#111', fontSize: '1.6rem' }}>Let's get started</h2>
          
          {error && (
            <div className="error-banner" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <span>{error}</span>
              {duplicateRegNo && (
                <button type="button" onClick={() => navigate("/verify/" + duplicateRegNo)} style={{ background: '#1e3a8a', color: 'white', border: 'none', padding: '0.3rem 1rem', borderRadius: '4px', cursor: 'pointer', fontWeight: '600', marginLeft: '10px' }}>
                  View Data
                </button>
              )}
            </div>
          )}
          
          <form className="grid-form" onSubmit={handleSave} style={{ gap: '1rem' }}>
            <div className="form-group"><label>Registration Number</label><input type="text" className="form-control" placeholder="Enter registration number" required value={formData.regNo} onChange={e=>setFormData({...formData, regNo: e.target.value})} /></div>
            <div className="form-group"><label>Name</label><input type="text" className="form-control" placeholder="Enter name" required value={formData.name} onChange={e=>setFormData({...formData, name: e.target.value})} /></div>
            <div className="form-group">
              <label>Gender</label>
              <select className="form-control" value={formData.gender} onChange={e=>setFormData({...formData, gender: e.target.value})}>
                <option value="Male">Male</option><option value="Female">Female</option><option value="Others">Others</option>
              </select>
            </div>
            <div className="form-group"><label>Date of Birth</label><input type="date" className="form-control" required value={formData.dob} onChange={e=>setFormData({...formData, dob: e.target.value})} /></div>
            <div className="form-group"><label>Name of Mother</label><input type="text" className="form-control" placeholder="Enter name of mother" required value={formData.motherName} onChange={e=>setFormData({...formData, motherName: e.target.value})} /></div>
            <div className="form-group"><label>Name of Father</label><input type="text" className="form-control" placeholder="Enter name of father" required value={formData.fatherName} onChange={e=>setFormData({...formData, fatherName: e.target.value})} /></div>
            <div className="form-group"><label>Place of Birth</label><input type="text" className="form-control" placeholder="Enter place of birth" required value={formData.pob} onChange={e=>setFormData({...formData, pob: e.target.value})} /></div>
            <div className="form-group"><label>Registration Date</label><input type="date" className="form-control" required value={formData.regDate} onChange={e=>setFormData({...formData, regDate: e.target.value})} /></div>
            <div className="form-group"><label>Registration Unit Name</label><input type="text" className="form-control" placeholder="Enter registration unit name" required value={formData.unitName} onChange={e=>setFormData({...formData, unitName: e.target.value})} /></div>
            <div className="form-group"><label>Registration Unit Code</label><input type="text" className="form-control" placeholder="Enter registration unit code" required value={formData.unitCode} onChange={e=>setFormData({...formData, unitCode: e.target.value})} /></div>
            
            <div className="action-row" style={{ flexDirection: 'row', justifyContent: 'center', width: '100%', gap: '1.5rem', marginTop: '1rem' }}>
              <button type="submit" className="btn-action btn-submit" style={{ padding: '0.65rem 2.5rem', borderRadius: '6px' }}>Submit</button>
              <button type="button" onClick={handleGenerateQR} className="btn-action btn-qr" style={{ padding: '0.65rem 2.5rem', borderRadius: '6px' }}>Generate QR</button>
            </div>
          </form>
        </div>
      </div>

      {showQRModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', textAlign: 'center', boxShadow: '0 4px 25px rgba(0,0,0,0.15)', width: '100%', maxWidth: '360px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.2rem' }} ref={qrRef}>
            <h3 style={{ color: '#1e3a8a', fontSize: '1.25rem', fontWeight: '600' }}>QR Code Generated</h3>
            <p style={{ fontSize: '0.85rem', color: '#6b7280' }}>Scan to verify profile details instantly</p>
            <div style={{ padding: '1rem', background: '#f9fafb', borderRadius: '8px', border: '1px solid #e5e7eb' }}><QRCodeSVG value={qrUrl} size={180} /></div>
            <button onClick={downloadQR} className="btn-primary" style={{ background: '#10b981', padding: '0.65rem' }}>Download QR (.PNG)</button>
            <button onClick={handleDone} className="btn-primary" style={{ background: '#4f46e5', padding: '0.65rem' }}>Done</button>
          </div>
        </div>
      )}

      {showToast && (
        <div style={{ position: 'fixed', bottom: '25px', right: '25px', backgroundColor: '#10b981', color: 'white', padding: '1rem 2rem', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', zIndex: 2000, fontWeight: '600' }}>
          <span>🎉 Customer Data Saved Successfully!</span>
        </div>
      )}
    </>
  );
};
export default AddCustomer;
