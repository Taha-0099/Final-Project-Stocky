import React from 'react';
import './Units.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import {
  faFilter, faFilePdf, faFileExcel, faFileImport,
  faPlus, faEye, faPen, faTimes,
  faBarcode, faBars, faExpandArrowsAlt, faGlobe, faShoppingCart,
  faClipboardList, faChartBar, faBoxes, faExchangeAlt,
  faFileInvoice, faArrowRight, faArrowLeft, faCog
} from '@fortawesome/free-solid-svg-icons';
import { faBell as farBell } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';

import SideBar from './SideBar';

const Units = () => {
  const unitData = [
    { name: "Grams", short: "g", base: "kilogram", op: "/", value: "1000" },
    { name: "Dozen box", short: "box", base: "piece", op: "*", value: "12" },
    { name: "Centimeter", short: "cm", base: "Meter", op: "/", value: "100" },
    { name: "piece", short: "pc", base: "", op: "*", value: "1" },
    { name: "Meter", short: "m", base: "", op: "*", value: "1" },
    { name: "kilogram", short: "kg", base: "", op: "*", value: "1" }
  ];

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



    <div className="units-container">
      <h2>Unit <span className="breadcrumb">Products | Unit</span></h2>

      <div className="units-toolbar">
        <div className="search-box">
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          <input type="text" placeholder="Search this table" />
        </div>
        <button className="create-btn">
          <FontAwesomeIcon icon={faPlus} /> Create
        </button>
      </div>

      <table className="units-table">
        <thead>
          <tr>
            <th><input type="checkbox" /></th>
            <th>Name</th>
            <th>Short Name</th>
            <th>Base Unit</th>
            <th>Operator</th>
            <th>Operation Value</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {unitData.map((unit, index) => (
            <tr key={index}>
              <td><input type="checkbox" /></td>
              <td>{unit.name}</td>
              <td>{unit.short}</td>
              <td>{unit.base}</td>
              <td>{unit.op}</td>
              <td>{unit.value}</td>
              <td className="action-icons">
                <FontAwesomeIcon icon={faPen} className="edit" />
                <FontAwesomeIcon icon={faTimes} className="delete" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="units-footer">
        <span>Rows per page:
          <select>
            <option>10</option>
            <option>20</option>
          </select>
        </span>
        <span>1 - 6 of 6</span>
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

export default Units;
