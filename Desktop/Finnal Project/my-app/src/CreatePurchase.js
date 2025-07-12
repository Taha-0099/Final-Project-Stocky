// src/components/CreatePurchase.js
import React, { useState } from 'react';
import './CreatePurchase.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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

const CreatePurchase = () => {
  const [form, setForm] = useState({
    date: new Date().toISOString().split('T')[0],
    supplier: '',
    warehouse: '',
    orderTax: 0,
    discount: 0,
    shipping: 0,
    status: 'pending',
    note: ''
  });

  // Base amount placeholder; replace with actual calculation as needed
  const baseAmount = 1000;
  const taxAmount = ((baseAmount - form.discount) * form.orderTax) / 100;
  const grandTotal = baseAmount - form.discount + form.shipping - taxAmount;

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!form.supplier || !form.warehouse) {
      alert('Please select supplier and warehouse');
      return;
    }

    // coerce all numeric fields to numbers
    const payload = {
      ...form,
      orderTax: Number(form.orderTax) || 0,
      discount: Number(form.discount) || 0,
      shipping: Number(form.shipping) || 0,
      total: grandTotal,
      paid: 0
    };

    try {
      await axios.post(
        'http://localhost:5001/Purchases',
        payload
      );
      navigate('/APP'); // route to AllPurchase.js
    } catch (err) {
      const msg = err.response?.data?.error || err.message;
      console.error('Create purchase failed:', msg);
      alert(`Could not create purchase: ${msg}`);
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

      <div className="cp-container">
        <h2>Create Purchase <span className="breadcrumb">All Purchases | Create Purchase</span></h2>
        <div className="cp-box">
          <div className="cp-row">
            <div className="cp-field">
              <label>Date *</label>
              <input
                type="date"
                value={form.date}
                onChange={e => setForm({ ...form, date: e.target.value })}
                required
              />
            </div>
            <div className="cp-field">
              <label>Supplier *</label>
              <select
                value={form.supplier}
                onChange={e => setForm({ ...form, supplier: e.target.value })}
                required
              >
                <option value="">Choose Supplier</option>
                <option value="Supplier 1">Supplier 1</option>
              </select>
            </div>
            <div className="cp-field">
              <label>Warehouse *</label>
              <select
                value={form.warehouse}
                onChange={e => setForm({ ...form, warehouse: e.target.value })}
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
                  <th>Net Unit Cost</th>
                  <th>Current Stock</th>
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
                  onChange={e => setForm({ ...form, orderTax: e.target.value })}
                />
                <span className="inline-symbol">%</span>
              </div>
              <div className="flex-row">
                <label>Discount</label>
                <input
                  type="number"
                  value={form.discount}
                  onChange={e => setForm({ ...form, discount: e.target.value })}
                />
                <span className="inline-symbol">$</span>
              </div>
              <div className="flex-row">
                <label>Shipping</label>
                <input
                  type="number"
                  value={form.shipping}
                  onChange={e => setForm({ ...form, shipping: e.target.value })}
                />
                <span className="inline-symbol">$</span>
              </div>
              <div className="flex-row">
                <label>Status</label>
                <select
                  value={form.status}
                  onChange={e => setForm({ ...form, status: e.target.value })}
                >
                  <option value="pending">pending</option>
                  <option value="ordered">ordered</option>
                  <option value="completed">completed</option>
                </select>
              </div>
            </div>
            <div className="right-summary">
              <p>Order Tax: <strong>${taxAmount.toFixed(2)} ({parseFloat(form.orderTax).toFixed(2)}%)</strong></p>
              <p>Discount: <strong>${parseFloat(form.discount).toFixed(2)}</strong></p>
              <p>Shipping: <strong>${parseFloat(form.shipping).toFixed(2)}</strong></p>
              <p className="grand-total">Grand Total: <strong>${grandTotal.toFixed(2)}</strong></p>
            </div>
          </div>

          <div className="note-area">
            <label>Note</label>
            <textarea
              placeholder="A few words..."
              value={form.note}
              onChange={e => setForm({ ...form, note: e.target.value })}
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

export default CreatePurchase;
