// /src/components/UP.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './UP.css';
import SideBar from './SideBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faExpandArrowsAlt,
  faGlobe,
  faBarcode
} from '@fortawesome/free-solid-svg-icons';
import { faBell as farBell } from '@fortawesome/free-regular-svg-icons';

const UP = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    imgurl: '',
    barcodeSymbology: '',
    codeProduct: '',
    category: '',
    brand: '',
    unit: '',
    description: '',
    productType: '',
    productCost: '',
    productPrice: '',
    saleUnit: '',
    purchaseUnit: '',
    stockAlert: '',
    warrantyPeriod: '',
    warrantyTerms: '',
    openingStock1: '',
    openingStock2: '',
    hasSerialNumber: false,
    notForSelling: false
  });

  // Fetch existing product
  useEffect(() => {
    axios
      .get(`http://localhost:5001/Products/${id}`)
      .then(res => {
        const p = res.data;
        setFormData({
          name: p.name || '',
          imgurl: p.imgurl || '',
          barcodeSymbology: p.barcodeSymbology || '',
          codeProduct: p.codeProduct || '',
          category: p.category || '',
          brand: p.brand || '',
          unit: p.unit || '',
          description: p.description || '',
          productType: p.productType || '',
          productCost: p.productCost ?? '',
          productPrice: p.productPrice ?? '',
          saleUnit: p.saleUnit || '',
          purchaseUnit: p.purchaseUnit || '',
          stockAlert: p.stockAlert ?? '',
          warrantyPeriod: p.warrantyPeriod || '',
          warrantyTerms: p.warrantyTerms || '',
          openingStock1: p.openingStock1 ?? '',
          openingStock2: p.openingStock2 ?? '',
          hasSerialNumber: p.hasSerialNumber || false,
          notForSelling: p.notForSelling || false
        });
      })
      .catch(err => console.error('Error fetching product:', err));
  }, [id]);

  // Handle input changes
  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setFormData(fd => ({
      ...fd,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Submit update
  const handleSubmit = e => {
    e.preventDefault();
    axios
      .put(`http://localhost:5001/Products/${id}`, formData)
      .then(() => navigate('/AP'))
      .catch(err => console.error('Error updating product:', err));
  };

  return (
    <div className="up-page">
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

      <div className="up-container">
        <h2>
          Update Product{' '}
          <span className="breadcrumb">Products | Update Product</span>
        </h2>

        <form onSubmit={handleSubmit} className="up-form">
          {/* Basic Info */}
          <div className="up-grid">
            <div className="up-field">
              <label>Name *</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="up-field">
              <label>Image URL *</label>
              <input
                name="imgurl"
                value={formData.imgurl}
                onChange={handleChange}
                placeholder="https://…"
                required
              />
            </div>
          </div>

          {/* Barcode & Code */}
          <div className="up-grid">
            <div className="up-field">
              <label>Barcode Symbology *</label>
              <input
                name="barcodeSymbology"
                value={formData.barcodeSymbology}
                onChange={handleChange}
                required
              />
            </div>
            <div className="up-field barcode-icon">
              <label>Code Product *</label>
              <div className="barcode-input">
                <FontAwesomeIcon icon={faBarcode} />
                <input
                  name="codeProduct"
                  value={formData.codeProduct}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          {/* Category, Brand, Unit */}
          <div className="up-grid">
            <div className="up-field">
              <label>Category</label>
              <input
                name="category"
                value={formData.category}
                onChange={handleChange}
              />
            </div>
            <div className="up-field">
              <label>Brand</label>
              <input
                name="brand"
                value={formData.brand}
                onChange={handleChange}
              />
            </div>
            <div className="up-field">
              <label>Unit</label>
              <input
                name="unit"
                value={formData.unit}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Description */}
          <div className="up-field">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="A few words…"
            />
          </div>

          {/* Cost & Price */}
          <div className="up-grid">
            <div className="up-field">
              <label>Product Cost *</label>
              <input
                name="productCost"
                type="number"
                value={formData.productCost}
                onChange={handleChange}
                required
              />
            </div>
            <div className="up-field">
              <label>Product Price *</label>
              <input
                name="productPrice"
                type="number"
                value={formData.productPrice}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Sale/Purchase Unit & Stock Alert */}
          <div className="up-grid">
            <div className="up-field">
              <label>Sale Unit</label>
              <input
                name="saleUnit"
                value={formData.saleUnit}
                onChange={handleChange}
              />
            </div>
            <div className="up-field">
              <label>Purchase Unit</label>
              <input
                name="purchaseUnit"
                value={formData.purchaseUnit}
                onChange={handleChange}
              />
            </div>
            <div className="up-field">
              <label>Stock Alert</label>
              <input
                name="stockAlert"
                type="number"
                value={formData.stockAlert}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Warranty */}
          <h4>Warranty & Guarantee Tracking</h4>
          <div className="up-grid">
            <div className="up-field">
              <label>Warranty Period</label>
              <input
                name="warrantyPeriod"
                value={formData.warrantyPeriod}
                onChange={handleChange}
              />
            </div>
            <div className="up-field">
              <label>Warranty Terms</label>
              <textarea
                name="warrantyTerms"
                value={formData.warrantyTerms}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Opening Stock */}
          <h4>Opening Stock</h4>
          <div className="up-grid">
            <div className="up-field">
              <label>Warehouse 1</label>
              <input
                name="openingStock1"
                type="number"
                value={formData.openingStock1}
                onChange={handleChange}
              />
            </div>
            <div className="up-field">
              <label>Warehouse 2</label>
              <input
                name="openingStock2"
                type="number"
                value={formData.openingStock2}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Checkboxes */}
          <div className="up-checks">
            <label>
              <input
                type="checkbox"
                name="hasSerialNumber"
                checked={formData.hasSerialNumber}
                onChange={handleChange}
              />{' '}
              Product Has Serial Number
            </label>
            <label>
              <input
                type="checkbox"
                name="notForSelling"
                checked={formData.notForSelling}
                onChange={handleChange}
              />{' '}
              This Product Not For Selling
            </label>
          </div>

          <div className="up-actions">
            <button type="submit" className="submit-btn">
              Update
            </button>
            <Link to="/AP" className="cancel-btn">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UP;
