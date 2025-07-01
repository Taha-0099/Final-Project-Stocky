import React from 'react';
import './ListProducts.css'; // Import the CSS file
import Sidebar from './SideBar';

const ListProducts = () => {
  return (
    <>
    <Sidebar/>
      <header className="header">
        <div className="header-left">
          <span className="logo">Finnal Project</span>
          <span className="status-indicator"></span>
        </div>
        <div className="header-right">
          <button className="icon-button">Download</button>
          <button className="icon-button">Add</button>
          <button className="icon-button">Export</button>
          <span className="pos-label">POS</span>
          <button className="icon-button">Files</button>
          <span className="date-label">05/05/2025</span>
          <button className="icon-button">View</button>
          <div className="user-info">
            <span className="user-name">Admin</span>
            <div className="user-avatar">👤</div>
          </div>
        </div>
      </header>
    
  
    <div className="container">
      <div className="header">
        <span className="title">Products</span>
        <span className="subtitle">Manage your products</span>
      </div>
      <button className="filter-button">
        <i className="fas fa-filter"></i>
        <span>Filter</span>
      </button>
      <div className="nav-container">
        <nav className="nav">
          <a className="nav-item active" href="#">
            <i className="fas fa-cubes"></i>
            <span>All Products</span>
          </a>
          <a className="nav-item" href="#">
            <i className="fas fa-file-alt"></i>
            <span>Stock Report</span>
          </a>
        </nav>
      </div>
      <div className="options-container">
        <div className="show-entries">
          <span>Show</span>
          <select aria-label="Show entries">
            <option>10</option>
            <option>25</option>
            <option>50</option>
            <option>100</option>
          </select>
          <span>entries</span>
        </div>
        <div className="export-buttons">
          <button>Export CSV</button>
          <button>Export Excel</button>
          <button>Print</button>
          <button>Columns visibility</button>
          <button>Export PDF</button>
        </div>
      </div>
      <div className="action-buttons">
        <button className="add-button">
          <i className="fas fa-plus"></i>
          <span>Add</span>
        </button>
        <button className="download-button">
          <i className="fas fa-download"></i>
          <span>Download Excel</span>
        </button>
      </div>
      <div className="search-container">
        <input aria-label="Search" placeholder="Search ..." type="search" />
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Product Image</th>
              <th>Action</th>
              <th>Product</th>
              <th>Business Location</th>
              <th>Unit Purchase Price</th>
              <th>Selling Price</th>
              <th>Current stock</th>
              <th>Product Type</th>
              <th>Category</th>
              <th>Brand</th>
              <th>Tax</th>
              <th>SKU</th>
            </tr>
          </thead>
          <tbody>
            {/* Sample product rows */}
            <tr>
              <td></td>
              <td><img className='imgs' src="https://storage.googleapis.com/a1aa/image/e1af004c-db9d-4d2e-be50-03c036f425ad.jpg" alt="Product" /></td>
              <td><button>Action</button></td>
              <td>Acer Aspire E 15</td>
              <td>Awesome Shop</td>
              <td>$ 250.00</td>
              <td>$ 417.50</td>
              <td>80.00 Pieces</td>
              <td>Variable</td>
              <td>Electronics -- Computers</td>
              <td>Acer</td>
              <td></td>
              <td>AG0017</td>
            </tr>
            {/* Add more product rows as needed */}
          </tbody>
        </table>
      </div>
      <div className="footer">
        <div className="footer-buttons">
          <button>Delete Selected</button>
          <button>Add to location</button>
          <button>Remove from location</button>
          <button>Deselect Selected</button>
          <button>WooCommerce Sync</button>
        </div>
        <div className="pagination">
          <span>Showing 1 to 25 of 32 entries</span>
          <div className="pagination-buttons">
            <button>Previous</button>
            <button className="active">1</button>
            <button>2</button>
            <button>Next</button>
          </div>
        </div>
      </div>
    </div>
    
</>
  );
};

export default ListProducts;
