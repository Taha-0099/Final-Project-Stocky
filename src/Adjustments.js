import React, { useState } from 'react';
import './Adjustments.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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

const Adjustments = () => {
  const [warehouse, setWarehouse] = useState('');
  const [date, setDate] = useState(new Date().toISOString().substr(0, 10));
  const [note, setNote] = useState('');

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

      <div className="adjustment-container">
        <h2>
          Create Adjustment
          <span className="breadcrumb"> All Adjustments | Create Adjustment</span>
        </h2>

        <div className="adjustment-box">
          <div className="adjustment-row">
            <div className="adjustment-field">
              <label>Warehouse *</label>
              <select value={warehouse} onChange={(e) => setWarehouse(e.target.value)}>
                <option value="">Choose Warehouse</option>
                <option value="Main">Main Warehouse</option>
                <option value="Backup">Backup Warehouse</option>
              </select>
            </div>

            <div className="adjustment-field">
              <label>Date *</label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
          </div>

          <div className="product-search">
            <label>Product</label>
            <div className="search-input">
              <FontAwesomeIcon icon={faBarcode} className="barcode-icon" />
              <input type="text" placeholder="Scan/Search Product by Code Or Name" />
            </div>
          </div>

          <div className="product-table">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Code Product</th>
                  <th>Product</th>
                  <th>Stock</th>
                  <th>Qty</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="6" className="no-data">No data Available</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="note-area">
            <label>Note</label>
            <textarea
              placeholder="A few words ..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>

          <button className="submit-btn">Submit</button>
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

export default Adjustments;
