import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./Task.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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

import SideBar from './SideBar';

const Task = () => {
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

    <div className="task-container">
      {/* Header */}
      <header className="task-header">
        <div className="task-header-left">
          <h1 className="task-title">Task List</h1>
          <span className="task-breadcrumb">Tasks</span>
          <span className="task-separator">|</span>
          <span className="task-breadcrumb">Task List</span>
        </div>
        <button aria-label="Settings" className="task-settings-btn" type="button">
          <i className="fas fa-cog" />
        </button>
      </header>

      {/* Main Content */}
      <main className="task-main">
        {/* Task Status Cards */}
        <section className="task-status-section">
          {[
            { label: "Completed", icon: "check" },
            { label: "Not Started", icon: "bars" },
            { label: "In Progress", icon: "spinner", spin: true },
            { label: "Cancelled", icon: "times" },
          ].map((status, i) => (
            <div key={i} className="task-status-card">
              <div className="task-status-icon">
                <i className={`fas fa-${status.icon} ${status.spin ? "fa-spin" : ""}`} />
              </div>
              <div className="task-status-text">
                <span className="task-status-label">{status.label}</span>
                <span className="task-status-count">0</span>
              </div>
            </div>
          ))}
        </section>

        {/* Filter/Search/Create Actions */}
        <section className="task-actions-section">
          <div className="task-actions-wrapper">
            {/* Search */}
            <div className="task-search-box">
              <i className="fas fa-search" />
              <input type="search" placeholder="Search this table" />
            </div>

            {/* Buttons */}
            <div className="task-buttons">
              <button className="btn btn-blue">
                <i className="fas fa-filter" />
                <span>Filter</span>
              </button>
              <button className="btn btn-green">
                <i className="fas fa-file-pdf" />
                <span>PDF</span>
              </button>
              <button className="btn btn-red">
                <i className="fas fa-file-excel" />
                <span>EXCEL</span>
              </button>
              <button className="btn btn-purple">
                <i className="fas fa-plus" />
                <span>Create</span>
              </button>
            </div>
          </div>

          {/* Table Header (Static) */}
          <table className="task-table">
            <thead>
              <tr>
                {["title", "Project", "Company", "Start date", "Finish date", "Status"].map((heading, i) => (
                  <th key={i}>
                    {heading}
                    <i className="fas fa-sort-up" />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="6" className="no-tasks">No tasks available.</td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    </div>
    </>
  );
};

export default Task;
