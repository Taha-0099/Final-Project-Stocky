import React from 'react';
import './SP.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';


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

const SP = () => {
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


    <div className="subscription-container">
      <h2>Subscription Product</h2>
      <p className="breadcrumb">Subscriptions | Subscription Product</p>

      <div className="automation-box">
        <h3><FontAwesomeIcon icon={faClock} /> Subscription Automation</h3>
        <p>
          Once a subscription is created, the system uses scheduled commands (cron jobs) to handle billing automatically.
        </p>
        <div className="automation-step">
          <strong>1️⃣ Generate Invoices Automatically</strong>
          <pre>php artisan subscriptions:generate-invoices</pre>
          <p>This command will automatically create a new sale (invoice) for each active subscription based on its billing cycle (daily, weekly, monthly, yearly).</p>
        </div>
        <div className="automation-step">
          <strong>2️⃣ Send SMS Reminders</strong>
          <pre>php artisan subscriptions:send-sms-reminders</pre>
          <p>This command sends reminder messages to clients for upcoming or due subscription payments via SMS.</p>
        </div>
        <p className="note">
          📌 <strong>Make sure to schedule these commands in your Cron Job (e.g., cPanel) to run daily or as needed.</strong>
        </p>
      </div>

      <div className="table-controls">
        <div className="search-box">
          <FontAwesomeIcon icon={faSearch} />
          <input type="text" placeholder="Search this table" />
        </div>
        <button className="create-btn">
          <FontAwesomeIcon icon={faPlus} /> Create
        </button>
      </div>

      <table className="subscription-table">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Product Name</th>
            <th>Warehouse</th>
            <th>Billing Cycle</th>
            <th>Total Cycles</th>
            <th>Remaining Cycles</th>
            <th>Next Billing Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr><td colSpan="9" className="no-data">No data for table</td></tr>
        </tbody>
      </table>

      <div className="footer">
        <p>0 - 0 of 0</p>
        <div className="pagination">
          <span>prev</span>
          <span>next</span>
        </div>
      </div>

      <div className="footer-bar">
        <span>Stocky - Ultimate Inventory With POS</span>
        <button className="buy-btn">Buy Stocky</button>
      </div>
    </div>
    </>
  );
};

export default SP;
