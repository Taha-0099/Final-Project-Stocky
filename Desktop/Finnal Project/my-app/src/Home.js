import React, { useState } from 'react';
import Sidebar from './SideBar'; // Corrected from 'SiseBar'
import './Users.css';
import { Link, Outlet } from 'react-router-dom';
import AddUserForm from './AddUserForm';

const Home = () => {
  const [users] = useState([
    { username: 'admin', name: 'Mr Admin', role: 'Admin', email: 'admin@example.com' },
    { username: 'admin-essentials', name: 'Mr Admin Essential', role: 'Admin', email: 'admin_essentials@example.com' },
    { username: 'cashier', name: 'Mr Demo Cashier', role: 'Cashier', email: 'cashier@example.com' },
    { username: 'demo-admin', name: 'Mr. Demo Admin', role: 'Admin', email: 'demoadmin@example.com' },
    { username: 'superadmin', name: 'Mr. Super Admin', role: 'Admin', email: 'superadmin@example.com' },
    { username: 'woocommerce_user', name: 'Mr. WooCommerce User', role: 'Admin', email: 'woo@example.com' },
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
                <h1>Users</h1>
                <span>Manage users</span>
              </div>
              <Link to="/AddUserForm">
                <button className="add-button">➕ Add User</button>
              </Link>
            </div>

            <div className="table-container">
              <h2 className="table-title">All users</h2>
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
                      <th>Username</th>
                      <th>Name</th>
                      <th>Role</th>
                      <th>Email</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, idx) => (
                      <tr key={idx}>
                        <td>{user.username}</td>
                        <td>{user.name}</td>
                        <td>{user.role}</td>
                        <td>{user.email}</td>
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

export default Home;
