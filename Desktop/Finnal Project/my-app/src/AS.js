import React, { useState, useEffect } from 'react';
import './AS.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch, faFilter, faFilePdf, faFileExcel,
  faBarcode, faBars, faPlus, faEdit, faTrash,
  faExpandArrowsAlt, faGlobe, faEye, faCog,
  faMoneyCheckDollar, faDownload, faEnvelope,
  faShippingFast, faFileInvoice, faCommentDots
} from '@fortawesome/free-solid-svg-icons';
import { faBell as farBell } from '@fortawesome/free-regular-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

import SideBar from './SideBar';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Action from './Action';

// ---- Excel & PDF Export ----
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import autoTable from "jspdf-autotable";
const AS = () => {
  const [sales, setSales] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState(null);
  const [search, setSearch] = useState('');
  const [showPayments, setShowPayments] = useState(false);
  const [paymentsData, setPaymentsData] = useState(null);

  // Edit Payment Modal states
  const [showEditPayment, setShowEditPayment] = useState(false);
  const [editPaymentData, setEditPaymentData] = useState(null);

  useEffect(() => { fetchSales(); }, []);

  const fetchSales = () => {
    axios.get('http://localhost:5001/Sales')
      .then(res => setSales(res.data))
      .catch(err => console.error('Error fetching sales:', err));
  };

  const navigate = useNavigate();

  // ----- Export to Excel -----
  const exportToExcel = () => {
    // Table headers
    const wscols = [
      "Date", "Reference", "Added by", "Customer", "Warehouse",
      "Status", "Grand Total", "Paid", "Due", "Payment Status", "Shipping Status"
    ];
    // Prepare rows
    const rows = sales.map(s => ([
      s.date ? new Date(s.date).toLocaleDateString('en-CA') : '',
      s.ref || '',
      s.addedBy || '',
      s.customer || '',
      s.warehouse || '',
      s.status || '',
      s.total != null ? s.total.toFixed(2) : '0.00',
      s.paid != null ? s.paid.toFixed(2) : '0.00',
      ((s.total||0)-(s.paid||0)).toFixed(2),
      getPaymentStatus(s.total, s.paid).toLowerCase(),
      getShippingStatus(s.status).toLowerCase(),
    ]));
    const worksheet = XLSX.utils.aoa_to_sheet([wscols, ...rows]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "sales");
    const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    saveAs(new Blob([wbout], { type: "application/octet-stream" }), "sales.xlsx");
  };

  // ----- Export to PDF -----
 const exportToPDF = () => {
  const doc = new jsPDF();
  const tableColumn = [
    "Date", "Reference", "Added by", "Customer", "Warehouse",
    "Status", "Grand Total", "Paid", "Due", "Payment Status", "Shipping Status"
  ];
  const tableRows = sales.map(s => ([
    s.date ? new Date(s.date).toLocaleDateString('en-CA') : '',
    s.ref || '',
    s.addedBy || '',
    s.customer || '',
    s.warehouse || '',
    s.status || '',
    s.total != null ? s.total.toFixed(2) : '0.00',
    s.paid != null ? s.paid.toFixed(2) : '0.00',
    ((s.total||0)-(s.paid||0)).toFixed(2),
    getPaymentStatus(s.total, s.paid).toLowerCase(),
    getShippingStatus(s.status).toLowerCase(),
  ]));
  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 20,
    styles: { fontSize: 9 }
  });
  doc.save('sales.pdf');
};


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

  const handleShowPayments = (sale) => {
    setPaymentsData({
      _id: sale._id,
      customer: sale.customer,
      date: sale.date ? sale.date.split('T')[0] : '',
      reference: sale.ref ? `INV/${sale.ref}` : '',
      rawRef: sale.ref || '',
      amount: sale.paid || 0,
      paidBy: sale.paidBy || "Cash",
      account: sale.account || '',
      note: sale.note || '',
    });
    setShowPayments(true);
  };

  // ------ Edit Payment Logic ------
  const handleEditPayment = () => {
    setEditPaymentData({ ...paymentsData });
    setShowEditPayment(true);
  };

  const handleEditPaymentField = (field, value) => {
    setEditPaymentData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleEditPaymentSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5001/Sales/${editPaymentData._id}`, {
        paid: editPaymentData.amount,
        paidBy: editPaymentData.paidBy,
        account: editPaymentData.account,
        note: editPaymentData.note
      });
      setShowEditPayment(false);
      setShowPayments(false);
      fetchSales();
      Swal.fire('Success', 'Payment updated successfully!', 'success');
    } catch (err) {
      Swal.fire('Error', 'Failed to update payment.', 'error');
    }
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

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric', month: '2-digit', day: '2-digit'
    }) + ' ' + date.toLocaleTimeString('en-US', {
      hour: '2-digit', minute: '2-digit', second: '2-digit'
    });
  };

  // Calculate due
  const calculateDue = (total, paid) => {
    const t = (total == null ? 0 : total);
    const p = (paid == null ? 0 : paid);
    return (t - p).toFixed(2);
  };

  // Payment/Shipping status
  function getPaymentStatus(total, paid) {
    const paidAmount = (paid == null ? 0 : paid);
    if (paidAmount === 0) return 'Unpaid';
    if (paidAmount >= (total == null ? 0 : total)) return 'Paid';
    return 'Partial';
  }
  function getShippingStatus(status) {
    if (status === 'completed') return 'Delivered';
    if (status === 'pending') return 'Shipped';
    if (status === 'ordered') return 'Packed';
    if (status === 'cancelled') return 'Cancelled';
    return status || '';
  }

  // Search logic
  const filteredSales = sales.filter((s) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
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

  // --- Show Payments Modal Component ---
  const PaymentsModal = ({ open, onClose, data, onEdit }) => {
    if (!open || !data) return null;
    return (
      <div style={{
        position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
        background: 'rgba(0,0,0,0.19)', display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 9999
      }}>
        <div style={{
          background: '#fff',
          borderRadius: 16,
          padding: '28px 16px 24px 16px',
          minWidth: 320,
          width: '100%',
          maxWidth: 500,
          boxShadow: '0 2px 30px #b393e744',
          position: 'relative',
          overflowX: 'auto'
        }}>
          <div style={{ fontSize: 26, fontWeight: 600, marginBottom: 20 }}>Show Payments
            <span
              style={{ position: "absolute", top: 18, right: 22, cursor: "pointer", fontSize: 23, color: "#bbb" }}
              onClick={onClose}
              title="Close"
            >&#10005;</span>
          </div>
          <div style={{ width: "100%", overflowX: "auto" }}>
            <table style={{
              width: '100%',
              minWidth: 430,
              borderCollapse: 'collapse',
              fontSize: 14,
              marginBottom: 10
            }}>
              <thead>
                <tr style={{ background: "#faf8fd", color: "#444" }}>
                  <th style={{ textAlign: "left", padding: "9px 14px", fontWeight: 500 }}>Date</th>
                  <th style={{ textAlign: "left", padding: "9px 14px", fontWeight: 500 }}>Reference</th>
                  <th style={{ textAlign: "left", padding: "9px 14px", fontWeight: 500 }}>Amount</th>
                  <th style={{ textAlign: "left", padding: "9px 14px", fontWeight: 500 }}>Paid By</th>
                  <th style={{ textAlign: "center", padding: "9px 14px", fontWeight: 500 }}>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: "9px 14px", maxWidth: 80, wordBreak: "break-all" }}>{data.date}</td>
                  <td style={{ padding: "9px 14px", maxWidth: 140, wordBreak: "break-all" }}>{data.reference}</td>
                  <td style={{ padding: "9px 14px" }}>${Number(data.amount).toLocaleString(undefined, {minimumFractionDigits:2})}</td>
                  <td style={{ padding: "9px 14px" }}>{data.paidBy}</td>
                  <td style={{ textAlign: "center", padding: "9px 14px" }}>
                    <button className="modal-icon-btn" title="POS Invoice"><FontAwesomeIcon icon={faFileInvoice} style={{ color: "#4682ea", fontSize: 17, margin: "0 3px" }} /></button>
                    <button className="modal-icon-btn" title="Edit" onClick={onEdit}><FontAwesomeIcon icon={faEdit} style={{ color: "#34be80", fontSize: 17, margin: "0 3px" }} /></button>
                    <button className="modal-icon-btn" title="Email"><FontAwesomeIcon icon={faEnvelope} style={{ color: "#7e63ea", fontSize: 17, margin: "0 3px" }} /></button>
                    <button className="modal-icon-btn" title="SMS"><FontAwesomeIcon icon={faCommentDots} style={{ color: "#a46cee", fontSize: 17, margin: "0 3px" }} /></button>
                    <button className="modal-icon-btn" title="Delete"><FontAwesomeIcon icon={faTrash} style={{ color: "#e35d5e", fontSize: 17, margin: "0 3px" }} /></button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  // ---- Edit Payment Modal (already present) ----
  const EditPaymentModal = ({ open, onClose, data, onChange, onSubmit }) => {
    if (!open || !data) return null;
    return (
      <div style={{
        position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
        background: 'rgba(0,0,0,0.19)', display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 10000
      }}>
        <form
          style={{
            background: '#fff',
            borderRadius: 16,
            padding: '34px 30px 30px 30px',
            minWidth: 540,
            maxWidth: 650,
            boxShadow: '0 2px 32px #b393e744',
            position: 'relative',
            overflowX: 'auto',
            width: '100%'
          }}
          onSubmit={onSubmit}
        >
          <div style={{ fontSize: 26, fontWeight: 600, marginBottom: 16 }}>
            Edit Payment
            <span
              style={{ position: "absolute", top: 22, right: 30, cursor: "pointer", fontSize: 23, color: "#bbb" }}
              onClick={onClose}
              title="Close"
            >&#10005;</span>
          </div>
          <div style={{ fontSize: 28, fontWeight: 500, marginBottom: 22, textAlign: 'center' }}>
            {data.customer || ''}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
            <div style={{ flex: 1, minWidth: 190 }}>
              <label>Date</label>
              <input
                type="date"
                className="edit-field"
                value={data.date || ''}
                onChange={e => onChange('date', e.target.value)}
                style={{ width: "100%", marginBottom: 16 }}
              />
            </div>
            <div style={{ flex: 1, minWidth: 190 }}>
              <label>Reference</label>
              <input
                type="text"
                className="edit-field"
                value={data.reference || ''}
                readOnly
                style={{ width: "100%", marginBottom: 16 }}
              />
            </div>
            <div style={{ flex: 1, minWidth: 190 }}>
              <label>Payment choice</label>
              <select
                value={data.paidBy}
                onChange={e => onChange('paidBy', e.target.value)}
                style={{ width: "100%", marginBottom: 16 }}
              >
                <option value="Cash">Cash</option>
                <option value="Credit Card">Credit Card</option>
                <option value="Bank">Bank</option>
                <option value="Cheque">Cheque</option>
              </select>
            </div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
            <div style={{ flex: 1, minWidth: 190 }}>
              <label>Received Amount</label>
              <input
                type="number"
                className="edit-field"
                value={data.amount}
                onChange={e => onChange('amount', e.target.value)}
                style={{ width: "100%", marginBottom: 16 }}
              />
            </div>
            <div style={{ flex: 1, minWidth: 190 }}>
              <label>Paying Amount</label>
              <input
                type="number"
                className="edit-field"
                value={data.amount}
                readOnly
                style={{ width: "100%", marginBottom: 16 }}
              />
            </div>
            <div style={{ flex: 1, minWidth: 190 }}>
              <label>Change Return</label>
              <input
                type="text"
                className="edit-field"
                value={(Number(data.amount) - Number(data.amount)).toFixed(2)}
                readOnly
                style={{ width: "100%", marginBottom: 16, color: "red" }}
              />
            </div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
            <div style={{ flex: 1, minWidth: 190 }}>
              <label>Account</label>
              <select
                value={data.account}
                onChange={e => onChange('account', e.target.value)}
                style={{ width: "100%", marginBottom: 16 }}
              >
                <option value="">Choose Account</option>
                <option value="Account 1">Account 1</option>
                <option value="Account 2">Account 2</option>
                <option value="Account 3">Account 3</option>
              </select>
            </div>
            <div style={{ flex: 2, minWidth: 220 }}>
              <label>Note</label>
              <textarea
                className="edit-field"
                value={data.note || ''}
                onChange={e => onChange('note', e.target.value)}
                rows={3}
                style={{ width: "100%", marginBottom: 16 }}
              />
            </div>
          </div>
          <button
            type="submit"
            style={{
              background: '#8b4cf5',
              color: 'white',
              border: 'none',
              padding: '11px 32px',
              borderRadius: 8,
              fontWeight: 600,
              fontSize: 17,
              marginTop: 12,
              cursor: 'pointer'
            }}
          >
            <FontAwesomeIcon icon={faEdit} /> Submit
          </button>
        </form>
      </div>
    );
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
            <button className="pdf-btn" onClick={exportToPDF}>
              <FontAwesomeIcon icon={faFilePdf} /> PDF
            </button>
            <button className="excel-btn" onClick={exportToExcel}>
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
                <option value="cancelled">cancelled</option>
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

      <PaymentsModal
        open={showPayments}
        onClose={() => setShowPayments(false)}
        data={paymentsData}
        onEdit={handleEditPayment}
      />

      <EditPaymentModal
        open={showEditPayment}
        onClose={() => setShowEditPayment(false)}
        data={editPaymentData}
        onChange={handleEditPaymentField}
        onSubmit={handleEditPaymentSubmit}
      />

      <button className="buy-stocky-btn">Buy Stocky</button>
    </>
  );
};

export default AS;
