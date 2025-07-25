import React, { useState, useEffect } from 'react';
import './Category.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTimes, faPlus, faSearch, faBars, faExpandArrowsAlt, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faBell as farBell } from '@fortawesome/free-regular-svg-icons';
import { Modal, Button, Form } from 'react-bootstrap';
import SideBar from './SideBar';
import axios from 'axios';
import Header from './Header';

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [show, setShow] = useState(false);
  const [editShow, setEditShow] = useState(false);
  const [editCategory, setEditCategory] = useState({ code: '', name: '', index: -1 });
  const [newCategory, setNewCategory] = useState({ code: '', name: '' });

  useEffect(() => {
    fetchCategoriesFromProducts();
  }, []);

  const fetchCategoriesFromProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5001/Products');
      const products = res.data || [];

      // Extract unique { code, name } pairs (assuming codeProduct and category fields)
      const seen = {};
      const uniqueCategories = [];
      products.forEach((prod) => {
        const code = prod.codeProduct;
        const name = prod.category;
        if (code && name && !seen[code]) {
          uniqueCategories.push({ code, name });
          seen[code] = true;
        }
      });
      setCategories(uniqueCategories);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  // Create
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

  // Edit
  const handleEditShow = (cat, index) => {
    setEditCategory({ ...cat, index });
    setEditShow(true);
  };
  const handleEditClose = () => setEditShow(false);
  const handleEditSave = () => {
    const updated = [...categories];
    updated[editCategory.index] = { code: editCategory.code, name: editCategory.name };
    setCategories(updated);
    handleEditClose();
  };

  // Delete
  const handleDelete = (index) => {
    if (window.confirm('Delete this category?')) {
      setCategories(categories.filter((_, i) => i !== index));
    }
  };

  // --- Search logic ---
  const filteredCategories = categories.filter(
    (cat) =>
      cat.code.toLowerCase().includes(search.toLowerCase()) ||
      cat.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
            <Header/>
    
      <SideBar />

     

      <div className="category-main-content">
        <h2>
          Category
          <span className="breadcrumb">Products | Category</span>
        </h2>

        <div className="category-toolbar">
          <div className="search-wrapper">
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
            <input
              type="text"
              placeholder="Search this table"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <button className="create-btn" onClick={handleShow}>
            <FontAwesomeIcon icon={faPlus} /> Create
          </button>
        </div>

        <div className="category-card">
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
              {filteredCategories.map((cat, index) => (
                <tr key={index}>
                  <td><input type="checkbox" /></td>
                  <td>{cat.code}</td>
                  <td>{cat.name}</td>
                  <td className="action-icons">
                    <span style={{ cursor: 'pointer', marginRight: '8px' }} onClick={() => handleEditShow(cat, categories.indexOf(cat))}>
                      <FontAwesomeIcon icon={faPen} className="edit" />
                    </span>
                    <span style={{ cursor: 'pointer' }} onClick={() => handleDelete(categories.indexOf(cat))}>
                      <FontAwesomeIcon icon={faTimes} className="delete" />
                    </span>
                  </td>
                </tr>
              ))}
              {filteredCategories.length === 0 && (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center', color: '#888' }}>
                    No categories found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="category-footer">
          <span>Rows per page:
            <select>
              <option>10</option>
              <option>20</option>
            </select>
          </span>
          <span>1 - {filteredCategories.length} of {filteredCategories.length}</span>
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

      {/* Modal for adding category (UI only) */}
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

      {/* Modal for editing category (UI only) */}
      <Modal show={editShow} onHide={handleEditClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Category Code</Form.Label>
            <Form.Control
              type="text"
              value={editCategory.code}
              onChange={e => setEditCategory({ ...editCategory, code: e.target.value })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Category Name</Form.Label>
            <Form.Control
              type="text"
              value={editCategory.name}
              onChange={e => setEditCategory({ ...editCategory, name: e.target.value })}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleEditClose}>Cancel</Button>
          <Button variant="primary" onClick={handleEditSave}>Save</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Category;
