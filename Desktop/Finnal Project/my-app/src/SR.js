import React from "react";
import "./SR.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faFilter, faFilePdf, faFileExcel } from "@fortawesome/free-solid-svg-icons";

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

const SR = () => {
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


    <div className="sr-container">
      <h2>Sales Return <span className="breadcrumb">All Returns | Sales Return</span></h2>

      <div className="sr-toolbar">
        <div className="search-box">
          <FontAwesomeIcon icon={faSearch} />
          <input type="text" placeholder="Search this table" />
        </div>
        <div className="action-buttons">
          <button><FontAwesomeIcon icon={faFilter} /> Filter</button>
          <button><FontAwesomeIcon icon={faFilePdf} /> PDF</button>
          <button><FontAwesomeIcon icon={faFileExcel} /> EXCEL</button>
        </div>
      </div>

      <table className="sr-table">
        <thead>
          <tr>
            <th><input type="checkbox" /></th>
            <th>Date</th>
            <th>Reference</th>
            <th>Customer</th>
            <th>Warehouse</th>
            <th>Sale Ref</th>
            <th>Status</th>
            <th>Grand Total</th>
            <th>Paid</th>
            <th>Due</th>
            <th>Payment Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan="12" className="no-data">No data for table</td>
          </tr>
        </tbody>
      </table>

      <div className="sr-footer">
        <span>Rows per page: 
          <select>
            <option>10</option>
            <option>20</option>
          </select>
        </span>
        <span>0 - 0 of 0</span>
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

export default SR;
