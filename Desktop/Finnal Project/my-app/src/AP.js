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
import Header from './Header';

const AP = () => {
  const [products, setProducts] = useState([]);
  const [deletingId, setDeletingId] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios
      .get('http://localhost:5001/Products')
      .then((res) => setProducts(res.data))
      .catch((err) => console.error('Error fetching products:', err));
  };

  const getTotalQuantity = (prod) => {
    const q1 = prod.openingStock1 || 0;
    const q2 = prod.openingStock2 || 0;
    return q1 + q2;
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    setDeletingId(id);
    try {
      await axios.delete(`http://localhost:5001/Products/${id}`);
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      alert('Failed to delete product. See console for details.');
      console.error('Delete error:', err);
    }
    setDeletingId(null);
  };

  // FILTER PRODUCTS BY SEARCH BAR
  const filteredProducts = products.filter((prod) => {
    const searchStr = search.toLowerCase();
    return (
      (prod.name && prod.name.toLowerCase().includes(searchStr)) ||
      (prod.codeProduct && prod.codeProduct.toLowerCase().includes(searchStr)) ||
      (prod.brand && prod.brand.toLowerCase().includes(searchStr)) ||
      (prod.category && prod.category.toLowerCase().includes(searchStr))
    );
  });

  return (
    <div className="ap-page">

              <Header/>

      <SideBar />



      <div className="ap-container">
        <h2>
          All Products <span className="breadcrumb">Products | All Products</span>
        </h2>

        <div className="ap-toolbar">
          <input
            type="text"
            placeholder="Search this table"
            className="ap-search"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
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
            {filteredProducts.map((prod) => (
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
                <td>{prod.productCost?.toFixed(2)}</td>
                <td>{prod.productPrice?.toFixed(2)}</td>
                <td>{prod.unit}</td>
                <td>{getTotalQuantity(prod)}</td>
                <td className="action-icons">
                  <Link to={`/PD/${prod._id}`}>
                    <FontAwesomeIcon icon={faEye} className="view" />
                  </Link>
                  <Link to={`/UP/${prod._id}`}>
                    <FontAwesomeIcon icon={faPen} className="edit" />
                  </Link>
                  <span
                    className="delete"
                    title="Delete"
                    style={{ cursor: deletingId === prod._id ? 'not-allowed' : 'pointer', color: deletingId === prod._id ? 'gray' : '#e74c3c' }}
                    onClick={() => deletingId !== prod._id && handleDelete(prod._id)}
                  >
                    <FontAwesomeIcon icon={faTimes} spin={deletingId === prod._id} />
                  </span>
                </td>
              </tr>
            ))}
            {filteredProducts.length === 0 && (
              <tr>
                <td colSpan="12" style={{ textAlign: 'center', color: '#888' }}>
                  No products found.
                </td>
              </tr>
            )}
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
            {`1 - ${filteredProducts.length} of ${filteredProducts.length}`}
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
