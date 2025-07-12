import React from "react";
import "./Designation.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash, faSearch, faPlus } from "@fortawesome/free-solid-svg-icons";

import SideBar from './SideBar';

import {
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
  faCog
} from '@fortawesome/free-solid-svg-icons';
import { faBell as farBell } from '@fortawesome/free-regular-svg-icons';

const Designation = () => {
  const designations = [
    { id: 1, title: "Hr Manager", company: "worktick", department: "Human Resource Management" },
    { id: 2, title: "Graphic Designer", company: "worktick", department: "Marketing" },
    { id: 3, title: "Manager", company: "worktick", department: "Production" },
    { id: 4, title: "Team Leader", company: "worktick", department: "Production" },
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



    <div className="designation-container">
      <h2>Designation <span className="breadcrumb">HRM | Designation</span></h2>

      <div className="table-card">
        <div className="top-bar">
          <div className="search-box">
            <FontAwesomeIcon icon={faSearch} className="icon" />
            <input type="text" placeholder="Search this table" />
          </div>
          <button className="create-btn">
            <FontAwesomeIcon icon={faPlus} /> Create
          </button>
        </div>

        <table>
          <thead>
            <tr>
              <th></th>
              <th>Designation</th>
              <th>Company</th>
              <th>Department</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {designations.map((item) => (
              <tr key={item.id}>
                <td><input type="checkbox" /></td>
                <td>{item.title}</td>
                <td>{item.company}</td>
                <td>{item.department}</td>
                <td className="action-icons">
                  <FontAwesomeIcon icon={faPen} className="edit" />
                  <FontAwesomeIcon icon={faTrash} className="delete" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          <span>Rows per page: 10</span>
          <span>1 - 4 of 4</span>
          <span className="disabled">prev</span>
          <span className="disabled">next</span>
        </div>
      </div>

      <footer>
        <div>Stocky - Ultimate Inventory With POS</div>
        <div>© 2025 Developed by Stocky | v4.0.9</div>
      </footer>
    </div>
    </>
  );
};

export default Designation;
