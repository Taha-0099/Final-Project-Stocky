import React from 'react';
import './AT.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faFilePdf, faFileExcel, faPlus, faPrint, faEye, faPen, faTimes } from '@fortawesome/free-solid-svg-icons';




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
import Header from './Header';


const AT = () => {
  const transfers = [
    { date: '2025-05-25 12:25:43', reference: 'TR_1115', from: 'Warehouse 1', to: 'Warehouse 2', items: 1, total: 13000.0, status: 'Completed' },
    { date: '2025-05-26 13:25:43', reference: 'TR_1114', from: 'Warehouse 2', to: 'Warehouse 1', items: 2, total: 52.0, status: 'Completed' },
    { date: '2025-05-27 14:25:43', reference: 'TR_1113', from: 'Warehouse 1', to: 'Warehouse 2', items: 2, total: 568.0, status: 'Completed' },
    { date: '2025-05-28 15:25:43', reference: 'TR_1112', from: 'Warehouse 1', to: 'Warehouse 2', items: 3, total: 860.0, status: 'Completed' },
    { date: '2025-05-29 16:25:43', reference: 'TR_1111', from: 'Warehouse 1', to: 'Warehouse 2', items: 3, total: 783.0, status: 'Completed' }
  ];

  return (

  <>
        <Header/>

<SideBar/>






    <div className="at-container">
      <div className="at-header">
        <h2>All Transfers <span className="at-subtitle">Transfer</span> | All Transfers</h2>
      </div>

      <div className="at-controls">
        <div className="at-search">
          <input type="text" placeholder="Search this table" />
        </div>
        <div className="at-buttons">
          <button className="btn btn-filter"><FontAwesomeIcon icon={faFilter} /> Filter</button>
          <button className="btn btn-pdf"><FontAwesomeIcon icon={faFilePdf} /> PDF</button>
          <button className="btn btn-excel"><FontAwesomeIcon icon={faFileExcel} /> EXCEL</button>
          <button className="btn btn-create"><FontAwesomeIcon icon={faPlus} /> Create</button>
        </div>
      </div>

      <table className="at-table">
        <thead>
          <tr>
            <th><input type="checkbox" /></th>
            <th>Date</th>
            <th>Reference</th>
            <th>From Warehouse</th>
            <th>To Warehouse</th>
            <th>Items</th>
            <th>Grand Total</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {transfers.map((transfer, index) => (
            <tr key={index}>
              <td><input type="checkbox" /></td>
              <td>{transfer.date}</td>
              <td>{transfer.reference}</td>
              <td>{transfer.from}</td>
              <td>{transfer.to}</td>
              <td>{transfer.items.toFixed(2)}</td>
              <td>{transfer.total.toFixed(2)}</td>
              <td><span className="status-completed">{transfer.status}</span></td>
              <td className="action-icons">
                <FontAwesomeIcon icon={faPrint} className="icon print" />
                <FontAwesomeIcon icon={faEye} className="icon view" />
                <FontAwesomeIcon icon={faPen} className="icon edit" />
                <FontAwesomeIcon icon={faTimes} className="icon delete" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="at-pagination">
        <span>Rows per page:</span>
        <select>
          <option>10</option>
          <option>20</option>
          <option>50</option>
        </select>
        <span>1 - 5 of 5</span>
        <span className="pagination-nav">prev</span>
        <span className="pagination-nav">next</span>
      </div>

      <footer className="at-footer">
        <p><strong>Stocky - Ultimate Inventory With POS</strong></p>
        <p>© 2025 Developed by Stocky | All rights reserved - v4.0.9</p>
      </footer>
    </div>
    </>
  );
};

export default AT;
