import React from 'react';
import './PU.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilter, faFilePdf, faFileExcel, faPlus, faPen } from '@fortawesome/free-solid-svg-icons';


import {
  faBarcode,
  faBars,
  faExpandArrowsAlt,
  faGlobe,
  faShoppingCart,
  faClipboardList,
  faChartBar,
  faBoxes,
  faExchangeAlt,
  faFileInvoice,
  faArrowRight,
  faArrowLeft,
  faCog
} from '@fortawesome/free-solid-svg-icons';
import { faBell as farBell } from '@fortawesome/free-regular-svg-icons';

import SideBar from './SideBar';


const users = [
  { firstName: 'Buyer', lastName: 'Buyer', username: 'Buyer', email: 'purchases@example.com', phone: '0123456789' },
  { firstName: 'seller', lastName: 'seller', username: 'seller', email: 'sales@example.com', phone: '0123456789' },
  { firstName: 'William', lastName: 'Castillo', username: 'William Castillo', email: 'admin@example.com', phone: '0123456789' },
];

const PU = () => {



  return (




    <>
<SideBar/>

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
          <button className="create"><FontAwesomeIcon icon={faPlus} /> Create</button>
        </div>
      </div>

      <table className="user-table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, idx) => (
            <tr key={idx}>
              <td>{u.firstName}</td>
              <td>{u.lastName}</td>
              <td>{u.username}</td>
              <td>{u.email}</td>
              <td>{u.phone}</td>
              <td>
                <label className="switch">
                  <input type="checkbox" defaultChecked />
                  <span className="slider"></span>
                </label>
              </td>
              <td>
                <button className="edit-btn"><FontAwesomeIcon icon={faPen} /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="footer">
        <p>Rows per page: <span>10 ▼</span></p>
        <p>1 - 3 of 3 <span className="pagination">prev next</span></p>
      </div>

      <div className="footer-bar">
        <div>
          <strong>Stocky - Ultimate Inventory With POS</strong><br />
          <small>© 2025 Developed by Stocky<br />All rights reserved - v5.0</small>
        </div>
        <button className="buy-btn">Buy Stocky</button>
      </div>
    </div>

    </>
  );
};

export default PU;
