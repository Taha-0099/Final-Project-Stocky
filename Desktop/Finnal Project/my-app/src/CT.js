import React, { useState } from 'react';
import './CT.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faPaperPlane } from '@fortawesome/free-solid-svg-icons';




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


const CT = () => {
  const [date, setDate] = useState('');
  const [fromWarehouse, setFromWarehouse] = useState('');
  const [toWarehouse, setToWarehouse] = useState('');
  const [product, setProduct] = useState('');
  const [orderTax, setOrderTax] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [status, setStatus] = useState('Completed');
  const [note, setNote] = useState('');

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


    <div className="ct-container">
      <h2>Create Transfer</h2>

      <div className="form-row">
        <div className="form-group">
          <label>Date *</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div className="form-group">
          <label>From Warehouse *</label>
          <select value={fromWarehouse} onChange={(e) => setFromWarehouse(e.target.value)}>
            <option>Choose Warehouse</option>
          </select>
        </div>
        <div className="form-group">
          <label>To Warehouse *</label>
          <select value={toWarehouse} onChange={(e) => setToWarehouse(e.target.value)}>
            <option>Choose Warehouse</option>
          </select>
        </div>
      </div>

      <div className="product-search">
        <FontAwesomeIcon icon={faBarcode} className="icon" />
        <input type="text" placeholder="Scan/Search Product by Code Or Name" value={product} onChange={(e) => setProduct(e.target.value)} />
      </div>

      <table className="product-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Product</th>
            <th>Net Unit Cost</th>
            <th>Stock</th>
            <th>Qty</th>
            <th>Discount</th>
            <th>Tax</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          <tr><td colSpan="8" className="no-data">No data available</td></tr>
        </tbody>
      </table>

      <div className="totals">
        <div>Order Tax: $0.00 (0.00%)</div>
        <div>Discount: $0.00</div>
        <div>Shipping: $0.00</div>
        <div><strong>Grand Total: $0.00</strong></div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Order Tax</label>
          <input type="number" value={orderTax} onChange={(e) => setOrderTax(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Discount</label>
          <input type="number" value={discount} onChange={(e) => setDiscount(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Shipping</label>
          <input type="number" value={shipping} onChange={(e) => setShipping(e.target.value)} />
        </div>
      </div>

      <div className="form-group">
        <label>Status *</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option>Completed</option>
          <option>Pending</option>
        </select>
      </div>

      <div className="form-group">
        <label>Note</label>
        <textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="A few words..."></textarea>
      </div>

      <button className="submit-button">
        <FontAwesomeIcon icon={faPaperPlane} /> Submit
      </button>
    </div>

    </>
  );
};

export default CT;
