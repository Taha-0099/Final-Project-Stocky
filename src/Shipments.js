import React from 'react';
import './Shipments.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPen, faTimes } from '@fortawesome/free-solid-svg-icons';


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

const Shipments = () => {
  const shipments = [
    {
      date: '2025-05-20 09:00:06',
      shipmentRef: 'SM_1116',
      saleRef: 'SL_1117',
      customer: 'Thomas M. Martin',
      warehouse: 'Warehouse 1',
      status: 'Cancelled',
    },
    {
      date: '2025-05-20 09:00:06',
      shipmentRef: 'SM_1112',
      saleRef: 'SL_1117',
      customer: 'Thomas M. Martin',
      warehouse: 'Warehouse 1',
      status: 'Delivered',
    },
    {
      date: '2025-05-20 09:00:06',
      shipmentRef: 'SM_1117',
      saleRef: 'SL_1117',
      customer: 'Thomas M. Martin',
      warehouse: 'Warehouse 1',
      status: 'Delivered',
    },
    {
      date: '2025-05-20 09:00:06',
      shipmentRef: 'SM_1113',
      saleRef: 'SL_1117',
      customer: 'Thomas M. Martin',
      warehouse: 'Warehouse 1',
      status: 'Packed',
    },
    {
      date: '2025-05-20 09:00:06',
      shipmentRef: 'SM_1115',
      saleRef: 'SL_1117',
      customer: 'Thomas M. Martin',
      warehouse: 'Warehouse 1',
      status: 'Packed',
    },
    {
      date: '2025-05-20 09:00:06',
      shipmentRef: 'SM_1111',
      saleRef: 'SL_1117',
      customer: 'Thomas M. Martin',
      warehouse: 'Warehouse 1',
      status: 'Shipped',
    },
    {
      date: '2025-05-20 09:00:06',
      shipmentRef: 'SM_1114',
      saleRef: 'SL_1117',
      customer: 'Thomas M. Martin',
      warehouse: 'Warehouse 1',
      status: 'Shipped',
    },
  ];

  const statusClass = (status) => {
    switch (status) {
      case 'Cancelled': return 'cancelled';
      case 'Delivered': return 'delivered';
      case 'Packed': return 'packed';
      case 'Shipped': return 'shipped';
      default: return '';
    }
  };

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



    <div className="shipment-container">
      <h2>Shipments <span className="breadcrumb">Sales | Shipments</span></h2>

      <div className="shipment-toolbar">
        <div className="search-box">
          <FontAwesomeIcon icon={faSearch} />
          <input type="text" placeholder="Search this table" />
        </div>
      </div>

      <table className="shipment-table">
        <thead>
          <tr>
            <th><input type="checkbox" /></th>
            <th>Date</th>
            <th>Shipment Ref</th>
            <th>Sale Ref</th>
            <th>Customer</th>
            <th>Warehouse</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {shipments.map((s, index) => (
            <tr key={index}>
              <td><input type="checkbox" /></td>
              <td>{s.date}</td>
              <td>{s.shipmentRef}</td>
              <td>{s.saleRef}</td>
              <td>{s.customer}</td>
              <td>{s.warehouse}</td>
              <td><span className={`status-badge ${statusClass(s.status)}`}>{s.status}</span></td>
              <td>
                <FontAwesomeIcon icon={faPen} className="edit-icon" />
                <FontAwesomeIcon icon={faTimes} className="delete-icon" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default Shipments;
