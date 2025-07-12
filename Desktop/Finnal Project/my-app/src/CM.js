import React from 'react';
import './CM.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch,   faDownload, faEllipsisV } from '@fortawesome/free-solid-svg-icons';




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

const customers = [
  { code: '104', name: 'Fred C. Rasmussen', phone: '040 33 61 47', email: 'Fred@example.com', tax: '', due: '0.00', returnDue: '0.00' },
  { code: '103', name: 'Phyliss J. Polite', phone: '0454 12 34 45', email: 'Phyliss@example.com', tax: '', due: '0.00', returnDue: '0.00' },
  { code: '102', name: 'Thomas M. Martin', phone: '01.12.34.45.55', email: 'Thomas@example.com', tax: '', due: '0.00', returnDue: '0.00' },
  { code: '101', name: 'Beverly B. Huber', phone: '123-345-432', email: 'Beverly@example.com', tax: '', due: '320.00', returnDue: '0.00' },
  { code: '105', name: 'walk-in-customer', phone: '123456780', email: 'walk-in-customer@example.com', tax: '', due: '650.00', returnDue: '0.00' },
];

const CM = () => {
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

    <div className="customer-container">
      <h2>Customer Management</h2>
      <p className="breadcrumb">Customers | Customer Management</p>

      <div className="top-controls">
        <div className="search-bar">
          <FontAwesomeIcon icon={faSearch} />
          <input type="text" placeholder="Search this table" />
        </div>
        <div className="action-buttons">
          <button><FontAwesomeIcon icon={faFilter} /> Filter</button>
          <button className="pdf"><FontAwesomeIcon icon={faFilePdf} /> PDF</button>
          <button className="excel"><FontAwesomeIcon icon={faFileExcel} /> EXCEL</button>
          <button className="import"><FontAwesomeIcon icon={faDownload} /> Import Customers</button>
          <button className="create"><FontAwesomeIcon icon={faPlus} /> Create</button>
        </div>
      </div>

      <table className="customer-table">
        <thead>
          <tr>
            <th><input type="checkbox" /></th>
            <th>Code</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Tax Number</th>
            <th>Total Sale Due</th>
            <th>Total Sell Return Due</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((cust, idx) => (
            <tr key={idx}>
              <td><input type="checkbox" /></td>
              <td>{cust.code}</td>
              <td>{cust.name}</td>
              <td>{cust.phone}</td>
              <td>{cust.email}</td>
              <td>{cust.tax}</td>
              <td>{cust.due}</td>
              <td>{cust.returnDue}</td>
              <td><FontAwesomeIcon icon={faEllipsisV} /></td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="footer">
        <p>Rows per page: <span>10 ▼</span></p>
        <p>1 - 5 of 5 <span className="pagination">prev next</span></p>
      </div>

      <div className="footer-bar">
        <span>Stocky - Ultimate Inventory With POS</span>
        <button className="buy-btn">Buy Stocky</button>
      </div>
    </div>
    </>
  );
};

export default CM;
