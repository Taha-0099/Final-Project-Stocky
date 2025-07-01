import React, { useState } from 'react';
import './CR.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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

const CR = () => {
  const [form, setForm] = useState({
    date: new Date().toISOString().split('T')[0],
    customer: '',
    warehouse: '',
    orderTax: 0,
    discount: 0,
    shipping: 0,
    status: 'pending',
    paymentStatus: 'Pending',
    note: ''
  });

  // Replace baseAmount with real sum of line items
  const baseAmount = 1000;
  const orderTaxAmount = ((baseAmount - form.discount) * form.orderTax) / 100;
  const grandTotal = baseAmount - form.discount + form.shipping + orderTaxAmount;

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!form.customer || !form.warehouse) {
      alert('Please select both customer and warehouse');
      return;
    }
    try {
      await axios.post('http://localhost:5001/Sales', {
        ...form,
        total: grandTotal
      });
      navigate('/AS');
    } catch (err) {
      console.error('Create sale failed:', err);
      alert('Failed to create sale. See console for details.');
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

      <div className="cr-container">
        <h2>Create Sale <span className="breadcrumb">Sales | Create Sale</span></h2>

        <div className="cr-row">
          <div className="cr-field">
            <label>Date *</label>
            <input
              type="date"
              value={form.date}
              onChange={e => setForm({ ...form, date: e.target.value })}
              required
            />
          </div>
          <div className="cr-field">
            <label>Customer *</label>
            <select
              value={form.customer}
              onChange={e => setForm({ ...form, customer: e.target.value })}
              required
            >
              <option value="">Choose Customer</option>
              <option value="walk-in-customer">walk-in-customer</option>
            </select>
          </div>
          <div className="cr-field">
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

        <div className="cr-summary">
          <div className="left-fields">
            <div className="cr-field">
              <label>Order Tax</label>
              <input
                type="number"
                value={form.orderTax}
                onChange={e => setForm({ ...form, orderTax: parseFloat(e.target.value) || 0 })}
              />
              <span>%</span>
            </div>
            <div className="cr-field">
              <label>Discount</label>
              <input
                type="number"
                value={form.discount}
                onChange={e => setForm({ ...form, discount: parseFloat(e.target.value) || 0 })}
              />
              <span>$</span>
            </div>
            <div className="cr-field">
              <label>Shipping</label>
              <input
                type="number"
                value={form.shipping}
                onChange={e => setForm({ ...form, shipping: parseFloat(e.target.value) || 0 })}
              />
              <span>$</span>
            </div>
            <div className="cr-field">
              <label>Status</label>
              <select
                value={form.status}
                onChange={e => setForm({ ...form, status: e.target.value })}
              >
                <option value="pending">pending</option>
                <option value="completed">completed</option>
              </select>
            </div>
            <div className="cr-field">
              <label>Payment Status</label>
              <select
                value={form.paymentStatus}
                onChange={e => setForm({ ...form, paymentStatus: e.target.value })}
              >
                <option value="Pending">Pending</option>
                <option value="Paid">Paid</option>
              </select>
            </div>
          </div>
          <div className="right-summary">
            <p>Order Tax: <strong>${orderTaxAmount.toFixed(2)} ({form.orderTax}%)</strong></p>
            <p>Discount: <strong>${form.discount.toFixed(2)}</strong></p>
            <p>Shipping: <strong>${form.shipping.toFixed(2)}</strong></p>
            <p className="grand-total">Grand Total: <strong>${grandTotal.toFixed(2)}</strong></p>
          </div>
        </div>

        <div className="note-area">
          <label>Note</label>
          <textarea
            value={form.note}
            onChange={e => setForm({ ...form, note: e.target.value })}
            placeholder="A few words ..."
          />
        </div>

        <button className="submit-btn" onClick={handleSubmit}>Submit</button>
      </div>
    </>
  );
};

export default CR;