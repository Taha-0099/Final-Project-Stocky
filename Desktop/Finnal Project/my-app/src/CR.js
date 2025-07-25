
import React, { useState } from 'react';
import './CR.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBarcode,
  faBars,
  faExpandArrowsAlt,
  faGlobe
} from '@fortawesome/free-solid-svg-icons';
import { faBell as farBell } from '@fortawesome/free-regular-svg-icons';
import SideBar from './SideBar';
import Swal from 'sweetalert2';

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

  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', quantity: 1, price: 0 });

  const baseAmount = products.reduce((sum, p) => sum + ((p.price || 0) * (p.quantity || 0)), 0);
  const orderTaxAmount = ((baseAmount - form.discount) * form.orderTax) / 100;
  const grandTotal = baseAmount - form.discount + form.shipping + orderTaxAmount;

  const navigate = useNavigate();

  const handleProductAdd = () => {
    if (!newProduct.name || !newProduct.quantity) return;
    setProducts([...products, { ...newProduct }]);
    setNewProduct({ name: '', quantity: 1, price: 0 });
  };

  const handleProductRemove = idx => {
    setProducts(products.filter((_, i) => i !== idx));
  };

  const handleSubmit = async () => {
    if (!form.customer || !form.warehouse) {
      Swal.fire('Error', 'Please select both customer and warehouse', 'error');
      return;
    }
    if (!products.length) {
      Swal.fire('Error', 'Add at least one product', 'error');
      return;
    }
    try {
      await axios.post('http://localhost:5001/Sales', {
        ...form,
        total: grandTotal,
        paid: form.paymentStatus === 'Paid' ? grandTotal : 0,
        ref: 'S-' + Date.now(),
        products
      });
      Swal.fire('Success', 'Sale created successfully!', 'success').then(() => {
        navigate('/AS');
      });
    } catch (err) {
      console.error('Create sale failed:', err);
      Swal.fire('Error', 'Failed to create sale. See console for details.', 'error');
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
          <label>Add Product</label>
          <div className="search-input" style={{ display: 'flex', gap: 8 }}>
            <FontAwesomeIcon icon={faBarcode} className="barcode-icon" />
            <input
              type="text"
              placeholder="Product Name"
              value={newProduct.name}
              onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
              style={{ width: 140 }}
            />
            <input
              type="number"
              placeholder="Qty"
              min="1"
              value={newProduct.quantity}
              onChange={e => setNewProduct({ ...newProduct, quantity: parseInt(e.target.value) || 1 })}
              style={{ width: 60 }}
            />
            <input
              type="number"
              placeholder="Price"
              min="0"
              value={newProduct.price}
              onChange={e => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) || 0 })}
              style={{ width: 80 }}
            />
            <button type="button" onClick={handleProductAdd}>Add</button>
          </div>
        </div>

        <div className="product-table">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Product</th>
                <th>Unit Price</th>
                <th>Qty</th>
                <th>Subtotal</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr><td colSpan="6" className="no-data">No products added</td></tr>
              ) : products.map((p, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{p.name}</td>
                  <td>${p.price}</td>
                  <td>{p.quantity}</td>
                  <td>${(p.price * p.quantity).toFixed(2)}</td>
                  <td>
                    <button type="button" onClick={() => handleProductRemove(idx)}>Remove</button>
                  </td>
                </tr>
              ))}
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


