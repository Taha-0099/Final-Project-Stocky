import React, { useState } from 'react';
import './Category.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTimes, faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button, Form } from 'react-bootstrap';
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

import SideBar from './SideBar'

const Category = () => {
  const [categories, setCategories] = useState([
    { code: 'CA3', name: 'Jackets' },
    { code: 'CA2', name: 'Computers' },
    { code: 'CA1', name: 'Accessories' },
  ]);

  const [show, setShow] = useState(false);
  const [newCategory, setNewCategory] = useState({ code: '', name: '' });

  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    setNewCategory({ code: '', name: '' });
  };

  const handleCreateCategory = () => {
    if (newCategory.code && newCategory.name) {
      setCategories([...categories, newCategory]);
      handleClose();
    }
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


    <div className="category-container">
      <h3>Category <span className="breadcrumb">Products | Category</span></h3>

      <div className="category-toolbar">
        <div className="search-create">
          <div className="search-box">
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
            <input type="text" placeholder="Search this table" />
          </div>
          <button className="create-btn" onClick={handleShow}>
            <FontAwesomeIcon icon={faPlus} /> Create
          </button>
        </div>
      </div>

      <table className="category-table">
        <thead>
          <tr>
            <th><input type="checkbox" /></th>
            <th>Category Code</th>
            <th>Category Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat, index) => (
            <tr key={index}>
              <td><input type="checkbox" /></td>
              <td>{cat.code}</td>
              <td>{cat.name}</td>
              <td className="action-icons">
                <FontAwesomeIcon icon={faPen} className="edit" />
                <FontAwesomeIcon icon={faTimes} className="delete" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="category-footer">
        <span>Rows per page:
          <select>
            <option>10</option>
            <option>20</option>
          </select>
        </span>
        <span>1 - {categories.length} of {categories.length}</span>
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

      {/* Bootstrap Modal */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Create Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Category Code</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter code"
              value={newCategory.code}
              onChange={(e) => setNewCategory({ ...newCategory, code: e.target.value })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Category Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={newCategory.name}
              onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancel</Button>
          <Button variant="primary" onClick={handleCreateCategory}>Submit</Button>
        </Modal.Footer>
      </Modal>
    </div>
    </>
  );
};

export default Category;
