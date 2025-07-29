import React, { useState, useEffect } from 'react';
import './AS.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch, faFilter, faFilePdf, faFileExcel,
  faBarcode, faBars, faPlus, faEdit, faTrash,
  faExpandArrowsAlt, faGlobe, faEye, faCog,
  faMoneyCheckDollar, faDownload, faEnvelope, faMobileAlt,
  faShippingFast, faFileInvoice, faCommentDots
} from '@fortawesome/free-solid-svg-icons';
import { faBell as farBell } from '@fortawesome/free-regular-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

import SideBar from './SideBar';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Action from './Action';

const AS = () => {
  const [sales, setSales] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = () => {
    axios.get('http://localhost:5001/Sales')
      .then(res => setSales(res.data))
      .catch(err => console.error('Error fetching sales:', err));
  };

  const navigate = useNavigate();

  const handleDelete = async (saleId) => {
    const res = await Swal.fire({
      title: 'Delete Sale?',
      text: 'Are you sure you want to delete this sale?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete',
      confirmButtonColor: '#e74c3c'
    });
    if (res.isConfirmed) {
      try {
        await axios.delete(`http://localhost:5001/Sales/${saleId}`);
        setSales(sales.filter(s => s._id !== saleId));
        Swal.fire('Deleted!', '', 'success');
      } catch (err) {
        Swal.fire('Error', 'Failed to delete sale.', 'error');
      }
    }
  };

  const handleEdit = (sale) => {
    setEditForm({ ...sale, products: sale.products ? [...sale.products] : [] });
    setShowEditModal(true);
  };

  const handleView = (sale) => {
    Swal.fire('Sale Detail', `Sale Ref: ${sale.ref}`, 'info');
  };

  const handleShowPayments = (sale) => {
    Swal.fire('Payments', `Payment detail for sale: ${sale.ref}`, 'info');
  };

  const handleEditShipping = (sale) => {
    Swal.fire('Edit Shipping', `Edit shipping for sale: ${sale.ref}`, 'info');
  };

  const handleInvoicePOS = (sale) => {
    Swal.fire('Invoice POS', `Show invoice for sale: ${sale.ref}`, 'info');
  };

  const handleDownloadPdf = (sale) => {
    Swal.fire('Download PDF', `Download PDF for sale: ${sale.ref}`, 'info');
  };

  const handleWhatsApp = (sale) => {
    Swal.fire('WhatsApp', `Send WhatsApp notification for sale: ${sale.ref}`, 'info');
  };

  const handleEmail = (sale) => {
    Swal.fire('Email', `Send email for sale: ${sale.ref}`, 'info');
  };

  const handleSms = (sale) => {
    Swal.fire('SMS', `Send SMS for sale: ${sale.ref}`, 'info');
  };

  const handleEditFormChange = (field, value) => {
    setEditForm(prev => ({ ...prev, [field]: value }));
  };

  const handleEditProductChange = (idx, field, value) => {
    setEditForm(prev => {
      const products = [...(prev.products || [])];
      products[idx][field] = value;
      return { ...prev, products };
    });
  };

  const handleEditSave = async () => {
    try {
      await axios.put(`http://localhost:5001/Sales/${editForm._id}`, editForm);
      fetchSales();
      setShowEditModal(false);
    } catch (err) {
      Swal.fire('Error', 'Failed to save changes.', 'error');
    }
  };

  // Helper function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }) + ' ' + date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  // Helper function to calculate due amount
  const calculateDue = (total, paid) => {
    const t = (total == null ? 0 : total);
    const p = (paid == null ? 0 : paid);
    return (t - p).toFixed(2);
  };

  // Helper function to determine payment status
  const getPaymentStatus = (total, paid) => {
    const paidAmount = (paid == null ? 0 : paid);
    if (paidAmount === 0) return 'Unpaid';
    if (paidAmount >= (total == null ? 0 : total)) return 'Paid';
    return 'Partial';
  };

  // Helper function to get shipping status
  const getShippingStatus = (status) => {
    if (status === 'completed') return 'Delivered';
    if (status === 'pending') return 'Packed';
    if (status === 'ordered') return 'Packed';
    return 'Packed';
  };

  // ---- Search logic ----
  const filteredSales = sales.filter((s) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    // Search by customer, reference, status, or any product name in products array
    return (
      (s.customer && s.customer.toLowerCase().includes(q)) ||
      (s.ref && s.ref.toLowerCase().includes(q)) ||
      (s.status && s.status.toLowerCase().includes(q)) ||
      (s.addedBy && s.addedBy.toLowerCase().includes(q)) ||
      (s.warehouse && s.warehouse.toLowerCase().includes(q)) ||
      (Array.isArray(s.products) && s.products.some(p =>
        p.name && p.name.toLowerCase().includes(q)
      ))
    );
  });

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

      <div className="as-container">
        <div className="page-header">
          <h2>All Sales</h2>
          <span className="breadcrumb">Sales | All Sales</span>
        </div>

        <div className="as-toolbar">
          <div className="search-box">
            <FontAwesomeIcon icon={faSearch} />
            <input
              type="text"
              placeholder="Search this table"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="action-buttons">
            <button className="filter-btn">
              <FontAwesomeIcon icon={faFilter} /> Filter
            </button>
            <button className="pdf-btn">
              <FontAwesomeIcon icon={faFilePdf} /> PDF
            </button>
            <button className="excel-btn">
              <FontAwesomeIcon icon={faFileExcel} /> EXCEL
            </button>
            <Link to="/CR" className="create-btn">
              <FontAwesomeIcon icon={faPlus} /> Create
            </Link>
          </div>
        </div>

        <div className="table-container">
          <table className="as-table">
            <thead>
              <tr>
                <th className="checkbox-col"><input type="checkbox" /></th>
                <th className="date-col">Date</th>
                <th className="reference-col">Reference</th>
                <th className="addedby-col">Added by</th>
                <th className="customer-col">Customer</th>
                <th className="warehouse-col">Warehouse</th>
                <th className="status-col">Status</th>
                <th className="total-col">Grand Total</th>
                <th className="paid-col">Paid</th>
                <th className="due-col">Due</th>
                <th className="payment-status-col">Payment Status</th>
                <th className="shipping-status-col">Shipping Status</th>
                <th className="action-col">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredSales.map((s, idx) => (
                <tr key={s._id}>
                  <td className="checkbox-col"><input type="checkbox" /></td>
                  <td className="date-col">{formatDate(s.date)}</td>
                  <td className="reference-col"><span className="link">{s.ref}</span></td>
                  <td className="addedby-col">{s.addedBy || 'William Castillo'}</td>
                  <td className="customer-col">{s.customer}</td>
                  <td className="warehouse-col">{s.warehouse || 'Warehouse 1'}</td>
                  <td className="status-col">
                    <span className={`status ${s.status}`}>{s.status}</span>
                  </td>
                  <td className="total-col">{(s.total == null ? 0 : s.total).toFixed(2)}</td>
                  <td className="paid-col">{(s.paid == null ? 0 : s.paid).toFixed(2)}</td>
                  <td className="due-col">{calculateDue(s.total, s.paid)}</td>
                  <td className="payment-status-col">
                    <span className={`status ${getPaymentStatus(s.total, s.paid).toLowerCase()}`}>
                      {getPaymentStatus(s.total, s.paid)}
                    </span>
                  </td>
                  <td className="shipping-status-col">
                    <span className={`status ${getShippingStatus(s.status).toLowerCase()}`}>
                      {getShippingStatus(s.status)}
                    </span>
                  </td>
                  <td className="action-col" style={{ position: "relative" }}>
                    <Action
                      menuItems={[
                        {
                          icon: faEye,
                          label: "Sale Detail",
                          onClick: () => navigate(`/SD/${s._id}`),
                        },
                        { icon: faEdit, label: "Edit Sale", onClick: () => handleEdit(s) },
                        { icon: faMoneyCheckDollar, label: "Show Payments", onClick: () => handleShowPayments(s) },
                        { icon: faShippingFast, label: "Edit Shipping", onClick: () => handleEditShipping(s) },
                        { icon: faFileInvoice, label: "Invoice POS", onClick: () => handleInvoicePOS(s) },
                        { icon: faDownload, label: "Download Pdf", onClick: () => handleDownloadPdf(s) },
                        { icon: faWhatsapp, label: "WhatsApp Notification", onClick: () => handleWhatsApp(s) },
                        { icon: faEnvelope, label: "Email notification", onClick: () => handleEmail(s) },
                        { icon: faCommentDots, label: "SMS notification", onClick: () => handleSms(s) },
                        { icon: faTrash, label: "Delete Sale", onClick: () => handleDelete(s._id), danger: true }
                      ]}
                    />
                  </td>
                </tr>
              ))}
              {filteredSales.length === 0 && (
                <tr>
                  <td colSpan="13" className="no-data">
                    No sales found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="as-footer">
          <div className="rows-per-page">
            <span>Rows per page:</span>
            <select>
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
          </div>
          <div className="pagination-info">
            <span>1 - {filteredSales.length} of {filteredSales.length}</span>
          </div>
          <div className="pagination-controls">
            <button className="pagination-btn" disabled>prev</button>
            <button className="pagination-btn" disabled>next</button>
          </div>
        </div>
      </div>

      <footer className="main-footer">
        <div className="footer-content">
          <div className="footer-text">
            <strong>Stocky - Ultimate Inventory With POS</strong><br />
            © 2025 Developed by Stocky<br />
            All rights reserved - v4.0.9
          </div>
          <div className="footer-logo">S</div>
        </div>
      </footer>

      {showEditModal && editForm && (
        <div className="edit-modal">
          <div className="modal-content">
            <h3>Edit Sale</h3>
            <div className="form-group">
              <label>Date</label>
              <input
                type="date"
                value={editForm.date ? editForm.date.split('T')[0] : ''}
                onChange={e => handleEditFormChange('date', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Customer</label>
              <input
                type="text"
                value={editForm.customer}
                onChange={e => handleEditFormChange('customer', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Added By</label>
              <input
                type="text"
                value={editForm.addedBy || ''}
                onChange={e => handleEditFormChange('addedBy', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Warehouse</label>
              <input
                type="text"
                value={editForm.warehouse || ''}
                onChange={e => handleEditFormChange('warehouse', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Status</label>
              <select
                value={editForm.status}
                onChange={e => handleEditFormChange('status', e.target.value)}
              >
                <option value="pending">pending</option>
                <option value="completed">completed</option>
                <option value="ordered">ordered</option>
              </select>
            </div>
            <div className="form-group">
              <label>Total</label>
              <input
                type="number"
                value={editForm.total}
                onChange={e => handleEditFormChange('total', parseFloat(e.target.value) || 0)}
              />
            </div>
            <div className="form-group">
              <label>Paid</label>
              <input
                type="number"
                value={editForm.paid == null ? 0 : editForm.paid}
                onChange={e => handleEditFormChange('paid', parseFloat(e.target.value) || 0)}
              />
            </div>
            <div className="form-group">
              <label>Products</label>
              <table className="edit-products-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Qty</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {(editForm.products || []).map((prod, pidx) => (
                    <tr key={pidx}>
                      <td>
                        <input
                          type="text"
                          value={prod.name}
                          onChange={e => handleEditProductChange(pidx, 'name', e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          value={prod.quantity}
                          onChange={e => handleEditProductChange(pidx, 'quantity', parseInt(e.target.value) || 1)}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          value={prod.price}
                          onChange={e => handleEditProductChange(pidx, 'price', parseFloat(e.target.value) || 0)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="modal-actions">
              <button className="save-btn" onClick={handleEditSave}>Save</button>
              <button className="cancel-btn" onClick={() => setShowEditModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <button className="buy-stocky-btn">Buy Stocky</button>
    </>
  );
};

export default AS;
