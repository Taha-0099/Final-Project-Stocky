import React, { useState, useEffect } from 'react';
import './Company.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlus, faPen, faTimes, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { faBell as farBell } from '@fortawesome/free-regular-svg-icons';
import { faBars, faExpandArrowsAlt, faGlobe } from '@fortawesome/free-solid-svg-icons';
import SideBar from './SideBar';
import Header from './Header';

const Company = () => {
  const [showModal, setShowModal] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [company, setCompany] = useState({ name: '', email: '', phone: '', country: '' });

  const fetchCompanies = async () => {
    try {
      const res = await fetch('http://localhost:5001/Companies');
      const data = await res.json();
      setCompanies(data);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleChange = e => {
    setCompany({ ...company, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await fetch('http://localhost:5001/Companies/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(company)
      });
      setShowModal(false);
      setCompany({ name: '', email: '', phone: '', country: '' });
      fetchCompanies();
    } catch (error) {
      alert('Failed to create company');
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5001/Companies/${id}`, { method: 'DELETE' });
      fetchCompanies();
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  return (
    <>
     <Header/>
      <SideBar />
     

      <div className="company-container">
        <h2>Company <span className="breadcrumb">HRM | Company</span></h2>
        <div className="toolbar">
          <div className="search-box">
            <FontAwesomeIcon icon={faSearch} />
            <input type="text" placeholder="Search this table" />
          </div>
          <button className="create-btn" onClick={() => setShowModal(true)}>
            <FontAwesomeIcon icon={faPlus} /> Create
          </button>
        </div>

        <table className="company-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Country</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {companies.map(c => (
              <tr key={c._id}>
                <td>{c.name}</td>
                <td>{c.phone}</td>
                <td>{c.country}</td>
                <td>{c.email}</td>
                <td className="actions">
                  <FontAwesomeIcon icon={faPen} className="edit-icon" />
                  <FontAwesomeIcon icon={faTimes} className="delete-icon" onClick={() => handleDelete(c._id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <footer className="footer">
          <strong>Stocky - Ultimate Inventory With POS</strong><br />
          © 2025 Developed by Stocky - v4.0.9
        </footer>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <span>Create Company</span>
              <FontAwesomeIcon icon={faTimes} className="close-icon" onClick={() => setShowModal(false)} />
            </div>
            <form className="modal-form" onSubmit={handleSubmit}>
              <input required name="name" value={company.name} onChange={handleChange} placeholder="Name*" />
              <input name="email" value={company.email} onChange={handleChange} placeholder="Email" />
              <input name="phone" value={company.phone} onChange={handleChange} placeholder="Phone" />
              <input name="country" value={company.country} onChange={handleChange} placeholder="Country" />
              <button className="modal-submit">
                <FontAwesomeIcon icon={faCheckCircle} /> Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Company;
