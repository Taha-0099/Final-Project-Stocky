// /src/components/AQ.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AQ.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilter, faFilePdf, faFileExcel, faPlus, faEllipsisV } from '@fortawesome/free-solid-svg-icons';



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

const AQ = () => {
  const [quotations, setQuotations] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5001/Quotations')
      .then(res => setQuotations(res.data))
      .catch(err => console.error('Error fetching quotations:', err));
  }, []);

  return (
    <>
            <Header/>

      <SideBar/>

      <div className="aq-container">
        <h2>All Quotations <span className="breadcrumb">Quotations | All Quotations</span></h2>

        <div className="aq-toolbar">
          <div className="search-box">
            <FontAwesomeIcon icon={faSearch} />
            <input type="text" placeholder="Search this table" />
          </div>
          <div className="action-buttons">
            <button><FontAwesomeIcon icon={faFilter} /> Filter</button>
            <button><FontAwesomeIcon icon={faFilePdf} /> PDF</button>
            <button><FontAwesomeIcon icon={faFileExcel} /> EXCEL</button>
            <button onClick={() => window.location.href = '/CQ'} className="create-btn-aq">
              <FontAwesomeIcon icon={faPlus} /> Create
            </button>
          </div>
        </div>

        <table className="aq-table">
          <thead>
            <tr>
              <th><input type="checkbox"/></th>
              <th>Date</th>
              <th>Reference</th>
              <th>Customer</th>
              <th>Warehouse</th>
              <th>Status</th>
              <th>Grand Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {quotations.map((q) => (
              <tr key={q._id}>
                <td><input type="checkbox"/></td>
                <td>{new Date(q.date).toLocaleString()}</td>
                <td className="link">{q.ref}</td>
                <td>{q.customer}</td>
                <td>{q.warehouse}</td>
                <td><span className={`status ${q.status.toLowerCase()}`}>{q.status}</span></td>
                <td>${q.total.toFixed(2)}</td>
                <td><FontAwesomeIcon icon={faEllipsisV} className="action-icon" /></td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="aq-footer">
          <span>Rows per page: <select><option>10</option></select></span>
          <span>{`1 - ${quotations.length} of ${quotations.length}`}</span>
          <span className="pagination">prev | next</span>
        </div>
      </div>
    </>
  );
};

export default AQ;
