import React, { useEffect, useState } from 'react';
import './PU.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch, faFilter, faFilePdf, faFileExcel, faPlus, faPen, faBars, faExpandArrowsAlt, faGlobe, faTrash
} from '@fortawesome/free-solid-svg-icons';
import { faBell as farBell } from '@fortawesome/free-regular-svg-icons';
import SideBar from './SideBar';
import axios from 'axios';

const API = 'http://localhost:5001/Users';

const roleOptions = [
  { value: 'Admin', label: 'Admin' },
  { value: 'User', label: 'User' },
  { value: 'Sales', label: 'Sales' },
  { value: 'Purchases', label: 'Purchases' }
];

const initialForm = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  role: 'User'
};

const PU = () => {
  const [users, setUsers] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [editId, setEditId] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${API}/all`);
      setUsers(res.data);
    } catch (err) {
      setUsers([]);
    }
  };

  const openCreate = () => {
    setForm(initialForm);
    setIsEdit(false);
    setEditId('');
    setError('');
    setShowPopup(true);
  };

  const openEdit = (user) => {
    const nameParts = (user.name || '').split(' ');
    setForm({
      firstName: nameParts[0] || '',
      lastName: nameParts.slice(1).join(' ') || '',
      email: user.email,
      password: '',
      role: user.role
    });
    setIsEdit(true);
    setEditId(user._id);
    setError('');
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setError('');
    setSuccessMsg('');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    const { firstName, lastName, email, password, role } = form;
    const name = (firstName + ' ' + lastName).trim();

    if (!firstName.trim() || !lastName.trim() || !email.trim() || (!isEdit && !password.trim())) {
      setError('All fields are required.');
      return;
    }
    try {
      if (isEdit) {
        // PATCH to update user
        const updateData = {
          name,
          email: email.trim(),
          role
        };
        if (password.trim()) updateData.password = password.trim();

        await axios.patch(`${API}/update/${editId}`, updateData);
        setSuccessMsg('User updated!');
        fetchUsers();
        setTimeout(closePopup, 1000);
      } else {
        await axios.post(`${API}/register`, {
          name,
          email: email.trim(),
          password: password.trim(),
          role
        });
        setSuccessMsg('User created!');
        fetchUsers();
        setTimeout(closePopup, 1000);
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
        (isEdit ? 'Update failed' : 'User creation failed')
      );
    }
  };

  // --- DELETE USER FUNCTION ---
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      await axios.delete(`${API}/delete/${id}`);
      fetchUsers();
    } catch (err) {
      alert('Failed to delete user.');
    }
  };

  return (
    <>
      <SideBar />
      <header className="dashboard-header">
        <div className="logo-section">
          <div className="logo">S</div>
          <FontAwesomeIcon icon={faBars} className="icon" />
        </div>
        <div className="header-icons">
          <button className="pos-btn">POS</button>
          <FontAwesomeIcon icon={faExpandArrowsAlt} className="icon" />
          <FontAwesomeIcon icon={faGlobe} className="icon" />
          <div className="notification-icon">
            <FontAwesomeIcon icon={farBell} className="icon" />
            <span className="badge">1</span>
          </div>
          <div className="brand-name">STOCKY</div>
        </div>
      </header>

      <div className="user-management-container">
        <h2>Users management</h2>
        <p className="breadcrumb">Users | Users management</p>

        <div className="top-controls">
          <div className="search-bar">
            <FontAwesomeIcon icon={faSearch} />
            <input type="text" placeholder="Search this table" />
          </div>
          <div className="action-buttons">
            <button><FontAwesomeIcon icon={faFilter} /> Filter</button>
            <button className="pdf"><FontAwesomeIcon icon={faFilePdf} /> PDF</button>
            <button className="excel"><FontAwesomeIcon icon={faFileExcel} /> EXCEL</button>
            <button className="create" onClick={openCreate}><FontAwesomeIcon icon={faPlus} /> Create</button>
          </div>
        </div>

        <table className="user-table-compact">
          <thead>
            <tr>
              <th style={{width: '80px'}}>Name</th>
              <th style={{width: '120px'}}>Email</th>
              <th style={{width: '56px'}}>Role</th>
              <th style={{width: '36px'}}>Status</th>
              <th style={{width: '56px'}}>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 && (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', color: '#888' }}>No users found</td>
              </tr>
            )}
            {users.map((u, idx) => (
              <tr key={u._id || idx}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>
                  <label className="switch">
                    <input type="checkbox" checked={true} readOnly />
                    <span className="slider"></span>
                  </label>
                </td>
                <td>
                  <button className="user-table-action-btn edit-btn" onClick={() => openEdit(u)} title="Edit">
                    <FontAwesomeIcon icon={faPen} />
                  </button>
                  <button
                    className="user-table-action-btn delete-btn"
                    onClick={() => handleDelete(u._id)}
                    title="Delete"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="footer">
          <p>Rows per page: <span>10 ▼</span></p>
          <p>1 - {users.length} of {users.length} <span className="pagination">prev next</span></p>
        </div>

        <div className="footer-bar">
          <div>
            <strong>Stocky - Ultimate Inventory With POS</strong><br />
            <small>© 2025 Developed by Stocky<br />All rights reserved - v5.0</small>
          </div>
          <button className="buy-btn">Buy Stocky</button>
        </div>
      </div>

      {/* POPUP FORM */}
      {showPopup &&
        <div className="popup-overlay">
          <form className="popup-form" onSubmit={handleSubmit}>
            <div className="popup-header">
              <span>{isEdit ? "Edit" : "Create"} User</span>
              <button type="button" className="close-btn" onClick={closePopup}>×</button>
            </div>
            <div className="popup-content">
              <div className="row">
                <div className="field">
                  <label>First Name *</label>
                  <input name="firstName" value={form.firstName} onChange={handleChange} required />
                </div>
                <div className="field">
                  <label>Last Name *</label>
                  <input name="lastName" value={form.lastName} onChange={handleChange} required />
                </div>
              </div>
              <div className="row">
                <div className="field">
                  <label>Email *</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} required />
                </div>
                <div className="field">
                  <label>Password {isEdit ? '(leave blank to keep current)' : '*'}</label>
                  <input name="password" type="password" value={form.password} onChange={handleChange} required={!isEdit} />
                </div>
              </div>
              <div className="row">
                <div className="field">
                  <label>Role *</label>
                  <select name="role" value={form.role} onChange={handleChange}>
                    {roleOptions.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              {error && <div className="error-message" style={{ color: 'red', margin: '5px 0' }}>{error}</div>}
              {successMsg && <div className="success-message" style={{ color: 'green', margin: '5px 0' }}>{successMsg}</div>}
            </div>
            <div className="popup-footer">
              <button type="submit" className="submit-btn">{isEdit ? "Update" : "Create"}</button>
            </div>
          </form>
        </div>
      }
    </>
  );
};

export default PU;
