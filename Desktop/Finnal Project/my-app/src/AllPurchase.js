// src/components/AllPurchase.js
import React, { useState, useEffect } from 'react';
import './AllPurchase.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faFilter,
  faFilePdf,
  faFileExcel,
  faPlus,
  faBars,
  faExpandArrowsAlt,
  faGlobe
} from '@fortawesome/free-solid-svg-icons';
import { faBell as farBell } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';
import SideBar from './SideBar';
import axios from 'axios';

const AllPurchase = () => {
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5001/Purchases')
      .then(res => setPurchases(res.data))
      .catch(err => console.error('Error fetching purchases:', err));
  }, []);

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

      <div className="ap-wrapper">
        <h2>All Purchases <span className="breadcrumb">Purchases | All Purchases</span></h2>

        <div className="ap-toolbar">
          <div className="search-bar">
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
            <input type="text" placeholder="Search this table" />
          </div>
          <div className="actions">
            <button><FontAwesomeIcon icon={faFilter} /> Filter</button>
            <button><FontAwesomeIcon icon={faFilePdf} /> PDF</button>
            <button><FontAwesomeIcon icon={faFileExcel} /> EXCEL</button>
            <Link to="/CPP" className="create-btn"><FontAwesomeIcon icon={faPlus} /> Create</Link>
          </div>
        </div>

        <table className="ap-table">
          <thead>
            <tr>
              <th><input type="checkbox" /></th>
              <th>Date</th>
              <th>Reference</th>
              <th>Supplier</th>
              <th>Warehouse</th>
              <th>Status</th>
              <th>Grand Total</th>
              <th>Paid</th>
              <th>Due</th>
              <th>Payment Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {purchases.map(item => (
              <tr key={item._id}>
                <td><input type="checkbox" /></td>
                <td>{new Date(item.date).toLocaleString()}</td>
                <td className="link">{item.ref}</td>
                <td>{item.supplier}</td>
                <td>{item.warehouse}</td>
                <td><span className={`status ${item.status.toLowerCase()}`}>{item.status}</span></td>
                <td>{item.total.toFixed(2)}</td>
                <td>{item.paid.toFixed(2)}</td>
                <td>{item.due.toFixed(2)}</td>
                <td><span className={`payment ${item.paymentStatus.toLowerCase()}`}>{item.paymentStatus}</span></td>
                <td><span className="dot-menu">⋮</span></td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="ap-footer">
          <span>Rows per page: <select><option>10</option></select></span>
          <span>1 - {purchases.length} of {purchases.length}</span>
          <span className="pagination">prev | next</span>
        </div>

        <footer className="footer">
          <div>
            <strong>Stocky - Ultimate Inventory With POS</strong><br />
            © 2025 Developed by Stocky<br />
            All rights reserved - v4.0.9
          </div>
          <div className="footer-logo">S</div>
        </footer>
      </div>
    </>
  );
};

export default AllPurchase;
