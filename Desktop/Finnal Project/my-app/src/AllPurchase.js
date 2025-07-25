import React, { useState, useEffect } from 'react';
import './AllPurchase.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faFilter,
  faFilePdf,
  faFileExcel,
  faPlus,
  faBars,
  faExpandArrowsAlt,
  faGlobe,
  faPen,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { faBell as farBell } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';
import SideBar from './SideBar';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import Header from './Header';

const AllPurchase = () => {
  const [purchases, setPurchases] = useState([]);
  const [search, setSearch] = useState('');
  const [editShow, setEditShow] = useState(false);
  const [editPurchase, setEditPurchase] = useState({});
  const [updating, setUpdating] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetchPurchases();
  }, []);

  const fetchPurchases = () => {
    axios.get('http://localhost:5001/Purchases')
      .then(res => setPurchases(res.data))
      .catch(err => console.error('Error fetching purchases:', err));
  };

  // FILTER PURCHASES BY SEARCH
  const filteredPurchases = purchases.filter(item => {
    const s = search.toLowerCase();
    return (
      (item.ref && item.ref.toLowerCase().includes(s)) ||
      (item.supplier && item.supplier.toLowerCase().includes(s)) ||
      (item.warehouse && item.warehouse.toLowerCase().includes(s)) ||
      (item.status && item.status.toLowerCase().includes(s)) ||
      (item.paymentStatus && item.paymentStatus.toLowerCase().includes(s))
    );
  });

  // EDIT
  const handleEditShow = (item) => {
    setEditPurchase({ ...item });
    setEditShow(true);
  };
  const handleEditClose = () => setEditShow(false);
  const handleEditSave = async () => {
    setUpdating(true);
    try {
      await axios.put(`http://localhost:5001/Purchases/${editPurchase._id}`, editPurchase);
      fetchPurchases();
      setEditShow(false);
    } catch (err) {
      alert('Error updating purchase!');
    }
    setUpdating(false);
  };

  // DELETE
  const handleDelete = async (id) => {
    if (!window.confirm('Delete this purchase?')) return;
    setDeletingId(id);
    try {
      await axios.delete(`http://localhost:5001/Purchases/${id}`);
      setPurchases(prev => prev.filter(p => p._id !== id));
    } catch (err) {
      alert('Delete failed. See console.');
      console.error('Delete error:', err);
    }
    setDeletingId(null);
  };

  return (
    <>
            <Header/>
    
      <SideBar />
   
      <div className="ap-wrapper">
        <h2>All Purchases <span className="breadcrumb">Purchases | All Purchases</span></h2>

        <div className="ap-toolbar">
          <div className="search-bar">
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
            <input
              type="text"
              placeholder="Search this table"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="actions">
            <button><FontAwesomeIcon icon={faFilter} /> Filter</button>
            <button><FontAwesomeIcon icon={faFilePdf} /> PDF</button>
            <button><FontAwesomeIcon icon={faFileExcel} /> EXCEL</button>
            <Link to="/CPP" className="create-btn"><FontAwesomeIcon icon={faPlus} /> Create</Link>
          </div>
        </div>

        <table className="ap-table">
          <thead>
            <tr>
              <th><input type="checkbox" /></th>
              <th>Date</th>
              <th>Reference</th>
              <th>Supplier</th>
              <th>Warehouse</th>
              <th>Status</th>
              <th>Grand Total</th>
              <th>Paid</th>
              <th>Due</th>
              <th>Payment Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredPurchases.map(item => (
              <tr key={item._id}>
                <td><input type="checkbox" /></td>
                <td>{new Date(item.date).toLocaleString()}</td>
                <td className="link">{item.ref}</td>
                <td>{item.supplier}</td>
                <td>{item.warehouse}</td>
                <td><span className={`status ${item.status.toLowerCase()}`}>{item.status}</span></td>
                <td>{item.total.toFixed(2)}</td>
                <td>{item.paid.toFixed(2)}</td>
                <td>{item.due.toFixed(2)}</td>
                <td><span className={`payment ${item.paymentStatus.toLowerCase()}`}>{item.paymentStatus}</span></td>
                <td className="action-icons">
                  <span style={{ cursor: updating && editPurchase._id === item._id ? 'not-allowed' : 'pointer', marginRight: '8px', color: '#3498db' }}
                    onClick={() => !updating && handleEditShow(item)}>
                    <FontAwesomeIcon icon={faPen} className="edit" spin={updating && editPurchase._id === item._id} />
                  </span>
                  <span style={{ cursor: deletingId === item._id ? 'not-allowed' : 'pointer', color: '#e74c3c' }}
                    onClick={() => deletingId !== item._id && handleDelete(item._id)}>
                    <FontAwesomeIcon icon={faTimes} className="delete" spin={deletingId === item._id} />
                  </span>
                </td>
              </tr>
            ))}
            {filteredPurchases.length === 0 && (
              <tr>
                <td colSpan="11" style={{ textAlign: 'center', color: '#888' }}>
                  No purchases found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="ap-footer">
          <span>Rows per page: <select><option>10</option></select></span>
          <span>1 - {filteredPurchases.length} of {filteredPurchases.length}</span>
          <span className="pagination">prev | next</span>
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

      {/* Edit Modal */}
      <Modal show={editShow} onHide={handleEditClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Purchase</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Reference</Form.Label>
            <Form.Control
              type="text"
              value={editPurchase.ref || ''}
              onChange={e => setEditPurchase({ ...editPurchase, ref: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Supplier</Form.Label>
            <Form.Control
              type="text"
              value={editPurchase.supplier || ''}
              onChange={e => setEditPurchase({ ...editPurchase, supplier: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Warehouse</Form.Label>
            <Form.Control
              type="text"
              value={editPurchase.warehouse || ''}
              onChange={e => setEditPurchase({ ...editPurchase, warehouse: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Control
              type="text"
              value={editPurchase.status || ''}
              onChange={e => setEditPurchase({ ...editPurchase, status: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Payment Status</Form.Label>
            <Form.Control
              type="text"
              value={editPurchase.paymentStatus || ''}
              onChange={e => setEditPurchase({ ...editPurchase, paymentStatus: e.target.value })}
            />
          </Form.Group>
          {/* Add more fields as needed */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleEditClose} disabled={updating}>Cancel</Button>
          <Button variant="primary" onClick={handleEditSave} disabled={updating}>
            {updating ? 'Saving...' : 'Save'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AllPurchase;
