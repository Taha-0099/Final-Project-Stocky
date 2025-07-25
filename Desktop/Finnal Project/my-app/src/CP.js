import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CP.css';
import SideBar from './SideBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faExpandArrowsAlt,
  faGlobe,
  faSpinner
} from '@fortawesome/free-solid-svg-icons';
import { faBell as farBell } from '@fortawesome/free-regular-svg-icons';
import Header from './Header';

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dnmtrydlv/image/upload';
const UPLOAD_PRESET = 'demoPics'; 


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
  const [imageUploading, setImageUploading] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setFormData(fd => ({
      ...fd,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Cloudinary image upload handler
  const handleImageChange = async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    setImageUploading(true);

    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', UPLOAD_PRESET);

    try {
      const res = await fetch(CLOUDINARY_URL, {
        method: 'POST',
        body: data
      });
      const resData = await res.json();
      if (resData.secure_url) {
        setFormData(fd => ({
          ...fd,
          imgurl: resData.secure_url
        }));
      } else {
        alert('Image upload failed. Please try again.');
      }
    } catch (err) {
      alert('Image upload failed. Please check your connection or Cloudinary config.');
    } finally {
      setImageUploading(false);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    // Prevent submission if image not uploaded
    if (!formData.imgurl) {
      alert("Please upload a product image before submitting.");
      return;
    }

    const payload = {
      ...formData,
      productCost:   Number(formData.productCost)   || 0,
      productPrice:  Number(formData.productPrice)  || 0,
      stockAlert:    Number(formData.stockAlert)    || 0,
      openingStock1: Number(formData.openingStock1) || 0,
      openingStock2: Number(formData.openingStock2) || 0,
    };

    // Ensure token exists
    const token = localStorage.getItem('token saved');
    if (!token) {
      alert("You are not logged in! Please log in again.");
      return;
    }

    try {
      const res = await axios.post(
        'http://localhost:5001/Products/addProduct',
        payload,
        { headers: { 'x-access-token': token } }
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
     <Header/>
      <SideBar/>
     

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
              <label>Product Image *</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ flex: 1 }}
                  required={!formData.imgurl}
                  disabled={imageUploading}
                />
                {imageUploading && (
                  <FontAwesomeIcon icon={faSpinner} spin style={{ color: '#888', fontSize: 20 }} />
                )}
                {formData.imgurl && (
                  <img
                    src={formData.imgurl}
                    alt="Preview"
                    style={{ width: 38, height: 38, objectFit: 'cover', borderRadius: 6, border: '1px solid #eee' }}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Show the cloud URL in a readonly input for your info */}
          {formData.imgurl && (
            <div className="cp-row">
              <div className="cp-field" style={{ width: '100%' }}>
                <label>Image URL</label>
                <input value={formData.imgurl} readOnly style={{ color: '#888', fontSize: 13 }} />
              </div>
            </div>
          )}

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

          <button
            className="submit-btn"
            type="submit"
            disabled={imageUploading || !formData.imgurl}
          >
            {imageUploading ? <FontAwesomeIcon icon={faSpinner} spin style={{ marginRight: 8 }} /> : null}
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default CP;
