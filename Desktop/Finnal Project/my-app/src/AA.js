import React from 'react';
import './AA.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFilter, faFilePdf, faFileExcel, faPlus,
  faFileAlt, faEye, faPen, faTimes, faSearch
} from '@fortawesome/free-solid-svg-icons';

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

const AA = () => {
  const adjustments = [
    { date: '2025-05-12 19:25:43', ref: 'AD_1114', warehouse: 'Warehouse 2', total: 6 },
    { date: '2025-05-13 16:45:43', ref: 'AD_1113', warehouse: 'Warehouse 1', total: 1 },
    { date: '2025-05-14 10:30:43', ref: 'AD_1112', warehouse: 'Warehouse 1', total: 6 },
    { date: '2025-05-15 12:15:43', ref: 'AD_1111', warehouse: 'Warehouse 1', total: 1 },
  ];

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



    <div className="aa-container">
      <h2 className="aa-title">All Adjustments <span className="breadcrumb">Adjustment | All Adjustments</span></h2>

      <div className="aa-toolbar">
        <div className="aa-search">
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          <input type="text" placeholder="Search this table" />
        </div>
        <div className="aa-actions">
          <button><FontAwesomeIcon icon={faFilter} /> Filter</button>
          <button><FontAwesomeIcon icon={faFilePdf} /> PDF</button>
          <button><FontAwesomeIcon icon={faFileExcel} /> EXCEL</button>
          <button className="create-btn"><FontAwesomeIcon icon={faPlus} />  Create</button>
        </div>
      </div>

      <table className="aa-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Reference</th>
            <th>Warehouse</th>
            <th>Total Products</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {adjustments.map((a, i) => (
            <tr key={i}>
              <td>{a.date}</td>
              <td>{a.ref}</td>
              <td>{a.warehouse}</td>
              <td>{a.total.toFixed(2)}</td>
              <td className="action-icons">
                <FontAwesomeIcon icon={faFileAlt} className="export" />
                <FontAwesomeIcon icon={faEye} className="view" />
                <FontAwesomeIcon icon={faPen} className="edit" />
                <FontAwesomeIcon icon={faTimes} className="delete" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="aa-footer">
        <span>Rows per page: 
          <select>
            <option>10</option>
            <option>20</option>
          </select>
        </span>
        <span>1 - {adjustments.length} of {adjustments.length}</span>
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

export default AA;
