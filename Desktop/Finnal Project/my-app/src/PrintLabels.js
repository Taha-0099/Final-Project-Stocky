import React, { useState } from 'react';
import Sidebar from './SideBar';
import './PrintLabels.css'
const PrintLabels = () => {
  const [formData, setFormData] = useState({
    productName: { checked: true, size: 15 },
    productVariation: { checked: true, size: 17 },
    productPrice: { checked: true, size: 17 },
    businessName: { checked: true, size: 20 },
    printPackingDate: { checked: true, size: 12 },
    showPrice: 'Inc. tax',
    barcodeSetting: '20 Labels per Sheet, Sheet Size: 8.5" x 11", Label Size: 4" x 1 ", Labels per sheet: 20'
  });

  const handleCheckboxChange = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: {
        ...prev[field],
        checked: !prev[field].checked
      }
    }));
  };

  const handleSizeChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: {
        ...prev[field],
        size: value
      }
    }));
  };

  const handleSelectChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <>

<Sidebar />
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

    <div className="print-labels-container">
      <div className="content-wrapper">
        {/* Print Labels Section */}
        <section className="section-container">
          <h2 className="section-title">
            Print Labels
            <span className="info-badge">i</span>
          </h2>
          <div className="section-subtitle">Add products to generate Labels</div>
          
          <form className="search-form">
            <button type="submit" className="search-button" aria-label="Search">
              <i className="fas fa-search"></i>
            </button>
            <input
              type="text"
              placeholder="Enter products name to print labels"
              className="search-input"
              aria-label="Enter products name to print labels"
            />
          </form>
          
          <table className="products-table">
            <thead>
              <tr>
                <th>Products</th>
                <th>No. of labels</th>
                <th>Packing Date</th>
                <th>Selling Price Group</th>
              </tr>
            </thead>
          </table>
        </section>

        {/* Settings Section */}
        <section className="section-container">
          <form className="settings-grid">
            {/* Product Name */}
            <div className="setting-item">
              <label className="setting-label">
                <input 
                  type="checkbox" 
                  checked={formData.productName.checked} 
                  onChange={() => handleCheckboxChange('productName')} 
                  className="checkbox"
                />
                Product Name
              </label>
              <div className="size-control">
                <span className="size-label">Size</span>
                <input
                  type="text"
                  value={formData.productName.size}
                  onChange={(e) => handleSizeChange('productName', e.target.value)}
                  className="size-input"
                />
              </div>
            </div>

            {/* Product Variation */}
            <div className="setting-item">
              <label className="setting-label">
                <input 
                  type="checkbox" 
                  checked={formData.productVariation.checked} 
                  onChange={() => handleCheckboxChange('productVariation')} 
                  className="checkbox"
                />
                Product Variation (recommended)
              </label>
              <div className="size-control">
                <span className="size-label">Size</span>
                <input
                  type="text"
                  value={formData.productVariation.size}
                  onChange={(e) => handleSizeChange('productVariation', e.target.value)}
                  className="size-input"
                />
              </div>
            </div>

            {/* Product Price */}
            <div className="setting-item">
              <label className="setting-label">
                <input 
                  type="checkbox" 
                  checked={formData.productPrice.checked} 
                  onChange={() => handleCheckboxChange('productPrice')} 
                  className="checkbox"
                />
                Product Price
              </label>
              <div className="size-control">
                <span className="size-label">Size</span>
                <input
                  type="text"
                  value={formData.productPrice.size}
                  onChange={(e) => handleSizeChange('productPrice', e.target.value)}
                  className="size-input"
                />
              </div>
            </div>

            {/* Business Name */}
            <div className="setting-item">
              <label className="setting-label">
                <input 
                  type="checkbox" 
                  checked={formData.businessName.checked} 
                  onChange={() => handleCheckboxChange('businessName')} 
                  className="checkbox"
                />
                Business name
              </label>
              <div className="size-control">
                <span className="size-label">Size</span>
                <input
                  type="text"
                  value={formData.businessName.size}
                  onChange={(e) => handleSizeChange('businessName', e.target.value)}
                  className="size-input"
                />
              </div>
            </div>

            {/* Print Packing Date */}
            <div className="setting-item">
              <label className="setting-label">
                <input 
                  type="checkbox" 
                  checked={formData.printPackingDate.checked} 
                  onChange={() => handleCheckboxChange('printPackingDate')} 
                  className="checkbox"
                />
                Print packing date
              </label>
              <div className="size-control">
                <span className="size-label">Size</span>
                <input
                  type="text"
                  value={formData.printPackingDate.size}
                  onChange={(e) => handleSizeChange('printPackingDate', e.target.value)}
                  className="size-input"
                />
              </div>
            </div>

            {/* Show Price */}
            <div className="setting-item col-span">
              <label className="show-price-label">
                Show Price:
                <span className="info-badge-small">i</span>
              </label>
              <select
                value={formData.showPrice}
                onChange={(e) => handleSelectChange('showPrice', e.target.value)}
                className="select-input"
                aria-label="Show Price"
              >
                <option>Inc. tax</option>
              </select>
            </div>
          </form>

          <hr className="divider" />

          <div className="preview-controls">
            <div className="barcode-setting">
              <i className="fas fa-cog"></i>
              <select
                id="barcode-setting"
                value={formData.barcodeSetting}
                onChange={(e) => handleSelectChange('barcodeSetting', e.target.value)}
                className="barcode-select"
                aria-label="Barcode setting"
              >
                <option>
                  20 Labels per Sheet, Sheet Size: 8.5" x 11", Label Size: 4" x 1", Labels per sheet: 20
                </option>
              </select>
            </div>
            <button
              type="button"
              className="preview-button"
            >
              Preview
            </button>
          </div>
        </section>

        <footer className="app-footer">
          Ultimate POS - v6.7 | Copyright © 2025 All rights reserved.
        </footer>
      </div>
    </div>
    </>
  );
};

export default PrintLabels;