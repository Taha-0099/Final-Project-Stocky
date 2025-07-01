// src/components/AS.js
import React, { useState, useEffect } from 'react';
import './AS.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilter, faFilePdf, faFileExcel, faPlus } from '@fortawesome/free-solid-svg-icons';
import SideBar from './SideBar';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AS = () => {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5001/Sales')
      .then(res => setSales(res.data))
      .catch(err => console.error('Error fetching sales:', err));
  }, []);

  return (
    <>
      <SideBar/>

      <header className="dashboard-header">
        {/* … same header … */}
      </header>

      <div className="as-container">
        <h2>All Sales <span className="breadcrumb">Sales | All Sales</span></h2>

        <div className="as-toolbar">
          <div className="search-box">
            <FontAwesomeIcon icon={faSearch} />
            <input type="text" placeholder="Search this table" />
          </div>
          <div className="action-buttons">
            <button><FontAwesomeIcon icon={faFilter} /> Filter</button>
            <button><FontAwesomeIcon icon={faFilePdf} /> PDF</button>
            <button><FontAwesomeIcon icon={faFileExcel} /> EXCEL</button>
            <Link to="/CR" className="create-btn"><FontAwesomeIcon icon={faPlus} /> Create</Link>
          </div>
        </div>

        <table className="as-table">
          <thead>
            <tr>
              <th><input type="checkbox" /></th>
              <th>Date</th>
              <th>Reference</th>
              <th>Customer</th>
              <th>Status</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {sales.map(s => (
              <tr key={s._id}>
                <td><input type="checkbox" /></td>
                <td>{new Date(s.date).toLocaleString()}</td>
                <td className="link">{s.ref}</td>
                <td>{s.customer}</td>
                <td><span className={`status ${s.status}`}>{s.status}</span></td>
                <td>${s.total.toFixed(2)}</td>
                <td><span className="dot-menu">⋮</span></td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="as-footer">
          <span>Rows per page: <select><option>10</option></select></span>
          <span>1 - {sales.length} of {sales.length}</span>
          <span className="pagination">prev | next</span>
        </div>

        <footer className="footer">
          {/* same footer */}
        </footer>
      </div>
    </>
  );
};

export default AS;
