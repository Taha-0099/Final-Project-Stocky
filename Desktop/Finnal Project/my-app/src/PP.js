// src/components/PP.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './PP.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCog,
  faUser,
  faEnvelope,
  faLock,
  faCamera,
  faPhone,
  faPaperPlane,
  faBars,
  faExpandArrowsAlt,
  faGlobe
} from '@fortawesome/free-solid-svg-icons';
import SideBar from './SideBar';

const PP = () => {
  const [formData, setFormData] = useState({
    firstName: 'William',
    lastName: 'Castillo',
    username: 'William Castillo',
    email: 'admin@example.com',
    phone: '0123456789',
    password: '',
    image: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setFormData(prev => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // TODO: send formData to your API
  };

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
          {/* link on profile icon to PP page */}
          <Link to="/pp">
            <FontAwesomeIcon icon={faUser} className="icon" />
          </Link>
          <div className="brand-name">STOCKY</div>
        </div>
      </header>

      <div className="profile-page">
        <header className="profile-nav">
          <div className="profile-title">
            <h1>Profile</h1>
            <nav>
              <a href="#">Settings</a>
              <span>|</span>
              <a href="#">Profile</a>
            </nav>
          </div>
          <FontAwesomeIcon icon={faCog} className="profile-cog" />
        </header>

        <div className="pp-container">
          <div className="pp-banner" />
          <div className="pp-avatar">
            <FontAwesomeIcon icon={faUser} />
          </div>
          <h2 className="pp-title">
            {formData.firstName} {formData.lastName}
          </h2>

          <form className="pp-form" onSubmit={handleSubmit}>
            <div className="field">
              <label>First Name *</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="field">
              <label>Last Name *</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="field">
              <label>Username *</label>
              <div className="input-icon">
                <FontAwesomeIcon icon={faUser} />
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="field">
              <label>Phone *</label>
              <div className="input-icon">
                <FontAwesomeIcon icon={faPhone} />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="field">
              <label>Email *</label>
              <div className="input-icon">
                <FontAwesomeIcon icon={faEnvelope} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="field">
              <label>User Image</label>
              <div className="input-icon">
                <FontAwesomeIcon icon={faCamera} />
                <input
                  type="file"
                  name="image"
                  onChange={handleImageChange}
                  accept="image/*"
                />
              </div>
            </div>

            <div className="field full-width">
              <label>New password</label>
              <div className="input-icon">
                <FontAwesomeIcon icon={faLock} />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Please leave blank if unchanged"
                />
              </div>
            </div>

            <button type="submit" className="pp-submit">
              <FontAwesomeIcon icon={faPaperPlane} /> Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default PP;
