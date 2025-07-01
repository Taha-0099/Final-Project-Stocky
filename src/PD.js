// /src/components/PD.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './PD.css';
import SideBar from './SideBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrint, faBarcode, faBars, faExpandArrowsAlt, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faBell as farBell } from '@fortawesome/free-regular-svg-icons';

const PD = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5001/Products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.error('Error fetching product details:', err));
  }, [id]);

  if (!product) {
    return <div className="pd-loading">Loading product details…</div>;
  }

  // Prepare warehouse display
  const warehouses = [
    { name: 'Warehouse 1', qty: `${product.openingStock1 || 0} ${product.unit}` },
    { name: 'Warehouse 2', qty: `${product.openingStock2 || 0} ${product.unit}` },
  ];

  // Tax is not in your model yet, so we’ll default to N/A
  const taxDisplay = 'N/A';

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

      <div className="pd-container">
        <h2>
          Product Details <span className="pd-breadcrumb">Products | Product Details</span>
        </h2>

        <button className="print-btn">
          <FontAwesomeIcon icon={faPrint} /> Print
        </button>

        <div className="pd-content">
          <div className="pd-left">
            <div className="barcode-box">
              <img
                src={`https://barcode.tec-it.com/barcode.ashx?data=${product.codeProduct}&code=Code128&dpi=96`}
                alt="barcode"
              />
              <p>{product.codeProduct}</p>
            </div>

            <table className="info-table">
              <tbody>
                <tr><td>Type</td><td>{product.productType}</td></tr>
                <tr><td>Code Product</td><td>{product.codeProduct}</td></tr>
                <tr><td>Product</td><td>{product.name}</td></tr>
                <tr><td>Category</td><td>{product.category || '—'}</td></tr>
                <tr><td>Brand</td><td>{product.brand || '—'}</td></tr>
                <tr><td>Cost</td><td>${product.productCost.toFixed(2)}</td></tr>
                <tr><td>Price</td><td>${product.productPrice.toFixed(2)}</td></tr>
                <tr><td>Unit</td><td>{product.unit}</td></tr>
                <tr><td>Tax</td><td>{taxDisplay}</td></tr>
                <tr><td>Stock Alert</td><td>{product.stockAlert ?? '0'}</td></tr>
                <tr><td>Warranty Period</td><td>{product.warrantyPeriod || '—'}</td></tr>
                <tr><td>Warranty Terms</td><td>{product.warrantyTerms || '—'}</td></tr>
              </tbody>
            </table>
          </div>

          <div className="pd-right">
            <img src={product.imgurl} alt={product.name} className="product-img" />
          </div>
        </div>

        <h3>Warehouse</h3>
        <table className="warehouse-table">
          <thead>
            <tr><th>Warehouse</th><th>Quantity</th></tr>
          </thead>
          <tbody>
            {warehouses.map((wh, idx) => (
              <tr key={idx}>
                <td>{wh.name}</td>
                <td>{wh.qty}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default PD;
