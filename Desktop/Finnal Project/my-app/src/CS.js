import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CS.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faPlus,
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
  faCog,
  faTimes,
  faCheckCircle
} from '@fortawesome/free-solid-svg-icons';
import { faBell as farBell } from '@fortawesome/free-regular-svg-icons';
import Swal from 'sweetalert2';
import SideBar from './SideBar';

const CS = () => {
  const [stocks, setStocks] = useState([]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    warehouse: '',
    category: ''
  });

  useEffect(() => {
    fetchStocks();
  }, []);

  const fetchStocks = async () => {
    try {
      const res = await axios.get('http://localhost:5001/CountStock');
      setStocks(res.data);
    } catch (error) {
      Swal.fire('Error', 'Failed to fetch stocks', 'error');
    }
  };

  const handleCountStock = () => {
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.warehouse) {
      Swal.fire('Error', 'Please select a warehouse', 'error');
      return;
    }

    try {
      await axios.post('http://localhost:5001/CountStock/count', formData);
      Swal.fire('Success', 'Stock counted successfully!', 'success');
      setShowModal(false);
      setFormData({
        date: new Date().toISOString().split('T')[0],
        warehouse: '',
        category: ''
      });
      fetchStocks();
    } catch (error) {
      Swal.fire('Error', 'Failed to count stock', 'error');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const filteredStocks = stocks.filter(stock =>
    stock.warehouse.toLowerCase().includes(search.toLowerCase())
  );

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

      <div className="cs-container">
        <div className="cs-content">
          <div className="cs-header">
            <h2>Count Stock</h2>
            <span className="breadcrumb">Products | Count Stock</span>
          </div>

          <div className="cs-table-wrapper">
            <div className="cs-table-toolbar">
              <div className="search-container">
                <input
                  type="text"
                  placeholder="Search this table"
                  className="cs-search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <button className="count-btn" onClick={handleCountStock}>
                <FontAwesomeIcon icon={faPlus} /> Count
              </button>
            </div>

            <div className="table-container">
              <table className="cs-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Warehouse</th>
                    <th>Category</th>
                    <th>File</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStocks.map(stock => (
                    <tr key={stock._id}>
                      <td>{new Date(stock.date).toISOString().split('T')[0]}</td>
                      <td>{stock.warehouse}</td>
                      <td>{stock.category || '---'}</td>
                      <td>
                        <a href={`http://localhost:5001${stock.fileUrl}`} target="_blank" rel="noreferrer" className="download-link">
                          Download
                        </a>
                      </td>
                    </tr>
                  ))}
                  {filteredStocks.length === 0 && (
                    <tr>
                      <td colSpan="4" className="no-data">No stocks found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="cs-pagination">
              <span>Rows per page: 10</span>
              <span>1 - {filteredStocks.length} of {filteredStocks.length}</span>
              <div className="pagination-controls">
                <span>prev</span> | <span>next</span>
              </div>
            </div>
          </div>

          <footer className="cs-footer">
            <strong>Stocky - Ultimate Inventory With POS</strong>
            <br />© 2025 Developed by Stocky
            <br />All rights reserved - v5.0
          </footer>
        </div>
      </div>

      {/* Custom Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h3>Count Stock</h3>
              <button 
                className="modal-close"
                onClick={() => setShowModal(false)}
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-group">
                <label htmlFor="date">Date *</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="warehouse">Warehouse *</label>
                <select
                  id="warehouse"
                  name="warehouse"
                  value={formData.warehouse}
                  onChange={handleInputChange}
                  className="form-select"
                  required
                >
                  <option value="">Choose Warehouse</option>
                  <option value="Warehouse 1">Warehouse 1</option>
                  <option value="Warehouse 2">Warehouse 2</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="form-select"
                >
                  <option value="">Choose Category</option>
                  <option value="Category A">Category A</option>
                  <option value="Category B">Category B</option>
                </select>
              </div>

              <div className="modal-actions">
                <button type="submit" className="submit-btn">
                  <FontAwesomeIcon icon={faCheckCircle} /> Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CS;