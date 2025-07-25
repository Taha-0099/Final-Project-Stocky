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


const CE = () => {
  const transfers = [
    { AccountNo: '123123', AccountName: 'Ali', Balance: 120000, Notes: 'Bank 2' },
    { AccountNo: '456456', AccountName: 'Sara', Balance: 78000.5, Notes: 'Bank 1' },
  ];

  return (
    <>
     <Header/>
      <SideBar />
      
      <div className="at-container">
        <div className="at-header">
          <h2>
            List Accounts <span className="at-subtitle">Accounts</span> | List Accounts
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
              <th>Account Number</th>
              <th>Account Name</th>
              <th>Balance</th>
              <th>Notes</th>
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

export default CE;
