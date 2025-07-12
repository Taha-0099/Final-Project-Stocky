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


const AE = () => {
  const transfers = [
    { Date :'21-05-20023', Reference :'EXP_1113',Paidby:'Cash' , Accounts:'Bank 2',    Amount: '123123', Cattegory: 'Pettrol', WareHouse: 2, Details: 'Bank 2' },
    { AccountNo: '456456', AccountName: 'Sara', Balance: 78000.5, Notes: 'Bank 1' },
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

      <div className="at-container">
        <div className="at-header">
          <h2>
        All Expense <span className="at-subtitle">Expense</span> | All Expense
          </h2>
        </div>

        <div className="at-controls">
          <div className="at-search">
            <input type="text" placeholder="Search this table" />
          </div>
          <div className="at-buttons">
            <button className="btn btn-filter">
              <FontAwesomeIcon icon={faFilter} /> Filter
            </button>
            <button className="btn btn-pdf">
              <FontAwesomeIcon icon={faFilePdf} /> PDF
            </button>
            <button className="btn btn-excel">
              <FontAwesomeIcon icon={faFileExcel} /> EXCEL
            </button>
            <button className="btn btn-create">
              <FontAwesomeIcon icon={faPlus} /> Create
            </button>
          </div>
        </div>

        <table className="at-table">
          <thead>
            <tr>
              <th><input type="checkbox" /></th>
              <th>Date</th>
              <th>Reference </th>
              <th>Paid by</th>
              <th>Accounts</th>
              <th>Ammount</th>
              <th>Cattegory</th>
              <th>Warehouse</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {transfers.map((transfer, index) => (
              <tr key={index}>
                <td><input type="checkbox" /></td>
                <td>{transfer.AccountNo}</td>
                <td>{transfer.AccountName}</td>
                <td>{transfer.Balance.toFixed(2)}</td>
                <td>{transfer.Notes}</td>
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
          <span>1 - {transfers.length} of {transfers.length}</span>
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

export default AE;
