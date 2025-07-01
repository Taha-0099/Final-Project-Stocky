// /src/components/AP.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AP.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFilter,
  faFilePdf,
  faFileExcel,
  faFileImport,
  faPlus,
  faEye,
  faPen,
  faTimes,
  faBars,
  faExpandArrowsAlt,
  faGlobe,
} from '@fortawesome/free-solid-svg-icons';
import { faBell as farBell } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';
import SideBar from './SideBar';

const AP = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5001/Products')
      .then((res) => setProducts(res.data))
      .catch((err) => console.error('Error fetching products:', err));
  }, []);

  const getTotalQuantity = (prod) => {
    const q1 = prod.openingStock1 || 0;
    const q2 = prod.openingStock2 || 0;
    return q1 + q2;
  };

  return (
    <div className="ap-page">
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

      <div className="ap-container">
        <h2>
          All Products <span className="breadcrumb">Products | All Products</span>
        </h2>

        <div className="ap-toolbar">
          <input type="text" placeholder="Search this table" className="ap-search" />
          <div className="ap-actions">
            <button>
              <FontAwesomeIcon icon={faFilter} /> Filter
            </button>
            <button>
              <FontAwesomeIcon icon={faFilePdf} /> PDF
            </button>
            <button>
              <FontAwesomeIcon icon={faFileExcel} /> EXCEL
            </button>
            <button>
              <FontAwesomeIcon icon={faFileImport} /> Import
            </button>
            <Link to="/CP" className="create-btn">
              <FontAwesomeIcon icon={faPlus} /> Create
            </Link>
          </div>
        </div>

        <table className="ap-table">
          <thead>
            <tr>
              <th><input type="checkbox" /></th>
              <th>Image</th>
              <th>Type</th>
              <th>Name</th>
              <th>Code</th>
              <th>Brand</th>
              <th>Category</th>
              <th>Cost</th>
              <th>Price</th>
              <th>Unit</th>
              <th>Quantity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((prod) => (
              <tr key={prod._id}>
                <td><input type="checkbox" /></td>
                <td>
                  <img src={prod.imgurl} alt={prod.name} className="ap-img" />
                </td>
                <td>{prod.productType}</td>
                <td>{prod.name}</td>
                <td>{prod.codeProduct}</td>
                <td>{prod.brand}</td>
                <td>{prod.category}</td>
                <td>{prod.productCost.toFixed(2)}</td>
                <td>{prod.productPrice.toFixed(2)}</td>
                <td>{prod.unit}</td>
                <td>{getTotalQuantity(prod)}</td>
                <td className="action-icons">
                  <Link to={`/PD/${prod._id}`}>
                    <FontAwesomeIcon icon={faEye} className="view" />
                  </Link>
                  {/* Edit link wraps the pen icon and passes the product ID */}
                  <Link to={`/UP/${prod._id}`}>
                    <FontAwesomeIcon icon={faPen} className="edit" />
                  </Link>
                  <FontAwesomeIcon icon={faTimes} className="delete" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="ap-footer">
          <span>
            Rows per page:{' '}
            <select>
              <option>10</option>
            </select>
          </span>
          <span>
            {`1 - ${products.length} of ${products.length}`}
          </span>
          <span className="pagination">prev | next</span>
        </div>

        <footer className="footer">
          <div>
            <strong>Stocky - Ultimate Inventory With POS</strong>
            <br />
            © 2025 Developed by Stocky
            <br />
            All rights reserved - v4.0.9
          </div>
          <div className="footer-logo">S</div>
        </footer>
      </div>
    </div>
  );
};

export default AP;
