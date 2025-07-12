// /src/components/Brand.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Brand.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFilter, faFilePdf, faFileExcel, faFileImport,
  faPlus, faEye, faPen, faTimes,
  faBars, faExpandArrowsAlt, faGlobe, faSearch
} from '@fortawesome/free-solid-svg-icons';
import { faBell as farBell } from '@fortawesome/free-regular-svg-icons';
import SideBar from './SideBar';

const Brand = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // fetch all products instead of a separate /Brands endpoint
    axios
      .get('http://localhost:5001/Products')
      .then(res => setProducts(res.data))
      .catch(err => console.error('Error fetching products:', err));
  }, []);

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

      <div className="brand-container">
        <h2>Brand <span className="breadcrumb">Products | Brand</span></h2>

        <div className="brand-toolbar">
          <div className="search-create">
            <div className="search-box">
              <FontAwesomeIcon icon={faSearch} className="search-icon" />
              <input type="text" placeholder="Search this table" />
            </div>
            {/* If you still need a Create button, link it to CP: */}
            <button 
              className="create-btn" 
              onClick={() => window.location.href = '/CP'}
            >
              <FontAwesomeIcon icon={faPlus} /> Create
            </button>
          </div>
        </div>

        <table className="brand-table">
          <thead>
            <tr>
              <th><input type="checkbox" /></th>
              <th>Product Image</th>
              <th>Brand Name</th>
              <th>Brand Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map(prod => (
              <tr key={prod._id}>
                <td><input type="checkbox" /></td>
                <td>
                  <img 
                    src={prod.imgurl} 
                    alt={prod.name} 
                    className="brand-img" 
                  />
                </td>
                {/* using product.brand as your “Brand Name” */}
                <td>{prod.brand || '—'}</td>
                {/* using product.description as your “Brand Description” */}
                <td>{prod.description || '—'}</td>
                <td className="action-icons">
                  {/* view or edit via PD/UP, if desired */}
                  <a href={`/PD/${prod._id}`}>
                    <FontAwesomeIcon icon={faEye} className="view" />
                  </a>
                  <a href={`/UP/${prod._id}`}>
                    <FontAwesomeIcon icon={faPen} className="edit" />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="brand-footer">
          <span>Rows per page:
            <select>
              <option>10</option>
              <option>20</option>
            </select>
          </span>
          <span>1 - {products.length} of {products.length}</span>
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
    </>
  );
};

export default Brand;
