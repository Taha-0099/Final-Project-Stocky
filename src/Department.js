import React, { useState, useEffect } from 'react';
import './Department.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlus, faPen, faTimes, faBars, faExpandArrowsAlt, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faBell as farBell } from '@fortawesome/free-regular-svg-icons';
import { Modal, Button, Form } from 'react-bootstrap';
import SideBar from './SideBar';

const Department = () => {
  const [departments, setDepartments] = useState([]);
  const [show, setShow] = useState(false);
  const [newDepartment, setNewDepartment] = useState({
    name: '',
    company: '',
    head: ''
  });

  const fetchDepartments = async () => {
    const res = await fetch('http://localhost:5001/Departments');
    setDepartments(await res.json());
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleClose = () => {
    setShow(false);
    setNewDepartment({ name: '', company: '', head: '' });
  };

  const handleCreate = async () => {
    if (newDepartment.name && newDepartment.company && newDepartment.head) {
      await fetch('http://localhost:5001/Departments/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newDepartment)
      });
      fetchDepartments();
      handleClose();
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

      <div className="department-container">
        <h2>Department <span className="breadcrumb">HRM | Department</span></h2>

        <div className="toolbar">
          <div className="search-box">
            <FontAwesomeIcon icon={faSearch} />
            <input type="text" placeholder="Search this table" />
          </div>
          <button className="create-btn" onClick={() => setShow(true)}>
            <FontAwesomeIcon icon={faPlus} /> Create
          </button>
        </div>

        <table className="department-table">
          <thead>
            <tr>
              <th>Department</th>
              <th>Department Head</th>
              <th>Company</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((dept) => (
              <tr key={dept._id}>
                <td>{dept.name}</td>
                <td>{dept.head}</td>
                <td>{dept.company}</td>
                <td className="actions">
                  <FontAwesomeIcon icon={faPen} className="edit-icon" />
                  <FontAwesomeIcon icon={faTimes} className="delete-icon" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <footer className="footer">
          <strong>Stocky - Ultimate Inventory With POS</strong><br />
          © 2025 Developed by Stocky - v4.0.9
        </footer>
      </div>

      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Create Department</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Department Name</Form.Label>
            <Form.Control
              type="text"
              value={newDepartment.name}
              onChange={(e) => setNewDepartment({ ...newDepartment, name: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Company</Form.Label>
            <Form.Control
              type="text"
              value={newDepartment.company}
              onChange={(e) => setNewDepartment({ ...newDepartment, company: e.target.value })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Department Head</Form.Label>
            <Form.Control
              type="text"
              value={newDepartment.head}
              onChange={(e) => setNewDepartment({ ...newDepartment, head: e.target.value })}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancel</Button>
          <Button variant="primary" onClick={handleCreate}>Submit</Button>
        </Modal.Footer>
      </Modal>
    </> 
  );
};

export default Department;