import React from "react";
import "./Payroll.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  faFilter, faFilePdf, faFileExcel, faFileImport,
  faPlus, faEye, faPen, faTimes,
  faBarcode, faBars, faExpandArrowsAlt, faGlobe, faShoppingCart,
  faClipboardList, faChartBar, faBoxes, faExchangeAlt,
  faFileInvoice, faArrowRight, faArrowLeft, faCog
} from '@fortawesome/free-solid-svg-icons';
import { faBell as farBell } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';

import SideBar from './SideBar';

const Payroll = () => {
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




    <div className="payroll-container">
      <div className="payroll-header">
        <h2>Payroll <span className="breadcrumb">HRM | Payroll</span></h2>
      </div>

      <div className="payroll-card">
        <div className="payroll-search-create">
          <div className="search-box">
            <i className="fas fa-search"></i>
            <input type="text" placeholder="Search this table" />
          </div>
          <button className="create-button">
            <i className="fas fa-plus"></i> Create
          </button>
        </div>

        <table className="payroll-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Reference</th>
              <th>Employee</th>
              <th>Account</th>
              <th>Amount</th>
              <th>Paid by</th>
              <th>Payment Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="8" className="no-data">No data for table</td>
            </tr>
          </tbody>
        </table>

        <div className="table-footer">
          <div className="rows-per-page">
            Rows per page:
            <select>
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
          </div>
          <div className="pagination">
            0 - 0 of 0
            <button disabled>prev</button>
            <button disabled>next</button>
          </div>
        </div>
      </div>

      <footer className="footer">
        <div className="footer-left">
          <i className="fas fa-circle-dollar-to-slot footer-icon"></i>
          © 2025 Developed by Stocky
        </div>
        <div className="footer-right">
          All rights reserved - v4.0.9
        </div>
      </footer>
    </div>
    </>
  );
};

export default Payroll;
