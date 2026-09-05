// frontEnd/src/pages/FindCustomer.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Edit, Trash } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react'; // Table verification components
import Navbar from '../components/Navbar.js';

const FindCustomer = () => {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showEditModal, setShowEditModal] = useState(false); 
  const [showToast, setShowToast] = useState(false); 
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    regNo: '', name: '', gender: 'Male', dob: '', motherName: '', fatherName: '', pob: '', regDate: '', unitName: '', unitCode: ''
  });

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/customers', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCustomers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if(!window.confirm("Are you sure you want to delete this customer record?")) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/customers/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchCustomers();
    } catch (err) {
      alert("Delete failed");
    }
  };

  const startEdit = (cust) => {
    setEditingId(cust._id);
    setEditForm(cust); 
    setShowEditModal(true); 
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/customers/${editingId}`, editForm, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setShowEditModal(false); 
      fetchCustomers(); 
      
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      alert("Update validation failed");
    }
  };

  const filtered = customers.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <>
      <Navbar />
      <div className="dashboard-container" style={{ maxWidth: '1200px' }}>
        <div className="layout-card">
          <input type="text" className="search-bar" placeholder="🔍 Search customer by name..." value={searchTerm} onChange={e=>setSearchTerm(e.target.value)} />
          
          <div style={{ overflowX: 'auto' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>QR Profile</th><th>Reg No.</th><th>Name</th><th>Gender</th><th>DOB</th><th>Mother's Name</th><th>Father's Name</th><th>POB</th><th>Reg Date</th><th>Unit Name</th><th>Unit Code</th><th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(c => {
                  // Direct clean routing connection linking structure
                  const currentVerificationUrl = window.location.origin + "/verify/" + c.regNo;
                  return (
                    <tr key={c._id}>
                      <td style={{ padding: '8px', textAlign: 'center' }}>
                        <div style={{ padding: '4px', background: '#fff', borderRadius: '4px', display: 'inline-block', border: '1px solid #e5e7eb' }}>
                          <QRCodeSVG value={currentVerificationUrl} size={50} />
                        </div>
                      </td>
                      <td>{c.regNo}</td>
                      <td>{c.name}</td>
                      <td>{c.gender}</td>
                      <td>{c.dob}</td>
                      <td>{c.motherName}</td>
                      <td>{c.fatherName}</td>
                      <td>{c.pob}</td>
                      <td>{c.regDate}</td>
                      <td>{c.unitName}</td>
                      <td>{c.unitCode}</td>
                      <td>
                        <button className="btn-icon text-warning" onClick={()=>startEdit(c)}><Edit size={18}/></button>
                        <button className="btn-icon text-danger" onClick={()=>handleDelete(c._id)}><Trash size={18}/></button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Pop-up Dialog Box for Updating Customer */}
      {showEditModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 25px rgba(0,0,0,0.15)', width: '100%', maxWidth: '800px', maxHeight: '90vh', overflowY: 'auto' }}>
            <h3 style={{ color: '#1e3a8a', fontSize: '1.4rem', fontWeight: '600', marginBottom: '1.5rem', textAlign: 'center' }}>Update Customer Details</h3>
            
            <form className="grid-form" onSubmit={handleUpdate} style={{ gap: '1rem' }}>
              <div className="form-group"><label>Registration Number</label><input type="text" className="form-control" required value={editForm.regNo} onChange={e=>setEditForm({...editForm, regNo: e.target.value})} /></div>
              <div className="form-group"><label>Name</label><input type="text" className="form-control" required value={editForm.name} onChange={e=>setEditForm({...editForm, name: e.target.value})} /></div>
              <div className="form-group">
                <label>Gender</label>
                <select className="form-control" value={editForm.gender} onChange={e=>setEditForm({...editForm, gender: e.target.value})}>
                  <option value="Male">Male</option><option value="Female">Female</option><option value="Others">Others</option>
                </select>
              </div>
              <div className="form-group"><label>Date of Birth</label><input type="date" className="form-control" required value={editForm.dob} onChange={e=>setEditForm({...editForm, dob: e.target.value})} /></div>
              <div className="form-group"><label>Name of Mother</label><input type="text" className="form-control" required value={editForm.motherName} onChange={e=>setEditForm({...editForm, motherName: e.target.value})} /></div>
              <div className="form-group"><label>Name of Father</label><input type="text" className="form-control" required value={editForm.fatherName} onChange={e=>setEditForm({...editForm, fatherName: e.target.value})} /></div>
              <div className="form-group"><label>Place of Birth</label><input type="text" className="form-control" required value={editForm.pob} onChange={e=>setEditForm({...editForm, pob: e.target.value})} /></div>
              <div className="form-group"><label>Registration Date</label><input type="date" className="form-control" required value={editForm.regDate} onChange={e=>setEditForm({...editForm, regDate: e.target.value})} /></div>
              <div className="form-group"><label>Registration Unit Name</label><input type="text" className="form-control" required value={editForm.unitName} onChange={e=>setEditForm({...editForm, unitName: e.target.value})} /></div>
              <div className="form-group"><label>Registration Unit Code</label><input type="text" className="form-control" required value={editForm.unitCode} onChange={e=>setEditForm({...editForm, unitCode: e.target.value})} /></div>
              
              <div className="action-row" style={{ flexDirection: 'row', justifyContent: 'center', width: '100%', gap: '1.5rem', marginTop: '1rem' }}>
                <button type="submit" className="btn-action btn-submit" style={{ padding: '0.65rem 2.5rem', borderRadius: '6px' }}>Update Customer</button>
                <button type="button" className="btn-action btn-qr" style={{ padding: '0.65rem 2.5rem', borderRadius: '6px' }} onClick={()=>setShowEditModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showToast && (
        <div style={{ position: 'fixed', bottom: '25px', right: '25px', backgroundColor: '#10b981', color: 'white', padding: '1rem 2rem', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', zIndex: 2000, fontWeight: '600' }}>
          <span>Customer Updated Successfully</span>
        </div>
      )}
    </>
  );
};

export default FindCustomer;
