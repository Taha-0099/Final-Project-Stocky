import React, { useState } from 'react';
import './AddUserForm.css'
import Sidebar from './SideBar';
import Header from './Header';
const AddUserForm = () => {
  const [formData, setFormData] = useState({
    prefix: '',
    firstName: '',
    lastName: '',
    email: '',
    isActive: true,
    enableServiceStaffPin: false,
    allowLogin: true,
    username: 'admin',
    password: '',
    confirmPassword: '',
    role: 'Admin',
    allLocations: true,
    selectedLocation: '',
    salesCommission: '',
    maxSalesDiscount: '',
    allowSelectedContacts: false,
    dob: '',
    gender: '',
    maritalStatus: '',
    bloodGroup: '',
    mobileNumber: '',
    alternateContact: '',
    familyContact: '',
    facebookLink: '',
    twitterLink: '',
    socialMedia1: '',
    socialMedia2: '',
    customField1: '',
    customField2: '',
    customField3: '',
    customField4: '',
    guardianName: '',
    idProofName: '',
    idProofNumber: '',
    permanentAddress: '',
    currentAddress: '',
    accountHolderName: '',
    accountNumber: '',
    bankName: '',
    bankIdentifierCode: '',
    branch: '',
    taxPayerId: '',
    department: '',
    designation: '',
    primaryWorkLocation: '',
    basicSalary: '',
    payComponent: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Form submitted successfully! Check console for data.');
  };

  return (


    <>

        <Header/>

      <Sidebar />
   
   
    <div className="form-container">
      <h1>Add user</h1>

      <form onSubmit={handleSubmit} className="user-form" autoComplete="off" noValidate>
        {/* User Info Section */}
        <section className="form-section">
          <div className="form-row">
            <div className="form-group col-2">
              <label htmlFor="prefix">Prefix</label>
              <input
                id="prefix"
                name="prefix"
                type="text"
                placeholder="Mr / Mrs / Miss"
                value={formData.prefix}
                onChange={handleChange}
              />
            </div>
            <div className="form-group col-3">
              <label htmlFor="firstName">First Name*</label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group col-7">
              <label htmlFor="lastName">Last Name</label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email*</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-checkboxes">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={handleChange}
              />
              <span>Is active?</span>
              <i className="help-icon" title="Is active?">?</i>
            </label>

            <label className="checkbox-label">
              <input
                type="checkbox"
                name="enableServiceStaffPin"
                checked={formData.enableServiceStaffPin}
                onChange={handleChange}
              />
              <span>Enable service staff pin</span>
              <i className="help-icon" title="Enable service staff pin">?</i>
            </label>
          </div>
        </section>

        {/* Roles and Permissions Section */}
        <section className="form-section">
          <h2>Roles and Permissions</h2>

          <div className="form-checkboxes">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="allowLogin"
                checked={formData.allowLogin}
                onChange={handleChange}
              />
              <span>Allow login</span>
              <i className="help-icon" title="Allow login">?</i>
            </label>
          </div>

          <div className="form-row">
            <div className="form-group col-4">
              <label htmlFor="username">Username:</label>
              <input
                id="username"
                name="username"
                type="text"
                value={formData.username}
                placeholder="Leave blank to auto generate username"
                readOnly
                className="readonly"
              />
              <p className="hint">Leave blank to auto generate username</p>
            </div>
            <div className="form-group col-4">
              <label htmlFor="password">Password*:</label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                placeholder="Password"
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group col-4">
              <label htmlFor="confirmPassword">Confirm Password*:</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row align-center">
            <div className="form-group col-2">
              <label htmlFor="role">Role:</label>
              <i className="help-icon" title="Role">?</i>
            </div>
            <div className="form-group col-3">
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                <option>Admin</option>
                <option>User</option>
                <option>Manager</option>
              </select>
            </div>
            <div className="form-group col-7 checkboxes-row">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="allLocations"
                  checked={formData.allLocations}
                  onChange={handleChange}
                />
                <span>All Locations</span>
                <i className="help-icon" title="All Locations">?</i>
              </label>

              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="selectedLocation"
                  checked={formData.selectedLocation}
                  onChange={handleChange}
                />
                <span>Awesome Shop</span>
              </label>
            </div>
          </div>
        </section>

        {/* Sales Section */}
        <section className="form-section">
          <h2>Sales</h2>
          <div className="form-row">
            <div className="form-group col-6">
              <label htmlFor="salesCommission">Sale Commission Percentage (%):</label>
              <input
                id="salesCommission"
                name="salesCommission"
                type="text"
                placeholder="Sale Commission Percentage (%)"
                value={formData.salesCommission}
                onChange={handleChange}
              />
            </div>
            <div className="form-group col-6">
              <label htmlFor="maxSalesDiscount">Max sales discount percent:</label>
              <input
                id="maxSalesDiscount"
                name="maxSalesDiscount"
                type="text"
                placeholder="Max sales discount percent"
                value={formData.maxSalesDiscount}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-checkboxes">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="allowSelectedContacts"
                checked={formData.allowSelectedContacts}
                onChange={handleChange}
              />
              <span>Allow Selected Contacts</span>
              <i className="help-icon" title="Allow Selected Contacts">?</i>
            </label>
          </div>
        </section>

        {/* More Informations Section */}
        <section className="form-section">
          <h2>More Informations</h2>
          <div className="form-row">
            <div className="form-group col-3">
              <label htmlFor="dob">Date of birth:</label>
              <input
                id="dob"
                name="dob"
                type="date"
                placeholder="Date of birth"
                value={formData.dob}
                onChange={handleChange}
              />
            </div>
            <div className="form-group col-3">
              <label htmlFor="gender">Gender:</label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">Please Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="form-group col-3">
              <label htmlFor="maritalStatus">Marital Status:</label>
              <select
                id="maritalStatus"
                name="maritalStatus"
                value={formData.maritalStatus}
                onChange={handleChange}
              >
                <option value="">Marital Status</option>
                <option value="single">Single</option>
                <option value="married">Married</option>
                <option value="divorced">Divorced</option>
                <option value="widowed">Widowed</option>
              </select>
            </div>
            <div className="form-group col-3">
              <label htmlFor="bloodGroup">Blood Group:</label>
              <input
                id="bloodGroup"
                name="bloodGroup"
                type="text"
                placeholder="Blood Group"
                value={formData.bloodGroup}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-3">
              <label htmlFor="mobileNumber">Mobile Number:</label>
              <input
                id="mobileNumber"
                name="mobileNumber"
                type="tel"
                placeholder="Mobile Number"
                value={formData.mobileNumber}
                onChange={handleChange}
              />
            </div>
            <div className="form-group col-3">
              <label htmlFor="alternateContact">Alternate contact number:</label>
              <input
                id="alternateContact"
                name="alternateContact"
                type="tel"
                placeholder="Alternate contact number"
                value={formData.alternateContact}
                onChange={handleChange}
              />
            </div>
            <div className="form-group col-3">
              <label htmlFor="familyContact">Family contact number:</label>
              <input
                id="familyContact"
                name="familyContact"
                type="tel"
                placeholder="Family contact number"
                value={formData.familyContact}
                onChange={handleChange}
              />
            </div>
            <div className="form-group col-3">
              <label htmlFor="facebookLink">Facebook Link:</label>
              <input
                id="facebookLink"
                name="facebookLink"
                type="url"
                placeholder="Facebook Link"
                value={formData.facebookLink}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-3">
              <label htmlFor="twitterLink">Twitter Link:</label>
              <input
                id="twitterLink"
                name="twitterLink"
                type="url"
                placeholder="Twitter Link"
                value={formData.twitterLink}
                onChange={handleChange}
              />
            </div>
            <div className="form-group col-3">
              <label htmlFor="socialMedia1">Social Media 1:</label>
              <input
                id="socialMedia1"
                name="socialMedia1"
                type="url"
                placeholder="Social Media 1"
                value={formData.socialMedia1}
                onChange={handleChange}
              />
            </div>
            <div className="form-group col-3">
              <label htmlFor="customField1">Custom field 1:</label>
              <input
                id="customField1"
                name="customField1"
                type="text"
                placeholder="Custom field 1"
                value={formData.customField1}
                onChange={handleChange}
              />
            </div>
            <div className="form-group col-3">
              <label htmlFor="customField2">Custom field 2:</label>
              <input
                id="customField2"
                name="customField2"
                type="text"
                placeholder="Custom field 2"
                value={formData.customField2}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-3">
              <label htmlFor="socialMedia2">Social Media 2:</label>
              <input
                id="socialMedia2"
                name="socialMedia2"
                type="url"
                placeholder="Social Media 2"
                value={formData.socialMedia2}
                onChange={handleChange}
              />
            </div>
            <div className="form-group col-3">
              <label htmlFor="customField4">Custom field 4:</label>
              <input
                id="customField4"
                name="customField4"
                type="text"
                placeholder="Custom field 4"
                value={formData.customField4}
                onChange={handleChange}
              />
            </div>
            <div className="form-group col-3">
              <label htmlFor="guardianName">Guardian Name:</label>
              <input
                id="guardianName"
                name="guardianName"
                type="text"
                placeholder="Guardian Name"
                value={formData.guardianName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group col-3">
              <label htmlFor="idProofName">ID proof name:</label>
              <input
                id="idProofName"
                name="idProofName"
                type="text"
                placeholder="ID proof name"
                value={formData.idProofName}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-3">
              <label htmlFor="customField3">Custom field 3:</label>
              <input
                id="customField3"
                name="customField3"
                type="text"
                placeholder="Custom field 3"
                value={formData.customField3}
                onChange={handleChange}
              />
            </div>
            <div className="form-group col-3">
              <label htmlFor="idProofNumber">ID proof number:</label>
              <input
                id="idProofNumber"
                name="idProofNumber"
                type="text"
                placeholder="ID proof number"
                value={formData.idProofNumber}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-6">
              <label htmlFor="permanentAddress">Permanent Address:</label>
              <textarea
                id="permanentAddress"
                name="permanentAddress"
                rows="2"
                placeholder="Permanent Address"
                value={formData.permanentAddress}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="form-group col-6">
              <label htmlFor="currentAddress">Current Address:</label>
              <textarea
                id="currentAddress"
                name="currentAddress"
                rows="2"
                placeholder="Current Address"
                value={formData.currentAddress}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>
        </section>

        {/* Bank Details Section */}
        <section className="form-section">
          <h2>Bank Details:</h2>
          <div className="form-row">
            <div className="form-group col-3">
              <label htmlFor="accountHolderName">Account Holder's Name:</label>
              <input
                id="accountHolderName"
                name="accountHolderName"
                type="text"
                placeholder="Account Holder's Name"
                value={formData.accountHolderName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group col-3">
              <label htmlFor="accountNumber">Account Number:</label>
              <input
                id="accountNumber"
                name="accountNumber"
                type="text"
                placeholder="Account Number"
                value={formData.accountNumber}
                onChange={handleChange}
              />
            </div>
            <div className="form-group col-3">
              <label htmlFor="bankName">Bank Name:</label>
              <input
                id="bankName"
                name="bankName"
                type="text"
                placeholder="Bank Name"
                value={formData.bankName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group col-3">
              <label htmlFor="bankIdentifierCode">Bank Identifier Code:</label>
              <i className="help-icon" title="Bank Identifier Code">?</i>
              <input
                id="bankIdentifierCode"
                name="bankIdentifierCode"
                type="text"
                placeholder="Bank Identifier Code"
                value={formData.bankIdentifierCode}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-3">
              <label htmlFor="branch">Branch:</label>
              <input
                id="branch"
                name="branch"
                type="text"
                placeholder="Branch"
                value={formData.branch}
                onChange={handleChange}
              />
            </div>
            <div className="form-group col-3">
              <label htmlFor="taxPayerId">Tax Payer ID:</label>
              <i className="help-icon" title="Tax Payer ID">?</i>
              <input
                id="taxPayerId"
                name="taxPayerId"
                type="text"
                placeholder="Tax Payer ID"
                value={formData.taxPayerId}
                onChange={handleChange}
              />
            </div>
          </div>
        </section>

        {/* HRM Details Section */}
        <section className="form-section">
          <h2>HRM Details</h2>
          <div className="form-row">
            <div className="form-group col-6">
              <label htmlFor="department">Department:</label>
              <select
                id="department"
                name="department"
                value={formData.department}
                onChange={handleChange}
              >
                <option value="">Please Select</option>
                <option value="hr">HR</option>
                <option value="finance">Finance</option>
                <option value="it">IT</option>
                <option value="operations">Operations</option>
              </select>
            </div>
            <div className="form-group col-6">
              <label htmlFor="designation">Designation:</label>
              <select
                id="designation"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
              >
                <option value="">-</option>
                <option value="manager">Manager</option>
                <option value="supervisor">Supervisor</option>
                <option value="associate">Associate</option>
              </select>
            </div>
          </div>
        </section>

        {/* Payroll Section */}
        <section className="form-section">
          <h2>Payroll</h2>
          <div className="form-row align-center">
            <div className="form-group col-2">
              <label htmlFor="primaryWorkLocation">Primary work location:</label>
              <select
                id="primaryWorkLocation"
                name="primaryWorkLocation"
                value={formData.primaryWorkLocation}
                onChange={handleChange}
              >
                <option value="">Please Select</option>
                <option value="main">Main Office</option>
                <option value="branch1">Branch 1</option>
                <option value="branch2">Branch 2</option>
              </select>
            </div>
            <div className="form-group col-3">
              <label htmlFor="basicSalary">Basic salary:</label>
              <input
                id="basicSalary"
                name="basicSalary"
                type="text"
                placeholder="Basic salary"
                value={formData.basicSalary}
                onChange={handleChange}
              />
              <span className="unit">Per Month</span>
            </div>
            <div className="form-group col-2">
              <label htmlFor="payComponent">Pay Component:</label>
              <input
                id="payComponent"
                name="payComponent"
                type="text"
                value={formData.payComponent}
                onChange={handleChange}
              />
            </div>
          </div>
        </section>

        {/* Save Button */}
        <div className="form-actions">
          <button type="submit" className="submit-button">
            Save
          </button>
        </div>
      </form>

      <footer className="form-footer">
        Ultimate POS - v6.7 | Copyright © 2025 All right reserved.
      </footer>
    </div>
    </>
  );
};

export default AddUserForm;