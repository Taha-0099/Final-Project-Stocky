import React, { useState } from 'react';
import './PL.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPrint, faRotateRight, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

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


const PL = () => {
  const [warehouse, setWarehouse] = useState('');
  const [search, setSearch] = useState('');
  const [paperSize, setPaperSize] = useState('');
  const [displayPrice, setDisplayPrice] = useState(true);

  const handleReset = () => {
    setWarehouse('');
    setSearch('');
    setPaperSize('');
    setDisplayPrice(true);
  };

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


    <div className="pl-container">
      <h2>Print Labels <span className="breadcrumb">Products | Print Labels</span></h2>

      <div className="pl-field">
        <label>Warehouse *</label>
        <select value={warehouse} onChange={(e) => setWarehouse(e.target.value)}>
          <option value="">Choose Warehouse</option>
          <option value="main">Main Warehouse</option>
          <option value="secondary">Secondary Warehouse</option>
        </select>
      </div>

      <div className="pl-field">
        <label>Product</label>
        <div className="search-bar">
          <FontAwesomeIcon icon={faBarcode} className="barcode-icon" />
          <input
            type="text"
            placeholder="Scan/Search Product by Code Or Name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <table className="pl-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Code Product</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan="3" className="no-data">No data Available</td>
          </tr>
        </tbody>
      </table>

      <div className="pl-field">
        <label>Paper size</label>
        <select value={paperSize} onChange={(e) => setPaperSize(e.target.value)}>
          <option value="">Paper size</option>
          <option value="A4">A4</option>
          <option value="A5">A5</option>
        </select>
      </div>

      <div className="checkbox-wrapper">
        <input
          type="checkbox"
          checked={displayPrice}
          onChange={() => setDisplayPrice(!displayPrice)}
        />
        <label>Display Price</label>
      </div>

      <div className="pl-buttons">
        <button className="btn purple"><FontAwesomeIcon icon={faPenToSquare} /> Update</button>
        <button className="btn red" onClick={handleReset}><FontAwesomeIcon icon={faRotateRight} /> Reset</button>
        <button className="btn dark"><FontAwesomeIcon icon={faPrint} /> Print</button>
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

export default PL;
