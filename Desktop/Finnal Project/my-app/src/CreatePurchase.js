import React, { useState, useEffect } from 'react';
import './CreatePurchase.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import {
  faBarcode,
  faBars,
  faExpandArrowsAlt,
  faGlobe,
  faTrash
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

  // --- Product related state ---
  const [allProducts, setAllProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProducts, setSelectedProducts] = useState([]);

  const navigate = useNavigate();

  // --- Fetch all products on mount ---
  useEffect(() => {
    axios.get('http://localhost:5001/Products')
      .then(res => setAllProducts(res.data))
      .catch(() => setAllProducts([]));
  }, []);

  // --- Product search and filter logic ---
  const filteredProducts = allProducts.filter(prod => {
    const term = searchTerm.toLowerCase();
    return (
      prod.name?.toLowerCase().includes(term) ||
      prod.codeProduct?.toLowerCase().includes(term)
    );
  });

  // --- Add product to purchase list ---
  const addProductToPurchase = (product) => {
    setSelectedProducts(prev => {
      if (prev.find(p => p._id === product._id)) return prev; // avoid duplicates
      return [...prev, { ...product, qty: 1, discount: 0, tax: 0 }];
    });
  };

  // --- Remove product from purchase list ---
  const removeProductFromPurchase = (id) => {
    setSelectedProducts(prev => prev.filter(p => p._id !== id));
  };

  // --- Update quantity, discount, or tax for product ---
  const updateProductField = (id, field, value) => {
    setSelectedProducts(prev => prev.map(p =>
      p._id === id ? { ...p, [field]: value } : p
    ));
  };

  // --- Calculate totals ---
  const getSubtotal = (p) => {
    const unitCost = Number(p.productCost) || 0;
    const qty = Number(p.qty) || 0;
    const discount = Number(p.discount) || 0;
    const tax = Number(p.tax) || 0;
    // subtotal = (unit cost * qty - discount) + tax
    return Math.max(0, (unitCost * qty - discount) + tax);
  };
  const baseAmount = selectedProducts.reduce((sum, p) => sum + getSubtotal(p), 0);
  const taxAmount = ((baseAmount - (Number(form.discount) || 0)) * (Number(form.orderTax) || 0)) / 100;
  const grandTotalRaw = baseAmount - (Number(form.discount) || 0) + (Number(form.shipping) || 0) + taxAmount;
  const grandTotal = grandTotalRaw > 0 ? grandTotalRaw : 0;

  // --- Handle Submit ---
  const handleSubmit = async () => {
    if (!form.supplier || !form.warehouse) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Data',
        text: 'Please select supplier and warehouse.'
      });
      return;
    }
    if (selectedProducts.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'No Products',
        text: 'Please add at least one product to purchase.'
      });
      return;
    }

    // Build the payload
    const products = selectedProducts.map(p => ({
      productId: p._id,
      name: p.name,
      codeProduct: p.codeProduct,
      qty: Number(p.qty),
      productCost: Number(p.productCost) || 0,
      discount: Number(p.discount) || 0,
      tax: Number(p.tax) || 0,
      subtotal: getSubtotal(p)
    }));

    const payload = {
      ...form,
      orderTax: Number(form.orderTax) || 0,
      discount: Number(form.discount) || 0,
      shipping: Number(form.shipping) || 0,
      total: grandTotal,
      paid: 0,
      products
    };

    try {
      await axios.post('http://localhost:5001/Purchases', payload);
      Swal.fire({
        icon: 'success',
        title: 'Purchase Created!',
        text: 'Your purchase has been saved successfully.',
        confirmButtonColor: '#8f5aff'
      }).then(() => {
        navigate('/APP'); // Go to AllPurchase.js after OK
      });
    } catch (err) {
      const msg = err.response?.data?.error || err.message;
      Swal.fire({
        icon: 'error',
        title: 'Could not create purchase',
        text: msg,
        confirmButtonColor: '#d33'
      });
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
                {/* You can fetch real suppliers here */}
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

          {/* ---- Product Search and Select ---- */}
          <div className="product-search">
            <label>Product</label>
            <div className="search-input">
              <FontAwesomeIcon icon={faBarcode} className="barcode-icon" />
              <input
                type="text"
                placeholder="Scan/Search Product by Code Or Name"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                autoComplete="off"
              />
              {/* Product dropdown */}
              {searchTerm && (
                <div className="product-dropdown">
                  {filteredProducts.length > 0 ? (
                    filteredProducts.slice(0, 8).map(p => (
                      <div
                        key={p._id}
                        className="product-dropdown-item"
                        onClick={() => {
                          addProductToPurchase(p);
                          setSearchTerm('');
                        }}
                      >
                        <img
                          className="dropdown-img"
                          src={p.imgurl || '/placeholder-image.jpg'}
                          alt={p.name}
                          onError={e => { e.target.src = '/placeholder-image.jpg'; }}
                        />
                        <div>
                          <div style={{ fontWeight: 600 }}>{p.name}</div>
                          <div style={{ color: '#777', fontSize: 13 }}>
                            {p.codeProduct ? <span>Code: {p.codeProduct}</span> : null}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="product-dropdown-item">No matching product</div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* ---- Purchase Product Table ---- */}
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
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {selectedProducts.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="no-data">No data Available</td>
                  </tr>
                ) : (
                  selectedProducts.map((p, idx) => (
                    <tr key={p._id}>
                      <td>{idx + 1}</td>
                      <td>{p.name} <br /><span style={{ color: '#888' }}>{p.codeProduct}</span></td>
                      <td>${Number(p.productCost).toFixed(2)}</td>
                      <td>{(p.openingStock1 || 0) + (p.openingStock2 || 0)}</td>
                      <td>
                        <input
                          type="number"
                          min="1"
                          style={{ width: 60 }}
                          value={p.qty}
                          onChange={e => updateProductField(p._id, 'qty', Math.max(1, Number(e.target.value)))}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          min="0"
                          style={{ width: 60 }}
                          value={p.discount}
                          onChange={e => updateProductField(p._id, 'discount', Math.max(0, Number(e.target.value)))}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          min="0"
                          style={{ width: 60 }}
                          value={p.tax}
                          onChange={e => updateProductField(p._id, 'tax', Math.max(0, Number(e.target.value)))}
                        />
                      </td>
                      <td>${getSubtotal(p).toFixed(2)}</td>
                      <td>
                        <button
                          className="remove-btn"
                          onClick={() => removeProductFromPurchase(p._id)}
                          title="Remove Product"
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
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
                  min="0"
                  onChange={e => setForm({ ...form, orderTax: e.target.value })}
                />
                <span className="inline-symbol">%</span>
              </div>
              <div className="flex-row">
                <label>Discount</label>
                <input
                  type="number"
                  value={form.discount}
                  min="0"
                  onChange={e => setForm({ ...form, discount: e.target.value })}
                />
                <span className="inline-symbol">$</span>
              </div>
              <div className="flex-row">
                <label>Shipping</label>
                <input
                  type="number"
                  value={form.shipping}
                  min="0"
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
              <p>Order Tax: <strong>${taxAmount.toFixed(2)} ({parseFloat(form.orderTax || 0).toFixed(2)}%)</strong></p>
              <p>Discount: <strong>${parseFloat(form.discount || 0).toFixed(2)}</strong></p>
              <p>Shipping: <strong>${parseFloat(form.shipping || 0).toFixed(2)}</strong></p>
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
