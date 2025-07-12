import React, { useState } from 'react';
import Sidebar from './SideBar'; // Corrected from 'SiseBar'
import './Users.css';
import { Link, Outlet } from 'react-router-dom';
import AddUserForm from './AddUserForm';

const SCA = () => {
  const [users] = useState([
    { 
      name: 'Mr Admin', 
      ContactNo: '0000', 
      email: 'admin@example.com',
      address: '123 Main St, New York, NY',
      scp: '5%'
    },
    {  
      name: 'Mr Admin Essential', 
      ContactNo: '09277', 
      email: 'admin_essentials@example.com',
      address: '456 Oak Ave, Los Angeles, CA',
      scp: '7%'
    },
    {  
      name: 'Mr Demo Cashier', 
      ContactNo: '375989', 
      email: 'cashier@example.com',
      address: '789 Pine Rd, Chicago, IL',
      scp: '3%'
    },
    {  
      name: 'Mr. Demo Admin', 
      ContactNo: '5848', 
      email: 'demoadmin@example.com',
      address: '321 Elm Blvd, Houston, TX',
      scp: '6%'
    },
    { 
      name: 'Mr. Super Admin', 
      ContactNo: '48399', 
      email: 'superadmin@example.com',
      address: '654 Maple Dr, Phoenix, AZ',
      scp: '8%'
    },
    {  
      name: 'Mr. WooCommerce User', 
      ContactNo: '01119', 
      email: 'woo@example.com',
      address: '987 Cedar Ln, Philadelphia, PA',
      scp: '4%'
    },
  ]);

  return (
    <div className="layout-container">
      <Sidebar />
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

      <div className="container">
        <div className="main">
          <main className="content">
            <div className="content-header">
              <div className="content-title">
                <h1>Sales Commission Agents</h1>
                <span>Manage Agents</span>
              </div>
              <Link to="/AddUserForm">
                <button className="add-button">➕ Add Agents</button>
              </Link>
            </div>

            <div className="table-container">
              <h2 className="table-title">All Agents</h2>
              <div className="table-header">
                <div className="entries-selector">
                  <span>Show</span>
                  <select className="entries-dropdown">
                    <option>25</option>
                  </select>
                  <span>entries</span>
                </div>
                <div className="export-buttons">
                  <button className="export-button">Export CSV</button>
                  <button className="export-button">Export Excel</button>
                  <button className="export-button">Print</button>
                  <button className="export-button">Column Visibility</button>
                </div>
                <div className="search-box">
                  <input type="text" className="search-input" placeholder="Search..." />
                </div>
              </div>

              <div className="table-responsive">
                <table className="user-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Contact Number</th>
                      <th>Address</th>
                      <th>Sales Commision Percentage (%)</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, idx) => (
                      <tr key={idx}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.ContactNo}</td>
                        <td>{user.address}</td>
                        <td>{user.scp}</td>
                        <td>
                          <div className="action-buttons">
                            <button className="action-button view-button">View</button>
                            <button className="action-button edit-button">Edit</button>
                            <button className="action-button delete-button">Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="pagination">
                <span>Showing 1 to 6 of 6 entries</span>
                <div className="pagination-buttons">
                  <button className="pagination-button active">1</button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      <Outlet /> {/* Correct placement of nested route outlet */}
    </div>
  );
};

export default SCA;