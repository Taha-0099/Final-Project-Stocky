import React from 'react';
import './TL.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle, faPause, faSpinner, faTimesCircle,
  faSearch, 
} from '@fortawesome/free-solid-svg-icons';

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

const TL = () => {
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



    <div className="task-container">
      <h2>Task List</h2>
      <p className="breadcrumb">Tasks | Task List</p>

      <div className="status-cards">
        <div className="card">
          <FontAwesomeIcon icon={faCheckCircle} className="icon" />
          <p>Completed</p>
          <span>0</span>
        </div>
        <div className="card">
          <FontAwesomeIcon icon={faPause} className="icon" />
          <p>Not Started</p>
          <span>0</span>
        </div>
        <div className="card">
          <FontAwesomeIcon icon={faSpinner} className="icon" />
          <p>In Progress</p>
          <span>0</span>
        </div>
        <div className="card">
          <FontAwesomeIcon icon={faTimesCircle} className="icon" />
          <p>Cancelled</p>
          <span>0</span>
        </div>
      </div>

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

      <table className="task-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Project</th>
            <th>Company</th>
            <th>Start date</th>
            <th>Finish date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr><td colSpan="7" className="no-data">No data for table</td></tr>
        </tbody>
      </table>

      <div className="footer">
        <p>Rows per page: <span>10 ▼</span></p>
        <p>0 - 0 of 0 <span className="pagination">prev next</span></p>
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

export default TL;
