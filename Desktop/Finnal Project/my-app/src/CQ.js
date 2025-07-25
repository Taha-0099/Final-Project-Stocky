import React, { useState } from 'react';
import './CQ.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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

const CQ = () => {
  const [form, setForm] = useState({
    date: new Date().toISOString().split('T')[0],
    customer: '',
    warehouse: '',
    orderTax: 0,
    discount: 0,
    shipping: 0,
    status: 'Pending',
    note: ''
  });

  const baseAmount = 0;
  const discount = parseFloat(form.discount || 0);
  const orderTax = parseFloat(form.orderTax || 0);
  const shipping = parseFloat(form.shipping || 0);
  const taxAmount = ((baseAmount - discount) * orderTax) / 100;
  const grandTotal = baseAmount - discount + shipping + taxAmount;

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!form.customer || !form.warehouse) {
      alert('Please select both a customer and a warehouse');
      return;
    }
    try {
      await axios.post('http://localhost:5001/Quotations', { ...form, total: grandTotal });
      navigate('/AQ');
    } catch (err) {
      console.error('Create quotation failed:', err);
      alert('Failed to create quotation. See console for details.');
    }
  };

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

      <div className="cq-container">
        <h2>Create Quotation <span className="breadcrumb">All Quotations | Create Quotation</span></h2>

        <div className="cq-box">
          <div className="cq-row">
            <div className="cq-field">
              <label>Date *</label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                required
              />
            </div>

            <div className="cq-field">
              <label>Customer *</label>
              <select
                value={form.customer}
                onChange={(e) => setForm({ ...form, customer: e.target.value })}
                required
              >
                <option value="">Choose Customer</option>
                <option value="walk-in-customer">walk-in-customer</option>
              </select>
            </div>

            <div className="cq-field">
              <label>Warehouse *</label>
              <select
                value={form.warehouse}
                onChange={(e) => setForm({ ...form, warehouse: e.target.value })}
                required
              >
                <option value="">Choose Warehouse</option>
                <option value="Warehouse 1">Warehouse 1</option>
                <option value="Warehouse 2">Warehouse 2</option>
              </select>
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
                  <th>Product</th>
                  <th>Net Unit Price</th>
                  <th>Stock</th>
                  <th>Qty</th>
                  <th>Discount</th>
                  <th>Tax</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                <tr><td colSpan="8" className="no-data">No data Available</td></tr>
              </tbody>
            </table>
          </div>

          <div className="summary-row">
            <div className="left-fields">
              <div className="flex-row">
                <label>Order Tax</label>
                <input
                  type="number"
                  value={form.orderTax}
                  onChange={(e) => setForm({ ...form, orderTax: e.target.value })}
                />
                <span className="inline-symbol">%</span>
              </div>

              <div className="flex-row">
                <label>Discount</label>
                <input
                  type="number"
                  value={form.discount}
                  onChange={(e) => setForm({ ...form, discount: e.target.value })}
                />
                <span className="inline-symbol">$</span>
              </div>

              <div className="flex-row">
                <label>Shipping</label>
                <input
                  type="number"
                  value={form.shipping}
                  onChange={(e) => setForm({ ...form, shipping: e.target.value })}
                />
                <span className="inline-symbol">$</span>
              </div>

              <div className="flex-row">
                <label>Status *</label>
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                >
                  <option>Pending</option>
                  <option>Sent</option>
                  <option>Completed</option>
                </select>
              </div>
            </div>

            <div className="right-summary">
              <p>Order Tax: <strong>${taxAmount.toFixed(2)} ({orderTax.toFixed(2)}%)</strong></p>
              <p>Discount: <strong>${discount.toFixed(2)}</strong></p>
              <p>Shipping: <strong>${shipping.toFixed(2)}</strong></p>
              <p className="grand-total"><strong>Grand Total: ${grandTotal.toFixed(2)}</strong></p>
            </div>
          </div>

          <div className="note-area">
            <label>Note</label>
            <textarea
              value={form.note}
              onChange={(e) => setForm({ ...form, note: e.target.value })}
              placeholder="A few words ..."
            />
          </div>

          <button className="submit-btn" onClick={handleSubmit}>Submit</button>
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

export default CQ;
