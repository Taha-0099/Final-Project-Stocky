import React from 'react';
import { FaFilter, FaPlus, FaCaretDown } from 'react-icons/fa';
import './Suppliers.css';
import Sidebar from './SideBar';

const Suppliers = () => {
  const suppliersData = [
    {
      contactId: 'C00003',
      businessName: 'Manhattan Clothing Ltd.',
      name: 'Philip',
      email: '54869310093',
      taxNumber: '',
      payTerm: '15 Days',
      openingBalance: '$ 0.00',
      advanceBalance: '$ 0.00',
      addedOn: '01/03/2018',
      address: 'Linking Street, Phoenix, Arizona, USA',
      mobile: '(378) 400 - 1234',
      totalPurchaseDue: '$ 0.00',
      totalPurchaseReturnDue: '$ 0.00'
    },
    {
      contactId: 'C00002',
      businessName: 'Univer Suppliers Hill',
      name: 'Jackson',
      email: '5459000655',
      taxNumber: '',
      payTerm: '45 Days',
      openingBalance: '$ 0.00',
      advanceBalance: '$ 0.00',
      addedOn: '01/06/2018',
      address: 'Linking Street, Phoenix, Arizona, USA',
      mobile: '(378) 400 - 1234',
      totalPurchaseDue: '$ 255,986.00',
      totalPurchaseReturnDue: '$ 0.00'
    },
    {
      contactId: 'C00001',
      businessName: 'Alpha Clothings',
      name: 'Michael',
      email: '4590091535',
      taxNumber: '',
      payTerm: '15 Days',
      openingBalance: '$ 0.00',
      advanceBalance: '$ 0.00',
      addedOn: '01/03/2018',
      address: 'Linking Street, Phoenix, Arizona, USA',
      mobile: '(378) 400 - 1234',
      totalPurchaseDue: '$ 0.00',
      totalPurchaseReturnDue: '$ 0.00'
    },
    {
      contactId: 'CN0004',
      businessName: 'Digital Ocean',
      name: 'Mike McCubbin',
      email: '52965489001',
      taxNumber: '',
      payTerm: '30 Days',
      openingBalance: '$ 0.00',
      advanceBalance: '$ 0.00',
      addedOn: '01/06/2018',
      address: 'Linking Street, Phoenix, Arizona, USA',
      mobile: '(378) 400 - 1234',
      totalPurchaseDue: '$ 0.00',
      totalPurchaseReturnDue: '$ 0.00'
    },
    {
      contactId: '223457',
      businessName: '',
      name: 'Harsh Garg',
      email: '05asdfghjkl45',
      taxNumber: '',
      payTerm: '',
      openingBalance: '$ 0.00',
      advanceBalance: '$ 0.00',
      addedOn: '05/06/2025',
      address: 'RAJPUR, Rajpur, DEHRADUN, Uttarakhand, India, 2480999',
      mobile: '1234567890',
      totalPurchaseDue: '$ 2,376.00',
      totalPurchaseReturnDue: ''
    }
  ];

  return (
    <>
    <Sidebar/>
    <header className="header">
    <div className="header-left">
      <span className="logo">Finnal Project</span>
      <span className="status-indicator"></span>
    </div>
    <div className="header-right">
      <button className="icon-button">Download</button>
      <button className="icon-button">Add</button>
      <button className="icon-button">Export</button>
      <span className="pos-label">POS</span>
      <button className="icon-button">Files</button>
      <span className="date-label">05/05/2025</span>
      <button className="icon-button">View</button>
      <div className="user-info">
        <span className="user-name">Admin</span>
        <div className="user-avatar">👤</div>
      </div>
    </div>
  </header>
    <div className="suppliers-container">
      <div className="header-section">
        <div className="title-section">
          <span className="main-title">Suppliers</span>
          <a href="#" className="subtitle">Manage your Suppliers</a>
        </div>
        
        <div className="filter-button">
          <FaFilter className="filter-icon" />
          <span>Filters</span>
        </div>

        <div className="description">All your Suppliers</div>

        <div className="entries-selector">
          <span>Show</span>
          <select aria-label="Show entries">
            <option>10</option>
            <option>25</option>
            <option>50</option>
            <option>100</option>
          </select>
          <span>entries</span>
        </div>

        <div className="export-buttons">
          <button>Export CSV</button>
          <button>Export Excel</button>
          <button>Print</button>
          <button>Column visibility</button>
          <button>Export PDF</button>
        </div>

        <div className="add-button-container">
          <button className="add-button">
            <FaPlus className="add-icon" />
            Add
          </button>
        </div>

        <div className="search-container">
          <input type="search" placeholder="Search ..." aria-label="Search" />
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th className="action-col">Action</th>
              <th className="contact-id-col">Contact ID</th>
              <th className="business-name-col">Business Name</th>
              <th className="name-col">Name</th>
              <th className="email-col">Email</th>
              <th className="tax-number-col">Tax number</th>
              <th className="pay-term-col">Pay term</th>
              <th className="opening-balance-col">Opening Balance</th>
              <th className="advance-balance-col">Advance Balance</th>
              <th className="added-on-col">Added On</th>
              <th className="address-col">Address</th>
              <th className="mobile-col">Mobile</th>
              <th className="total-purchase-due-col">Total Purchase Due</th>
              <th className="total-purchase-return-due-col">Total Purchase Return Due</th>
              {[...Array(10)].map((_, i) => (
                <th key={i} className="custom-field-col">Custom Field {i + 1}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {suppliersData.map((supplier, index) => (
              <tr key={index}>
                <td>
                  <button className="action-btn">
                    Actions <FaCaretDown className="caret-icon" />
                  </button>
                </td>
                <td className="mono-font">{supplier.contactId}</td>
                <td>{supplier.businessName}</td>
                <td>{supplier.name}</td>
                <td className="mono-font">{supplier.email}</td>
                <td>{supplier.taxNumber}</td>
                <td>{supplier.payTerm}</td>
                <td className="mono-font">{supplier.openingBalance}</td>
                <td className="mono-font">{supplier.advanceBalance}</td>
                <td>{supplier.addedOn}</td>
                <td>{supplier.address}</td>
                <td className="mono-font">{supplier.mobile}</td>
                <td className="mono-font text-right">{supplier.totalPurchaseDue}</td>
                <td className="mono-font text-right">{supplier.totalPurchaseReturnDue}</td>
                {[...Array(10)].map((_, i) => (
                  <td key={i}></td>
                ))}
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="11" className="text-right">Total:</td>
              <td></td>
              <td className="mono-font text-right">$ 258,362.00</td>
              <td className="mono-font text-right">$ 0.00</td>
              <td colSpan="10"></td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="footer-section">
        <div className="pagination-info">Showing 1 to 5 of 5 entries</div>
        <div className="pagination-buttons">
          <button>Previous</button>
          <button className="active">1</button>
          <button>Next</button>
        </div>
      </div>

      <div className="copyright">
        Ultimate POS - V6.7 | Copyright © 2025 All rights reserved.
      </div>
    </div>
    </>
  );
};

export default Suppliers;