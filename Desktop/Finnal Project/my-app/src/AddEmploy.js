import React, { useState } from "react";
import axios from "axios";
import "./AddEmploy.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch, faFilter, faFilePdf, faFileExcel, faPlus,
  faEye, faPen, faTimes, faBars, faExpandArrowsAlt, faGlobe, faCheckCircle
} from '@fortawesome/free-solid-svg-icons';  // <-- Add faCheckCircle here
import { faBell as farBell } from '@fortawesome/free-regular-svg-icons';

import SideBar from './SideBar';
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const AddEmploy = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    birthDate: "",
    email: "",
    phone: "",
    country: "",
    joiningDate: "",
    company: "",
    department: "",
    designation: "",
    officeShift: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("http://localhost:5001/Employees/add", form);
      setForm({
        firstName: "",
        lastName: "",
        gender: "",
        birthDate: "",
        email: "",
        phone: "",
        country: "",
        joiningDate: "",
        company: "",
        department: "",
        designation: "",
        officeShift: "",
      });
      navigate("/Employ"); // Redirect to employee list page after success
    } catch (err) {
      alert("Failed to add employee.");
    }
    setLoading(false);
  };

  return (
    <>
        <Header/>

      <SideBar />

   

      <div className="ae-wrapper">
        <h2>
          Add Employee{" "}
          <span className="ae-breadcrumb">
            Employees | Add Employee
          </span>
        </h2>
        <div className="ae-form-card">
          <form className="ae-form" onSubmit={handleSubmit}>
            <div className="ae-row">
              <div className="ae-field">
                <label>FirstName *</label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="Enter First Name"
                  value={form.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="ae-field">
                <label>LastName *</label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Enter Last Name"
                  value={form.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="ae-row">
              <div className="ae-field">
                <label>Gender *</label>
                <select name="gender" value={form.gender} onChange={handleChange} required>
                  <option value="">Choose Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="ae-field">
                <label>Birth date</label>
                <input
                  type="date"
                  name="birthDate"
                  value={form.birthDate}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="ae-row">
              <div className="ae-field">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter email address"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
              <div className="ae-field">
                <label>Country</label>
                <input
                  type="text"
                  name="country"
                  placeholder="Enter Country"
                  value={form.country}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="ae-row">
              <div className="ae-field">
                <label>Phone</label>
                <input
                  type="text"
                  name="phone"
                  placeholder="Enter Phone Number"
                  value={form.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="ae-field">
                <label>Joining date</label>
                <input
                  type="date"
                  name="joiningDate"
                  value={form.joiningDate}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="ae-row">
              <div className="ae-field">
                <label>Company *</label>
                <select name="company" value={form.company} onChange={handleChange} required>
                  <option value="">Choose Company</option>
                  <option>worktick</option>
                  <option>another company</option>
                </select>
              </div>
              <div className="ae-field">
                <label>Department *</label>
                <select name="department" value={form.department} onChange={handleChange} required>
                  <option value="">Department</option>
                  <option>Accounting and Finance</option>
                  <option>Marketing</option>
                  <option>Human Resource Management</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
            <div className="ae-row">
              <div className="ae-field">
                <label>Designation *</label>
                <select name="designation" value={form.designation} onChange={handleChange} required>
                  <option value="">Choose Designation</option>
                  <option>Sales Analyst</option>
                  <option>HR Manager</option>
                  <option>SEO Manager</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="ae-field">
                <label>Office Shift *</label>
                <select name="officeShift" value={form.officeShift} onChange={handleChange} required>
                  <option value="">Choose Office Shift</option>
                  <option>Afternoon shift</option>
                  <option>Morning shift</option>
                  <option>Night shift</option>
                </select>
              </div>
            </div>
            <button className="ae-submit" type="submit" disabled={loading}>
              <FontAwesomeIcon icon={faCheckCircle} style={{ marginRight: 8 }} />
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddEmploy;
