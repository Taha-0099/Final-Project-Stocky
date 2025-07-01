import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CP.css';
import SideBar from './SideBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faExpandArrowsAlt,
  faGlobe
} from '@fortawesome/free-solid-svg-icons';
import { faBell as farBell } from '@fortawesome/free-regular-svg-icons';

const CP = () => {
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
    productPrice: '',
    productCost: '',
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
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setFormData(fd => ({
      ...fd,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    // Coerce numeric fields to numbers (empty → 0)
    const payload = {
      ...formData,
      productCost:   Number(formData.productCost)   || 0,
      productPrice:  Number(formData.productPrice)  || 0,
      stockAlert:    Number(formData.stockAlert)    || 0,
      openingStock1: Number(formData.openingStock1) || 0,
      openingStock2: Number(formData.openingStock2) || 0,
    };

    try {
      const res = await axios.post(
        'http://localhost:5001/Products/addProduct',
        payload,
        { headers: { 'x-access-token': localStorage.getItem('token saved') } }
      );
      console.log(res.data.message);
      navigate('/AP');
    } catch (err) {
      const msg = err.response?.data?.error || err.message;
      console.error('Create product failed:', msg);
      alert(`Error creating product: ${msg}`);
    }
  };

  return (
    <>
      <SideBar/>
      <header className="dashboard-header">
        <div className="logo-section">
          <div className="logo">S</div>
          <FontAwesomeIcon icon={faBars} className="icon"/>
        </div>
        <div className="header-icons">
          <button className="pos-btn">POS</button>
          <FontAwesomeIcon icon={faExpandArrowsAlt} className="icon"/>
          <FontAwesomeIcon icon={faGlobe} className="icon"/>
          <div className="notification-icon">
            <FontAwesomeIcon icon={farBell} className="icon"/>
            <span className="badge">1</span>
          </div>
          <div className="brand-name">STOCKY</div>
        </div>
      </header>

      <div className="cp-container">
        <h2>
          Create Product <span className="cp-breadcrumb">Products | Create product</span>
        </h2>
        <form className="cp-form" onSubmit={handleSubmit}>
          {/* Basic Info */}
          <div className="cp-row">
            <div className="cp-field">
              <label>Name *</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter Item/Product"
                required
              />
            </div>
            <div className="cp-field">
              <label>Image URL *</label>
              <input
                name="imgurl"
                value={formData.imgurl}
                onChange={handleChange}
                placeholder="https://..."
                required
              />
            </div>
          </div>

          {/* Barcode & Code */}
          <div className="cp-row">
            <div className="cp-field">
              <label>Barcode Symbology *</label>
              <input
                name="barcodeSymbology"
                value={formData.barcodeSymbology}
                onChange={handleChange}
                required
              />
            </div>
            <div className="cp-field">
              <label>Code Product *</label>
              <input
                name="codeProduct"
                value={formData.codeProduct}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Category, Brand, Unit, Description */}
          <div className="cp-row">
            <div className="cp-field">
              <label>Category</label>
              <input name="category" value={formData.category} onChange={handleChange}/>
            </div>
            <div className="cp-field">
              <label>Brand</label>
              <input name="brand" value={formData.brand} onChange={handleChange}/>
            </div>
          </div>
          <div className="cp-row">
            <div className="cp-field">
              <label>Unit</label>
              <input name="unit" value={formData.unit} onChange={handleChange}/>
            </div>
            <div className="cp-field">
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="A few words …"
              />
            </div>
          </div>

          {/* Cost & Price */}
          <div className="cp-row">
            <div className="cp-field">
              <label>Product Cost *</label>
              <input
                name="productCost"
                type="number"
                value={formData.productCost}
                onChange={handleChange}
                required
              />
            </div>
            <div className="cp-field">
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
          <div className="cp-row">
            <div className="cp-field">
              <label>Sale Unit</label>
              <input name="saleUnit" value={formData.saleUnit} onChange={handleChange}/>
            </div>
            <div className="cp-field">
              <label>Purchase Unit</label>
              <input name="purchaseUnit" value={formData.purchaseUnit} onChange={handleChange}/>
            </div>
            <div className="cp-field">
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
          <div className="cp-row">
            <div className="cp-field">
              <label>Warranty Period</label>
              <input
                name="warrantyPeriod"
                value={formData.warrantyPeriod}
                onChange={handleChange}
              />
            </div>
            <div className="cp-field">
              <label>Warranty Terms</label>
              <textarea
                name="warrantyTerms"
                value={formData.warrantyTerms}
                onChange={handleChange}
                placeholder="Enter warranty terms…"
              />
            </div>
          </div>

          {/* Opening Stock */}
          <h4>Opening Stock</h4>
          <div className="cp-row">
            <div className="cp-field">
              <label>Warehouse 1</label>
              <input
                name="openingStock1"
                type="number"
                value={formData.openingStock1}
                onChange={handleChange}
              />
            </div>
            <div className="cp-field">
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
          <div className="cp-section cp-checkboxes">
            <label>
              <input
                type="checkbox"
                name="hasSerialNumber"
                checked={formData.hasSerialNumber}
                onChange={handleChange}
              /> Product Has Serial Number
            </label>
            <label>
              <input
                type="checkbox"
                name="notForSelling"
                checked={formData.notForSelling}
                onChange={handleChange}
              /> This Product Not For Selling
            </label>
          </div>

          <button className="submit-btn" type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default CP;
