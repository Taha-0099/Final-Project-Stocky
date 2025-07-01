import React, { useState } from 'react';
import Sidebar from './SideBar';

const Roles = () => {
  const [entries, setEntries] = useState('25');
  const [searchTerm, setSearchTerm] = useState('');
  const [roles, setRoles] = useState([
    { name: 'Admin', isDefault: true },
    { name: 'Cashier', isDefault: false }
  ]);

  const handleDelete = (roleName) => {
    setRoles(roles.filter(role => role.name !== roleName));
  };

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

      
    <div className="roles-page">
      <header className="page-header">
        <h1 className="page-title">Roles</h1>
        <span className="page-subtitle">Manage roles</span>
      </header>

      <main className="page-main">
        <section className="roles-section" aria-label="All roles">
          <h2 className="section-title">All roles</h2>

          <div className="controls-container">
            <div className="entries-control">
              <label htmlFor="entries">Show</label>
              <select
                id="entries"
                name="entries"
                value={entries}
                onChange={(e) => setEntries(e.target.value)}
                className="entries-select"
              >
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
              <span>entries</span>
            </div>

            <div className="search-add-container">
              <input
                type="search"
                placeholder="Search ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
                aria-label="Search roles"
              />
              <button
                type="button"
                className="add-button"
              >
                <i className="fas fa-plus"></i>
                <span>Add</span>
              </button>
            </div>
          </div>

          <table className="roles-table">
            <thead>
              <tr className="table-header">
                <th className="role-column">
                  Roles
                  <i className="fas fa-sort sort-icon"></i>
                </th>
                <th className="action-column">Action</th>
              </tr>
            </thead>
            <tbody>
              {roles.map((role, index) => (
                <tr key={index} className="table-row">
                  <td className={role.isDefault ? 'default-role' : ''}>
                    {role.name}
                  </td>
                  <td className="action-cell">
                    {!role.isDefault && (
                      <>
                        <button
                          type="button"
                          className="edit-button"
                        >
                          <i className="fas fa-pen"></i>
                          <span>Edit</span>
                        </button>
                        <button
                          type="button"
                          className="delete-button"
                          onClick={() => handleDelete(role.name)}
                        >
                          <i className="fas fa-trash-alt"></i>
                          <span>Delete</span>
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination-container">
            <div className="pagination-info">
              Showing 1 to {roles.length} of {roles.length} entries
            </div>
            <nav className="pagination-nav" role="navigation" aria-label="Pagination">
              <button
                className="pagination-button prev"
                aria-label="Previous page"
              >
                Previous
              </button>
              <button
                className="pagination-button active"
                aria-current="page"
                aria-label="Page 1"
              >
                1
              </button>
              <button
                className="pagination-button next"
                aria-label="Next page"
              >
                Next
              </button>
            </nav>
          </div>
        </section>
      </main>

      <footer className="page-footer">
        Ultimate POS - V6.7 | Copyright © 2025 All rights reserved.
      </footer>
    </div>
    </>
  );
};

export default Roles;