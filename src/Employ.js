import React, { useState, useEffect } from 'react';
import './Employ.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch, faFilter, faFilePdf, faFileExcel, faPlus,
  faEye, faPen, faTimes
} from '@fortawesome/free-solid-svg-icons';
import { faBell as farBell } from '@fortawesome/free-regular-svg-icons';
import { faBars, faExpandArrowsAlt, faGlobe } from '@fortawesome/free-solid-svg-icons';

import SideBar from './SideBar';
import { useNavigate } from 'react-router-dom';

const Employ = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await fetch('http://localhost:5001/Employees/all');
      const data = await res.json();
      setEmployees(data);
    } catch (err) {
      setEmployees([]); // fallback if error
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

      <div className="employ-content">
        <div className="employ-header">
          <h1>
            Employees <span className="employ-breadcrumb">HRM | Employees</span>
          </h1>
        </div>
        <div className="employ-toolbar">
          <div className="employ-search">
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
            <input type="text" placeholder="Search this table" />
          </div>
          <div className="employ-actions">
            <button className="employ-btn filter"><FontAwesomeIcon icon={faFilter} /> Filter</button>
            <button className="employ-btn pdf"><FontAwesomeIcon icon={faFilePdf} /> PDF</button>
            <button className="employ-btn excel"><FontAwesomeIcon icon={faFileExcel} /> EXCEL</button>
            <button
              className="employ-btn create"
              onClick={() => navigate('/add-employee')}
            >
              <FontAwesomeIcon icon={faPlus} /> Create
            </button>
          </div>
        </div>
        <div className="employ-table-wrap">
          <table className="employ-table">
            <thead>
              <tr>
                <th><input type="checkbox" /></th>
                <th>FirstName <span className="sort-arrow">▼</span></th>
                <th>LastName <span className="sort-arrow">▼</span></th>
                <th>Phone <span className="sort-arrow">▼</span></th>
                <th>Company <span className="sort-arrow">▼</span></th>
                <th>Department <span className="sort-arrow">▼</span></th>
                <th>Designation <span className="sort-arrow">▼</span></th>
                <th>Office Shift <span className="sort-arrow">▼</span></th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {employees.length === 0 ? (
                <tr>
                  <td colSpan={9} style={{ textAlign: "center", color: "#aaa" }}>
                    No employees found.
                  </td>
                </tr>
              ) : (
                employees.map((emp, idx) => (
                  <tr key={emp._id || idx}>
                    <td><input type="checkbox" /></td>
                    <td>{emp.firstName}</td>
                    <td>{emp.lastName}</td>
                    <td>{emp.phone}</td>
                    <td>{emp.company}</td>
                    <td>{emp.department}</td>
                    <td>{emp.designation}</td>
                    <td>{emp.officeShift}</td>
                    <td className="action-col">
                      <button className="icon-btn view" title="View"><FontAwesomeIcon icon={faEye} /></button>
                      <button className="icon-btn edit" title="Edit"><FontAwesomeIcon icon={faPen} /></button>
                      <button className="icon-btn delete" title="Delete"><FontAwesomeIcon icon={faTimes} /></button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="employ-footer-bar">
          <div>
            Rows per page:&nbsp;
            <select>
              <option>10</option>
            </select>
          </div>
          <div>{employees.length > 0 ? `1 - ${employees.length} of ${employees.length}` : `0 of 0`}</div>
          <div className="page-nav">
            <span className="disabled">prev</span>
            <span className="disabled">next</span>
          </div>
        </div>
        <div className="employ-bottom-footer">
          <div>
            <strong>Stocky - Ultimate Inventory With POS</strong>
            <div style={{ fontSize: '14px', color: '#7f7f7f' }}>
              © 2025 Developed by Stocky<br />
              All rights reserved - v5.0
            </div>
          </div>
          <div className="footer-badge">
            <span className="footer-badge-icon">S</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Employ;
