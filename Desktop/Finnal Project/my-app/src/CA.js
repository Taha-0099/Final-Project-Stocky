import React, { useState } from 'react';
import './CA.css';
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
import Header from './Header';

const CA = () => {
  const [warehouse, setWarehouse] = useState('');
  const [date, setDate] = useState(new Date().toISOString().substr(0, 10));
  const [note, setNote] = useState('');

  return (
    <>
        <Header/>

<SideBar/>







    <div className="ca-container">
      <h2 className="ca-title">
        Create Adjustment <span className="breadcrumb">All Adjustments | Create Adjustment</span>
      </h2>

      <div className="ca-box">
        <div className="ca-row">
          <div className="ca-field">
            <label>Warehouse *</label>
            <select value={warehouse} onChange={(e) => setWarehouse(e.target.value)}>
              <option value="">Choose Warehouse</option>
              <option value="Warehouse 1">Warehouse 1</option>
              <option value="Warehouse 2">Warehouse 2</option>
            </select>
          </div>

          <div className="ca-field">
            <label>Date *</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>

        <div className="ca-product-search">
          <label>Product</label>
          <div className="search-box">
            <FontAwesomeIcon icon={faBarcode} className="barcode-icon" />
            <input type="text" placeholder="Scan/Search Product by Code Or Name" />
          </div>
        </div>

        <div className="ca-table">
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

        <div className="ca-note">
          <label>Note</label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="A few words ..."
          />
        </div>

        <button className="submit-btn">
          <FontAwesomeIcon icon={faBarcode} className="btn-icon" /> Submit
        </button>
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

export default CA;
