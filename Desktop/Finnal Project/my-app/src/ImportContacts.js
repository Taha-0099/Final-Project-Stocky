import React from 'react';
import { FaDownload } from 'react-icons/fa';
import './ImportContacts.css';
import Sidebar from './SideBar';

const ImportContacts = () => {
  const instructionsData = [
    {
      columnNumber: 1,
      columnName: 'Contact type (Required)',
      instruction: 'Available Options:\n1 : Customer,\n2 : Supplier\n3 : Both'
    },
    { columnNumber: 2, columnName: 'Prefix (Optional)', instruction: '' },
    { columnNumber: 3, columnName: 'First Name (Required)', instruction: '' },
    { columnNumber: 4, columnName: 'Middle name (Optional)', instruction: '' },
    { columnNumber: 5, columnName: 'Last Name (Optional)', instruction: '' },
    {
      columnNumber: 6,
      columnName: 'Business Name (Required if contact type is supplier or both)',
      instruction: ''
    },
    {
      columnNumber: 7,
      columnName: 'Contact ID (Optional)',
      instruction: 'Leave blank to auto generate Contact ID'
    },
    { columnNumber: 8, columnName: 'Tax number (Optional)', instruction: '' },
    { columnNumber: 9, columnName: 'Opening Balance (Optional)', instruction: '' },
    {
      columnNumber: 10,
      columnName: 'Pay term (Required if contact type is supplier or both)',
      instruction: ''
    },
    {
      columnNumber: 11,
      columnName: 'Pay term period (Required if contact type is supplier or both)',
      instruction: 'Available Options: days and months'
    },
    { columnNumber: 12, columnName: 'Credit Limit (Optional)', instruction: '' },
    { columnNumber: 13, columnName: 'Email (Optional)', instruction: '' },
    { columnNumber: 14, columnName: 'Mobile (Required)', instruction: '' },
    {
      columnNumber: 15,
      columnName: 'Alternate contact number (Optional)',
      instruction: ''
    },
    { columnNumber: 16, columnName: 'Landline (Optional)', instruction: '' },
    { columnNumber: 17, columnName: 'City (Optional)', instruction: '' },
    { columnNumber: 18, columnName: 'State (Optional)', instruction: '' },
    { columnNumber: 19, columnName: 'Country (Optional)', instruction: '' },
    { columnNumber: 20, columnName: 'Address line 1 (Optional)', instruction: '' },
    { columnNumber: 21, columnName: 'Address line 2 (Optional)', instruction: '' },
    { columnNumber: 22, columnName: 'Zip Code (Optional)', instruction: '' },
    {
      columnNumber: 23,
      columnName: 'Date of birth (Optional)',
      instruction: 'Format Y-m-d (2025-05-06)'
    },
    { columnNumber: 24, columnName: 'Custom Field 1 (Optional)', instruction: '' },
    { columnNumber: 25, columnName: 'Custom Field 2 (Optional)', instruction: '' },
    { columnNumber: 26, columnName: 'Custom Field 3 (Optional)', instruction: '' },
    { columnNumber: 27, columnName: 'Custom Field 4 (Optional)', instruction: '' }
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
    <div className="import-contacts-container">
      {/* Top card */}
      <div className="import-card">
        <h2 className="import-title">Import Contacts</h2>
        <form className="import-form">
          <div className="file-input-group">
            <label htmlFor="fileImport" className="file-label">
              File to Import
            </label>
            <input type="file" id="fileImport" name="fileImport" className="file-input" />
          </div>
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
        <button type="button" className="download-button">
          <FaDownload className="download-icon" />
          Download template file
        </button>
      </div>

      {/* Instructions card */}
      <div className="instructions-card">
        <div className="instructions-header">Instructions</div>
        <div className="instructions-description">
          <span className="description-bold">Carefully follow the instructions before importing the file.</span>
          <br />
          The columns of the CSV file should be in the following order.
        </div>
        <div className="instructions-table-container">
          <table className="instructions-table">
            <thead>
              <tr className="table-header-row">
                <th className="column-number-header">Column Number</th>
                <th className="column-name-header">Column Name</th>
                <th className="instruction-header">Instruction</th>
              </tr>
            </thead>
            <tbody>
              {instructionsData.map((row, index) => (
                <tr key={index} className="table-row">
                  <td className="column-number-cell">{row.columnNumber}</td>
                  <td className="column-name-cell">{row.columnName}</td>
                  <td className="instruction-cell">
                    {row.instruction.split('\n').map((line, i) => (
                      <div key={i}>{line}</div>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <div className="footer">
        Ultimate POS - v6.7 | Copyright © 2023 All rights reserved.
      </div>
    </div>
    </>
  );
};

export default ImportContacts;